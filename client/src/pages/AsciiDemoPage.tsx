import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { AsciiCanvas, DEFAULT_ASCII_PARAMS } from '../components/visuals/AsciiCanvas';

export const AsciiDemoPage: React.FC = () => (
  <main className="min-h-[calc(100vh-9rem)] px-4 py-10 sm:px-8">
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link to="/" className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-black"><ArrowLeft className="h-4 w-4" /> Back to VoxCoach</Link>
          <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#147f76]" /><span className="text-xs font-mono font-bold uppercase tracking-widest text-[#147f76]">Canvas2D experiment</span></div>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-black sm:text-6xl">Custom ASCII art<span className="text-[#147f76]">.</span></h1>
          <p className="mt-2 max-w-xl text-sm font-medium text-zinc-700">A parameter-driven raster renderer with animated mosaic cells, bloom, vignette, and responsive Canvas2D sampling.</p>
        </div>
        <code className="hidden rounded-lg border-2 border-black bg-[#FFE600] px-3 py-2 text-[10px] font-bold shadow-[3px_3px_0_#191717] sm:block">renderMode: mosaic</code>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border-2 border-black bg-[#080d17] shadow-[8px_8px_0_#191717]">
        <AsciiCanvas params={{ ...DEFAULT_ASCII_PARAMS, renderMode: 'pixel', bgColor: '#090705', tint: '#d47a35', tintOpacity: 52, overlayBlend: 'screen', brightness: -8, contrast: 132, cellSize: 12 }} />
      </div>
      <p className="text-xs font-mono text-zinc-600">Source: <code>{DEFAULT_ASCII_PARAMS.src}</code>. Add the referenced WebP at <code>client/public/ascii-editor/demos/generated/ref-008.webp</code> to render the source photo; a visual fallback is shown until then.</p>
    </div>
  </main>
);
