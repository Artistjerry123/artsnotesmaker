import { BookOpen } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <BookOpen className="w-12 h-12 text-primary" />
        </div>
      </div>
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">
        Researching & Generating Chapter
      </h2>
      <p className="text-muted-foreground font-body max-w-md mb-6">
        Scanning 9 exam papers, extracting relevant concepts, and crafting your textbook chapter...
      </p>
      <div className="flex gap-2">
        <span className="loading-dot" />
        <span className="loading-dot" />
        <span className="loading-dot" />
      </div>
    </div>
  );
};

export default LoadingScreen;
