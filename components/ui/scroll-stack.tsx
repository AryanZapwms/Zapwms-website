// components/ui/scroll-stack.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollStackProps {
  items: {
    title: string;
    description: string;
    content?: React.ReactNode; // for modal/details
  }[];
  className?: string;
}

export function ScrollStack({ items, className }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {items.map((item, index) => (
        <ScrollStackCard
          key={index}
          item={item}
          index={index}
          total={items.length}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}

function ScrollStackCard({
  item,
  index,
  total,
  onClick,
}: {
  item: ScrollStackProps["items"][0];
  index: number;
  total: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const topOffset = index * 8; // 8px offset between cards
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 1, 0.6]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: "sticky",
        top: `calc(15vh + ${topOffset}px)`,
        scale,
        opacity,
        zIndex: total - index,
      }}
      className="w-full max-w-2xl mx-auto p-6 border border-gray-800 rounded-2xl  bg-white cursor-pointer hover:border-yellow-400 mb-4"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="text-gray-400">{item.description}</p>
    </motion.div>
  );
}