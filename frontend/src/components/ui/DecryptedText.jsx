// src/components/DecryptedText.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion"; // recommended import

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 20,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover", // "hover" | "view" | "both" | "none"
  loop = false,
  loopDelay = 3000,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  // refs for intervals/timeouts and iteration counter
  const scrambleIntervalRef = useRef(null);
  const loopIntervalRef = useRef(null);
  const endTimeoutRef = useRef(null);
  const currentIterationRef = useRef(0);

  // helper to clear the scramble interval safely
  const clearScrambleInterval = () => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
      scrambleIntervalRef.current = null;
    }
  };

  // helper to clear loop interval/timeout
  const clearLoopTimers = () => {
    if (loopIntervalRef.current) {
      clearInterval(loopIntervalRef.current);
      loopIntervalRef.current = null;
    }
    if (endTimeoutRef.current) {
      clearTimeout(endTimeoutRef.current);
      endTimeoutRef.current = null;
    }
  };

  // compute next reveal index based on revealDirection
  const getNextIndex = (revealedSet) => {
    const textLength = text.length;
    switch (revealDirection) {
      case "start":
        return revealedSet.size;
      case "end":
        return textLength - 1 - revealedSet.size;
      case "center": {
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(revealedSet.size / 2);
        const nextIndex =
          revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

        if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
          return nextIndex;
        }
        for (let i = 0; i < textLength; i++) if (!revealedSet.has(i)) return i;
        return 0;
      }
      default:
        return revealedSet.size;
    }
  };

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
    : characters.split("");

  const shuffleText = (originalText, currentRevealed) => {
    if (useOriginalCharsOnly) {
      const positions = originalText.split("").map((char, i) => ({
        char,
        isSpace: char === " ",
        index: i,
        isRevealed: currentRevealed.has(i),
      }));

      const nonSpaceChars = positions.filter((p) => !p.isSpace && !p.isRevealed).map((p) => p.char);

      // shuffle
      for (let i = nonSpaceChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
      }

      let charIndex = 0;
      return positions
        .map((p) => {
          if (p.isSpace) return " ";
          if (p.isRevealed) return originalText[p.index];
          return nonSpaceChars[charIndex++];
        })
        .join("");
    } else {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    }
  };

  // Core scramble logic — triggered when isHovering changes
  useEffect(() => {
    // cleanup old interval if any
    clearScrambleInterval();
    if (endTimeoutRef.current) {
      clearTimeout(endTimeoutRef.current);
      endTimeoutRef.current = null;
    }
    currentIterationRef.current = 0;

    if (!isHovering) {
      // reset to original state
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
      return;
    }

    // start scramble
    setIsScrambling(true);
    setRevealedIndices(new Set()); // reset so each run starts fresh
    currentIterationRef.current = 0;

    scrambleIntervalRef.current = setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        // create a copy so we can return new Set
        const prevCopy = new Set(prevRevealed);

        if (sequential) {
          // reveal one index per interval
          if (prevCopy.size < text.length) {
            const nextIndex = getNextIndex(prevCopy);
            prevCopy.add(nextIndex);
            setDisplayText(shuffleText(text, prevCopy));
            // stop when fully revealed
            if (prevCopy.size >= text.length) {
              clearScrambleInterval();
              setIsScrambling(false);
            }
            return prevCopy;
          } else {
            clearScrambleInterval();
            setIsScrambling(false);
            return prevCopy;
          }
        } else {
          // non-sequential: keep shuffling for maxIterations
          setDisplayText(shuffleText(text, prevCopy));
          currentIterationRef.current += 1;

          if (currentIterationRef.current >= maxIterations) {
            // finished scramble cycle
            clearScrambleInterval();
            setIsScrambling(false);
            setDisplayText(text);
          }
          return prevCopy;
        }
      });
    }, speed);

    return () => {
      clearScrambleInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);

  // IntersectionObserver for 'view' animation
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "both") return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);

          // turn off after single animation run (safe timeout)
          const duration = sequential ? text.length * speed + 300 : speed * maxIterations + 300;
          if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
          endTimeoutRef.current = setTimeout(() => setIsHovering(false), duration);
        }
      });
    };

    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const node = containerRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, hasAnimated, speed, maxIterations, sequential, text]);

  // Auto-loop effect (safe, non-overlapping)
  useEffect(() => {
    clearLoopTimers();
    if (!loop) return;

    // Start immediately once (optional). If you want first wait, remove the next lines.
    const startCycle = () => {
      // ensure fresh start
      setIsHovering(false);
      // tiny delay ensures scramble effect picks up reset state
      setTimeout(() => {
        setIsHovering(true);
        // compute total duration of scramble so we turn it off cleanly
        const totalDuration = sequential ? text.length * speed + 200 : speed * maxIterations + 200;
        if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
        endTimeoutRef.current = setTimeout(() => {
          setIsHovering(false);
        }, totalDuration);
      }, 50);
    };

    // start immediately once
    startCycle();

    // then schedule repeats
    loopIntervalRef.current = setInterval(() => {
      startCycle();
    }, loopDelay);

    return () => {
      clearLoopTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, loopDelay, speed, maxIterations, sequential, text]);

  const hoverProps =
    animateOn === "hover" || animateOn === "both"
      ? {
          onMouseEnter: () => {
            // start fresh on hover
            setIsHovering(true);
            // ensure no leaking timers
            if (endTimeoutRef.current) {
              clearTimeout(endTimeoutRef.current);
              endTimeoutRef.current = null;
            }
          },
          onMouseLeave: () => {
            // stop scramble on leave
            setIsHovering(false);
          },
        }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;
          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
