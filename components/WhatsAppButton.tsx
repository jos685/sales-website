"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "254783069010";
const WHATSAPP_MESSAGE = "Hi! I'd like to know more about QASHUP.";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      {/* full-viewport drag boundary */}
      <div ref={constraintsRef} className="pointer-events-none fixed inset-0 z-50" />

      <AnimatePresence>
        {visible && (
          <motion.a
            key="whatsapp-btn"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setTimeout(() => setDragging(false), 50)}
            onClick={(e) => { if (dragging) e.preventDefault(); }}
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-grab items-center justify-center rounded-full shadow-2xl active:cursor-grabbing"
            style={{ background: "#25D366", touchAction: "none" }}
          >
            {/* outer pulse ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "#25D366", opacity: 0.35 }}
            />
            {/* steady glow */}
            <span
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 20px 7px rgba(37,211,102,0.45)" }}
            />
            {/* WhatsApp icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="28"
              height="28"
              fill="white"
              className="relative z-10"
            >
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.736 5.469 2.027 7.77L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.853l-.485-.29-5.007 1.194 1.237-4.877-.317-.5A13.242 13.242 0 0 1 2.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.27-9.874c-.398-.199-2.354-1.162-2.72-1.294-.366-.133-.633-.199-.9.199-.266.398-1.031 1.294-1.264 1.56-.233.267-.466.3-.864.1-.398-.199-1.681-.62-3.202-1.977-1.184-1.057-1.983-2.362-2.216-2.76-.233-.398-.025-.613.175-.811.18-.178.398-.466.598-.699.199-.233.266-.398.398-.664.133-.267.066-.5-.033-.699-.1-.199-.9-2.17-1.232-2.97-.325-.78-.655-.674-.9-.686l-.765-.013c-.267 0-.7.1-1.066.498-.366.398-1.398 1.366-1.398 3.33 0 1.964 1.431 3.862 1.63 4.13.2.267 2.816 4.3 6.823 6.032.954.411 1.698.657 2.28.841.957.305 1.828.262 2.516.159.767-.114 2.354-.963 2.688-1.894.333-.931.333-1.73.233-1.894-.1-.166-.366-.266-.764-.465z" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
