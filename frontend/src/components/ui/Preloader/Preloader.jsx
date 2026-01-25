import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = [
  "• Hello",
  "• Hola",
  "• Bonjour",
  "• Ciao",
  "• Hallo",
  "• नमस्ते",
  "• こんにちは",
  "• مرحبا",
  "• Olá",
  "• ନମସ୍କାର",
  "• 안녕하세요",
];

export default function Preloader({ onFinish }) {
  const greetingRef = useRef(null);
  const preloaderRef = useRef(null);

  const [textFinished, setTextFinished] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  // TEXT SEQUENCE (same logic as your JS)
  useEffect(() => {
    let index = 0;

    function showWords() {
      if (!greetingRef.current) return;

      greetingRef.current.textContent = WORDS[index];
      index++;

      if (index < WORDS.length) {
        setTimeout(showWords, 200);
      } else {
        setTextFinished(true);
      }
    }

    showWords();
  }, []);

  // PAGE LOAD DETECTION
  useEffect(() => {
    const onLoad = () => setPageLoaded(true);

    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  // REVEAL WHEN BOTH DONE
  useEffect(() => {
    if (!textFinished || !pageLoaded) return;

    const timeout = setTimeout(runReveal, 400);
    return () => clearTimeout(timeout);
  }, [textFinished, pageLoaded]);

  function runReveal() {
    gsap.to(preloaderRef.current, {
      scale: 15,
      opacity: 0,
      duration: 0.75,
      ease: "power4.inOut",
      onComplete: onFinish,
    });
  }

  return (
    <div
      ref={preloaderRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        ref={greetingRef}
        style={{
          color: "#fff",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 600,
          letterSpacing: "0.04em",
          willChange: "transform, opacity",
        }}
      >
        • Hello
      </h1>
    </div>
  );
}
