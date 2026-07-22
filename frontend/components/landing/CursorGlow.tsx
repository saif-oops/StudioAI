"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    let frame: number;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle 120px at ${current.current.x}px ${current.current.y}px, rgba(255,60,40,0.06) 5%, rgba(255,40,20,0.02) 45%, transparent 95%)`;
      }

      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
