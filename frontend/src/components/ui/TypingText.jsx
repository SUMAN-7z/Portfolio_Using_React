import { useEffect, useState } from "react";

export default function TypingEffect({
  texts = [],
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseTime = 1400,
  loop = true,
  className = "",
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    const current = texts[textIndex];
    let timer;

    if (!isDeleting && charIndex < current.length) {
      timer = setTimeout(
        () => setCharIndex((c) => c + 1),
        typingSpeed
      );
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(
        () => setCharIndex((c) => c - 1),
        deletingSpeed
      );
    } else if (!isDeleting && charIndex === current.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((i) => (loop ? (i + 1) % texts.length : i));
    }

    return () => clearTimeout(timer);
  }, [
    charIndex,
    isDeleting,
    texts,
    textIndex,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    loop,
  ]);

  return (
    <span className={`typing-wrapper ${className}`}>
      <span className="typing-text">
        {texts[textIndex]?.slice(0, charIndex)}
      </span>
      <span className="typing-cursor" aria-hidden>
        |
      </span>
    </span>
  );
}
