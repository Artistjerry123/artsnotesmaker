import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Printer, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChapterDisplayProps {
  content: string;
  topic: string;
  isStreaming: boolean;
  onBack: () => void;
}

const ChapterDisplay = ({ content, topic, isStreaming, onBack }: ChapterDisplayProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 no-print">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          New Topic
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm font-body">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-secondary-foreground font-medium">{topic}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex items-center gap-2 font-body"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-10 lg:p-14">
        <div className="chapter-content prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom renderers for special textbook elements
              blockquote: ({ children }) => {
                const text = String(children);
                if (text.includes("💡") || text.includes("Did You Know") || text.includes("क्या आप जानते हैं")) {
                  return <div className="did-you-know">{children}</div>;
                }
                if (text.includes("ℹ️") || text.includes("Important") || text.includes("महत्वपूर्ण")) {
                  return <div className="info-box">{children}</div>;
                }
                return <blockquote>{children}</blockquote>;
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {isStreaming && (
          <div className="mt-6 flex items-center gap-2 text-muted-foreground font-body">
            <span className="loading-dot" />
            <span className="loading-dot" />
            <span className="loading-dot" />
            <span className="text-sm ml-2">Generating more content...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterDisplay;
