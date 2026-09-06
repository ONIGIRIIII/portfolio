"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DotBadge } from "./DotBadge";

export function BackgroundHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    function onScroll() {
      setVisible(hero ? window.scrollY > hero.getBoundingClientRect().height * 0.6 : window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed right-6 top-20 z-40 hidden sm:right-12 sm:block"
        >
          <DotBadge>hover / click the background</DotBadge>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
