import { motion } from 'framer-motion';
import { ReactNode, TouchEvent, useEffect, useRef, useState } from 'react';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const ScrollExpandMedia = ({
  mediaType = 'video', mediaSrc, posterSrc, bgImageSrc, title, date, scrollToExpand, textBlend, children,
}: ScrollExpandMediaProps) => {
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProgress(0);
    setExpanded(false);
  }, [mediaSrc]);

  const updateProgress = (delta: number) => {
    const next = clamp(progress + delta, 0, 1);
    setProgress(next);
    if (next >= 1) setExpanded(true);
    if (next < 0.75) setExpanded(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (expanded) return;
    event.preventDefault();
    updateProgress(event.deltaY * 0.0011);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => setTouchStartY(event.touches[0].clientY);
  const handleTouchMove = (event: TouchEvent<HTMLElement>) => {
    if (expanded || touchStartY === null) return;
    event.preventDefault();
    const currentY = event.touches[0].clientY;
    updateProgress((touchStartY - currentY) * 0.006);
    setTouchStartY(currentY);
  };

  const mediaWidth = 320 + progress * 1250;
  const mediaHeight = 390 + progress * 400;
  const textOffset = progress * 150;
  const titleWords = title?.split(' ') || [];
  const firstWord = titleWords[0] || '';
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <div ref={sectionRef} className="overflow-x-hidden bg-[#080d17] text-white">
      <section className="relative flex min-h-screen flex-col items-center" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => setTouchStartY(null)}>
        <motion.div className="absolute inset-0" animate={{ opacity: 1 - progress }} transition={{ duration: 0.15 }}>
          <img src={bgImageSrc} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#080d17]/65" />
        </motion.div>

        <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16">
          <div className="absolute left-6 top-8 text-[10px] font-mono uppercase tracking-[0.24em] text-[#66d9c9] sm:left-10">VoxCoach / immersive signal</div>
          <div className="absolute right-6 top-8 border border-white/20 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/60 sm:right-10">Scroll to expand</div>

          <div className="relative z-10 flex w-full flex-col items-center">
            <div className="relative overflow-hidden rounded-xl border border-white/25 shadow-[0_0_70px_rgba(0,0,0,.55)]" style={{ width: `${Math.min(mediaWidth, 95)}vw`, height: `${Math.min(mediaHeight, 78)}vh`, maxWidth: '95vw', maxHeight: '78vh' }}>
              {mediaType === 'video' ? <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover" /> : <img src={mediaSrc} alt={title || 'Featured media'} className="h-full w-full object-cover" />}
              <motion.div className="absolute inset-0 bg-black/35" animate={{ opacity: 0.62 - progress * 0.32 }} />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-xs font-mono uppercase tracking-widest text-white/80 sm:p-7"><span>{date}</span><span>{Math.round(progress * 100)}% expanded</span></div>
            </div>

            <div className={`pointer-events-none mt-8 flex flex-col items-center gap-1 text-center ${textBlend ? 'mix-blend-screen' : ''}`}>
              <motion.h1 className="text-4xl font-black tracking-tight text-[#d9f6f0] sm:text-6xl" animate={{ x: -textOffset }} transition={{ duration: 0 }}>{firstWord}</motion.h1>
              <motion.h1 className="text-4xl font-black tracking-tight text-[#ffdc60] sm:text-6xl" animate={{ x: textOffset }} transition={{ duration: 0 }}>{restOfTitle}</motion.h1>
            </div>
            <p className="mt-5 text-xs font-mono uppercase tracking-[0.2em] text-white/60">{scrollToExpand}</p>
          </div>
        </div>
      </section>

      <motion.section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-24" initial={{ opacity: 0 }} animate={{ opacity: expanded ? 1 : 0.18 }} transition={{ duration: 0.6 }}>{children}</motion.section>
    </div>
  );
};

export default ScrollExpandMedia;
