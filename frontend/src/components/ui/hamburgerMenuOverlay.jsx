"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../ui/utils";
import { Menu, X } from "lucide-react";

const HamburgerMenuOverlay = ({
  items = [],
  buttonTop = "24px",
  buttonLeft = "24px",
  buttonSize = "md",
  // buttonColor = "#ecd8bd",
    buttonColor = "#fff",
  overlayBackground = "#000",
  textColor = "#000",
  fontSize = "md",
  fontFamily = '"Krona One", monospace',
  fontWeight = "bold",
  animationDuration = 1.5,
  staggerDelay = 0.1,
  className,
  buttonClassName,
  menuItemClassName,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  enableBlur = false,
  zIndex = 1000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const buttonSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const fontSizes = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    "2xl": "text-6xl md:text-7xl",
  };

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      next ? onOpen?.() : onClose?.();
      return next;
    });
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const handleItemClick = (item) => {
    item.onClick?.();
    if (item.href && !item.onClick) window.location.href = item.href;

    if (!keepOpenOnItemClick) {
      setIsOpen(false);
      onClose?.();
    }
  };

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [isOpen, onClose]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

        .hamburger-overlay-${zIndex} {
          position: fixed;
          inset: 0;
          background: ${overlayBackground};
          z-index: ${zIndex};
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: circle(0px at ${buttonLeft} ${buttonTop});
          transition: clip-path ${animationDuration}s ease;
          ${enableBlur ? "backdrop-filter: blur(10px);" : ""}
        }

        .hamburger-overlay-${zIndex}.open {
          clip-path: circle(150% at ${buttonLeft} ${buttonTop});
        }

        .hamburger-button-${zIndex} {
          position: fixed; /* ✅ FIXED */
          top: ${buttonTop};
          left: ${buttonLeft};
          background: ${buttonColor};
          border-radius: 20px;
          border: none;
          cursor: pointer;
          z-index: ${zIndex + 2};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-item-${zIndex} {
          list-style: none;
          opacity: 0;
          transform: translateX(-200px);
          transition: all 0.3s ease;
          font-family: ${fontFamily};
          font-weight: ${fontWeight};
          color: ${textColor};
        }

        .menu-item-${zIndex}.visible {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      {/* Overlay */}
      <nav
        ref={navRef}
        className={cn(
          `hamburger-overlay-${zIndex}`,
          isOpen && "open",
          className
        )}
      >
        <ul className="space-y-6">
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                `menu-item-${zIndex}`,
                fontSizes[fontSize],
                isOpen && "visible",
                menuItemClassName
              )}
              style={{
                transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s",
              }}
              onClick={() => handleItemClick(item)}
              tabIndex={isOpen ? 0 : -1}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Fixed Button */}
      <button
        className={cn(
          `hamburger-button-${zIndex}`,
          buttonSizes[buttonSize],
          buttonClassName
        )}
        onClick={toggleMenu}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
      >
        {customButton || (
          <>
            <Menu className={!isOpen ? "block" : "hidden"} color={textColor} />
            <X className={isOpen ? "block" : "hidden"} color={textColor} />
          </>
        )}
      </button>
    </>
  );
};

export default HamburgerMenuOverlay;
