"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Quote() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const animatedWords = ["the", "most", "robust", "event", "platform"];
  const motionWords = animatedWords.map((word, index) => {
    if (word !== "the") {
      return (
        <motion.span
          key={index}
          initial={{ color: "#ffffff" }}
          animate={{
            color: ["#ffffff", "#71d08c", "#71d08c", "#71d08c", "#ffffff"],
          }}
          transition={{
            delay: 2 * (index - 1),
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5.65,
            ease: "easeInOut",
          }}
        >
          {word}{" "}
        </motion.span>
      );
    } else {
      return <span key={index}>{word} </span>;
    }
  });

  const staticWords = [
    '"Treasure',
    "is",
    "for",
    "hosting",
    'conventions."',
  ].map((word, index) => (
    <motion.span key={index} style={{ opacity }}>
      {word}{" "}
    </motion.span>
  ));

  return (
    <motion.section ref={ref} className="h-[75vh] my-40 mx-2 md:mx-10">
      <motion.div
        style={{ opacity }}
        className="h-[2px] w-full mb-6 md:mb-20 bg-primary"
      />
      <h1 className="max-w-6xl m-auto text-center font-bold text-3xl md:text-5xl leading-relaxed text-foreground">
        {staticWords.slice(0, 2)}
        {motionWords}
        {staticWords.slice(2)}
      </h1>
      <motion.div
        style={{ opacity }}
        className="h-[2px] w-full mt-6 md:mt-20 bg-primary"
      />
    </motion.section>
  );
}
