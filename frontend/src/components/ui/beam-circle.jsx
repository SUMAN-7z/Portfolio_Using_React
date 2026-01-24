"use client";
import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

const defaultOrbits = [];

const BeamCircle = ({ orbits = defaultOrbits, centerIcon }) => {
  const containerRef = useRef(null);
  const [size, setSize] = useState(0);

  /* Measure actual rendered size */
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      setSize(width);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const halfSize = size / 2;

  const rotationTransition = (duration) => ({
    repeat: Infinity,
    duration,
    ease: "linear",
  });

  const CenterIcon = useMemo(
    () => (
      <motion.div
        className="rounded-full bg-white grid place-content-center"
        style={{ width: 44, height: 44 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {centerIcon || <Sun size={22} color="#000" />}
      </motion.div>
    ),
    [centerIcon]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
    >
      {size > 0 &&
        orbits.map((orbit) => {
          const orbitDiameter = size * orbit.radiusFactor;
          const orbitRadius = orbitDiameter / 2;

          return (
            <React.Fragment key={orbit.id}>
              {/* Orbit Ring */}
              <div
                className="absolute rounded-full border border-dashed"
                style={{
                  width: orbitDiameter,
                  height: orbitDiameter,
                  top: halfSize - orbitRadius,
                  left: halfSize - orbitRadius,
                  borderColor:
                    orbit.orbitColor || "rgba(255,255,255,0.35)",
                  borderWidth: orbit.orbitThickness || 1,
                }}
              />

              {/* Rotation */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={rotationTransition(orbit.speed)}
              >
                <div
                  className="absolute"
                  style={{
                    top: halfSize,
                    left: halfSize + orbitRadius,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className="rounded-full bg-white grid place-content-center"
                    style={{
                      width: orbit.iconSize,
                      height: orbit.iconSize,
                    }}
                    animate={{ rotate: -360 }}
                    transition={rotationTransition(orbit.speed)}
                  >
                    {React.cloneElement(orbit.icon, {
                      size: orbit.iconSize * 0.55,
                      className: "text-black",
                    })}
                  </motion.div>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}

      {/* Center */}
      <div className="absolute inset-0 grid place-content-center z-10">
        {CenterIcon}
      </div>
    </div>
  );
};

export default BeamCircle;
