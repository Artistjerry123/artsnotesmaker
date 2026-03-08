import { useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopicInputProps {
  onGenerate: (topic: string, language: "english" | "hindi") => void;
  isLoading: boolean;
}

const TopicInput = ({ onGenerate, isLoading }: TopicInputProps) => {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<"english" | "hindi">("english");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic.trim(), language);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-6">
          <BookOpen className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
          Smart Textbook Generator
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto">
          Generate comprehensive textbook chapters powered by 9+ years of UGC NET exam papers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-heading text-sm font-semibold text-foreground mb-2">
            Topic Name
          </label>
          <Input
            type="text"
            placeholder="e.g., Renaissance, Cubism, Mughal Architecture, Ajanta Caves..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-14 text-lg bg-card border-border font-body placeholder:text-muted-foreground/60"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block font-heading text-sm font-semibold text-foreground mb-3">
            Language
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setLanguage("english")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-body font-medium transition-all ${
                language === "english"
                  ? "border-accent bg-accent/10 text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent/50"
              }`}
              disabled={isLoading}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hindi")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-body font-medium transition-all ${
                language === "hindi"
                  ? "border-accent bg-accent/10 text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent/50"
              }`}
              disabled={isLoading}
            >
              🇮🇳 हिंदी
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!topic.trim() || isLoading}
          className="w-full h-14 text-lg font-heading font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="ml-2">Generating Chapter...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Chapter
            </span>
          )}
        </Button>
      </form>

      <div className="mt-8 p-4 rounded-lg bg-secondary/50 border border-border">
        <p className="text-sm text-muted-foreground text-center">
          <strong className="text-foreground">📚 Powered by</strong> 9 UGC NET Visual Art exam papers (2019–2025) • 
          700+ exam questions analyzed • AI-enhanced textbook generation
        </p>
      </div>
    </div>
  );
};

export default TopicInput;
