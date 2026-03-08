import { useState, useCallback } from "react";
import TopicInput from "@/components/TopicInput";
import ChapterDisplay from "@/components/ChapterDisplay";
import LoadingScreen from "@/components/LoadingScreen";
import { getAllPapersText } from "@/data/examPapers";
import { toast } from "sonner";

type AppState = "input" | "loading" | "display";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const Index = () => {
  const [state, setState] = useState<AppState>("input");
  const [chapterContent, setChapterContent] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleGenerate = useCallback(async (topic: string, language: "english" | "hindi") => {
    if (!SUPABASE_URL) {
      toast.error("Backend not configured. Please enable Lovable Cloud to use AI chapter generation.");
      return;
    }

    setCurrentTopic(topic);
    setState("loading");
    setChapterContent("");
    setIsStreaming(true);

    try {
      const papersText = getAllPapersText();

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/generate-chapter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ topic, language, papersText }),
      });

      if (resp.status === 429) {
        toast.error("Rate limit exceeded. Please try again in a moment.");
        setState("input");
        setIsStreaming(false);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI credits exhausted. Please add credits to your workspace.");
        setState("input");
        setIsStreaming(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        throw new Error("Failed to generate chapter");
      }

      setState("display");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullContent = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullContent += content;
              setChapterContent(fullContent);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullContent += content;
              setChapterContent(fullContent);
            }
          } catch { /* ignore */ }
        }
      }

      setIsStreaming(false);
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate chapter. Please try again.");
      setState("input");
      setIsStreaming(false);
    }
  }, []);

  const handleBack = () => {
    setState("input");
    setChapterContent("");
    setCurrentTopic("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 no-print">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-sm">ST</span>
          </div>
          <span className="font-heading font-semibold text-lg text-foreground">
            Smart Textbook
          </span>
          <span className="text-xs text-muted-foreground font-body ml-auto">
            UGC NET Visual Art
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {state === "input" && (
          <TopicInput onGenerate={handleGenerate} isLoading={false} />
        )}
        {state === "loading" && <LoadingScreen />}
        {state === "display" && (
          <ChapterDisplay
            content={chapterContent}
            topic={currentTopic}
            isStreaming={isStreaming}
            onBack={handleBack}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12 no-print">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground font-body">
          <p>Smart Textbook Generator • Powered by AI + 9 UGC NET Exam Papers (2019–2025)</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
