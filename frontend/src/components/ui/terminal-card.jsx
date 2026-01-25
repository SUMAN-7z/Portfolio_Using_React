import React, { useEffect, useState, lazy, Suspense } from "react";
import { Copy, Terminal, Check } from "lucide-react";
import { cn } from "../../components/ui/utils";
import { motion } from "framer-motion";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((mod) => ({
    default: mod.Prism,
  }))
);

const TerminalCard = ({ command, language = "tsx", className }) => {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Typing animation
  useEffect(() => {
    let timeout;

    if (index < command.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + command.charAt(index));
        setIndex((prev) => prev + 1);
      }, 50);
    } else {
      setIsComplete(true);
      timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
        setIsComplete(false);
      }, 6000);
    }

    return () => clearTimeout(timeout);
  }, [index, command]);

  // Copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        "border rounded-lg backdrop-blur-md min-w-[300px] max-w-full",
        "bg-white/70 border-gray-300 text-black",
        "dark:bg-white/10 dark:border-gray-400/20 dark:text-white",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-[#202425] rounded-t-lg text-sm font-semibold text-gray-700 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-500" />
          Terminal
        </div>
        <button
          className="p-1 border rounded transition hover:border-gray-600 dark:hover:border-white text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="rounded-b-lg text-sm font-mono p-3 bg-black text-white max-h-[300px] overflow-auto">
        {isComplete ? (
          <Suspense fallback={null}>
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                background: "transparent",
                margin: 0,
                padding: 0,
              }}
            >
              {command}
            </SyntaxHighlighter>
          </Suspense>
        ) : (
          <motion.pre className="whitespace-pre-wrap">
            {displayedText}
            <motion.span
              className="inline-block w-1 bg-white ml-1"
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </motion.pre>
        )}
      </div>
    </div>
  );
};

export default TerminalCard;
