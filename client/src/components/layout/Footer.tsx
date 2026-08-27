import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-black py-10 text-xs text-[#665f5b] font-sans bg-[#fff1e5]">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-black font-bold">
          VoxCoach — Learn. Speak. Improve.
        </p>
        <p className="text-[#665f5b] text-[11px]">
          Privacy First • Ephemeral In-Memory Processing
        </p>
      </div>
    </footer>
  );
};
