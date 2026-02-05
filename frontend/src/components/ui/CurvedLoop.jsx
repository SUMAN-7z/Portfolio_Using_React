import { useRef, useEffect, useState, useMemo, useId } from "react";

const CurvedLoop = ({
  marqueeText = "",
  speed = 2,
  className = "",
  curveAmount = 400,
  direction = "left",
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);

  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);

  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const totalText =
    spacing > 0
      ? Array(Math.ceil(1800 / spacing) + 2)
          .fill(text)
          .join("")
      : text;

  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text, className]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    const initial = -spacing;
    textPathRef.current.setAttribute("startOffset", `${initial}px`);
    setOffset(initial);
  }, [spacing]);

  useEffect(() => {
    if (!ready) return;

    let frame;
    const animate = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        let next =
          parseFloat(textPathRef.current.getAttribute("startOffset")) + delta;

        if (next <= -spacing) next += spacing;
        if (next > 0) next -= spacing;

        textPathRef.current.setAttribute("startOffset", `${next}px`);
        setOffset(next);
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [ready, speed, spacing]);

  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;

    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    let next = parseFloat(textPathRef.current.getAttribute("startOffset")) + dx;

    if (next <= -spacing) next += spacing;
    if (next > 0) next -= spacing;

    textPathRef.current.setAttribute("startOffset", `${next}px`);
    setOffset(next);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  return (
    <div
      className="flex items-center justify-center w-full py-16"
      style={{
        visibility: ready ? "visible" : "hidden",
        cursor: interactive
          ? dragRef.current
            ? "grabbing"
            : "grab"
          : "default",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block aspect-[100/7] text-[6rem] font-bold uppercase"
        viewBox="0 0 1440 120"
      >
        {/* Hidden measurement text */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>

        {ready && (
          <text xmlSpace="preserve" className={`fill-white ${className}`}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${offset}px`}
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
