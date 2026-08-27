import React, { useEffect, useRef } from 'react';

export type AsciiRenderMode = 'characters' | 'dither' | 'mosaic' | 'pixel' | 'dots' | 'cross' | 'diamond' | 'voxel' | 'lego' | 'mixed' | 'lines' | 'diagonal' | 'braille' | 'disco' | 'hexdump' | 'matrix' | 'rings' | 'hearts' | 'stars' | 'hexagons' | 'triangles' | 'bubbles' | 'hatch' | 'contour' | 'halfblocks';
export type BackgroundMode = 'blurred' | 'solid' | 'original' | 'none';
export type AnimationStyle = 'wave' | 'pulse' | 'shimmer' | 'ripple' | 'flicker';

export interface AsciiEffectParams {
  src: string;
  renderMode: AsciiRenderMode;
  bgMode: BackgroundMode;
  bgColor?: string;
  bgBlur: number;
  bgOpacity: number;
  cellSize: number;
  coverage: number;
  invert: boolean;
  styleBlend: GlobalCompositeOperation;
  charSet: 'standard' | 'blocks' | 'minimal' | 'custom';
  customChars: string;
  brightness: number;
  contrast: number;
  edgeEmphasis: number;
  density: number;
  toneCurve?: Array<{ x: number; y: number }>;
  tint: string;
  tintOpacity: number;
  overlayBlend: GlobalCompositeOperation;
  saturation: number;
  grayscale: number;
  blurType: 'off' | 'normal' | 'directional' | 'radial';
  blurAmount: number;
  blurAngle?: number;
  directionalBothSides?: boolean;
  tiltFocus?: number;
  tiltPosition?: number;
  tiltFeather?: number;
  lensFocus?: number;
  blurCenterX?: number;
  blurCenterY?: number;
  progressivePosition?: number;
  progressiveReverse?: boolean;
  pfx: Record<string, { enabled: boolean; intensity: number }>;
  animated: boolean;
  animStyle: AnimationStyle;
  animSpeed: { enabled: boolean; intensity: number };
  animIntensity: { enabled: boolean; intensity: number };
  lights: { enabled: boolean; points: Array<{ x: number; y: number; radius: number; intensity: number; color?: string }> };
  mask: { enabled: boolean; invert: boolean; dataUrl: string | null };
}

export const DEFAULT_ASCII_PARAMS: AsciiEffectParams = {
  src: '/ascii-editor/demos/generated/ref-008.webp', renderMode: 'mosaic', bgMode: 'solid', bgColor: '#080d17', bgBlur: 12, bgOpacity: 90,
  cellSize: 16, coverage: 100, invert: false, styleBlend: 'source-over', charSet: 'standard', customChars: '', brightness: 12, contrast: 115,
  edgeEmphasis: 0, density: 0, toneCurve: [{ x: 0, y: 0 }, { x: 1, y: 1 }], tint: '#3ca6ff', tintOpacity: 0, overlayBlend: 'multiply', saturation: 100, grayscale: 0, blurType: 'off', blurAmount: 35,
  pfx: { vignette: { enabled: true, intensity: 38 }, scanLines: { enabled: false, intensity: 40 }, chromatic: { enabled: false, intensity: 15 }, bloom: { enabled: true, intensity: 25 }, filmGrain: { enabled: false, intensity: 30 }, glitch: { enabled: false, intensity: 20 }, halftone: { enabled: false, intensity: 20 }, pixelate: { enabled: false, intensity: 15 }, filmDust: { enabled: false, intensity: 20 } },
  animated: true, animStyle: 'wave', animSpeed: { enabled: true, intensity: 100 }, animIntensity: { enabled: true, intensity: 60 }, lights: { enabled: false, points: [] }, mask: { enabled: false, invert: false, dataUrl: null },
};

interface Props { params?: Partial<AsciiEffectParams>; className?: string; }
type RGB = [number, number, number];

const clamp = (v: number, min = 0, max = 255) => Math.max(min, Math.min(max, v));
const hexToRgb = (hex: string): RGB => { const clean = hex.replace('#', ''); const n = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mix = (a: RGB, b: RGB, amount: number): RGB => [a[0] + (b[0] - a[0]) * amount, a[1] + (b[1] - a[1]) * amount, a[2] + (b[2] - a[2]) * amount];
const luminance = (c: RGB) => (c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722) / 255;

const drawPrimitive = (ctx: CanvasRenderingContext2D, mode: AsciiRenderMode, x: number, y: number, size: number, tone: number, color: string, time: number, customChars = '') => {
  const midX = x + size / 2, midY = y + size / 2, r = size * (0.12 + tone * 0.38);
  ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = Math.max(1, size * 0.08);
  if (mode === 'characters' || mode === 'hexdump' || mode === 'matrix' || mode === 'braille') { const chars = mode === 'hexdump' ? '0123456789ABCDEF' : mode === 'matrix' ? '01アイウ' : mode === 'braille' ? '⠿⠻⠽⠾⠶⠦' : customChars || ' .:-=+*#%@'; ctx.font = `${Math.max(8, size * 0.9)}px monospace`; ctx.fillText(chars[Math.min(chars.length - 1, Math.floor(tone * chars.length))], x, y + size * 0.78); return; }
  ctx.beginPath();
  switch (mode) {
    case 'dots': case 'bubbles': case 'disco': ctx.arc(midX, midY, r, 0, Math.PI * 2); mode === 'bubbles' ? ctx.stroke() : ctx.fill(); break;
    case 'cross': ctx.moveTo(midX - r, midY); ctx.lineTo(midX + r, midY); ctx.moveTo(midX, midY - r); ctx.lineTo(midX, midY + r); ctx.stroke(); break;
    case 'diamond': ctx.moveTo(midX, midY - r); ctx.lineTo(midX + r, midY); ctx.lineTo(midX, midY + r); ctx.lineTo(midX - r, midY); ctx.closePath(); ctx.fill(); break;
    case 'rings': ctx.arc(midX, midY, r, 0, Math.PI * 2); ctx.stroke(); if (tone > .55) { ctx.beginPath(); ctx.arc(midX, midY, r * .45, 0, Math.PI * 2); ctx.stroke(); } break;
    case 'hearts': ctx.moveTo(midX, midY + r); ctx.bezierCurveTo(midX - r * 1.8, midY - r * .2, midX - r, midY - r * 1.4, midX, midY - r * .5); ctx.bezierCurveTo(midX + r, midY - r * 1.4, midX + r * 1.8, midY - r * .2, midX, midY + r); ctx.fill(); break;
    case 'stars': for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * .42 : r; ctx.lineTo(midX + Math.cos(a) * rr, midY + Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); break;
    case 'hexagons': for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.lineTo(midX + Math.cos(a) * r, midY + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); break;
    case 'triangles': ctx.moveTo(midX, midY - r); ctx.lineTo(midX + r, midY + r); ctx.lineTo(midX - r, midY + r); ctx.closePath(); ctx.fill(); break;
    case 'lines': case 'diagonal': ctx.moveTo(x, mode === 'diagonal' ? y + size : midY); ctx.lineTo(x + size, mode === 'diagonal' ? y : midY); ctx.stroke(); break;
    case 'hatch': for (let i = -size; i < size * 2; i += Math.max(3, size * .3)) { ctx.moveTo(x + i, y); ctx.lineTo(x + i - size, y + size); ctx.moveTo(x + i, y + size); ctx.lineTo(x + i + size, y); } ctx.stroke(); break;
    case 'contour': for (let i = 1; i < 4; i++) { ctx.rect(x + i * size / 8, y + i * size / 8, size - i * size / 4, size - i * size / 4); } ctx.stroke(); break;
    case 'halfblocks': ctx.fillRect(x, y + size * .5, size, size * .5); break;
    case 'pixel': case 'mosaic': case 'voxel': case 'lego': ctx.fillRect(x + size * .06, y + size * .06, size * .88, size * .88); if (mode === 'lego') { ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(x + size * .2, y + size * .14, size * .12, size * .12); } break;
    case 'dither': for (let py = 0; py < 3; py++) for (let px = 0; px < 3; px++) if (((px + py) / 5) < tone) ctx.fillRect(x + px * size / 3, y + py * size / 3, size / 3, size / 3); break;
    case 'mixed': tone > .65 ? ctx.fillRect(x, y, size, size) : ctx.arc(midX, midY, r, 0, Math.PI * 2); tone > .65 ? ctx.fill() : ctx.stroke(); break;
    default: ctx.fillRect(x, y, size, size);
  }
  // Tiny phase shift gives the animated modes life without moving the grid.
  if (mode === 'disco' && Math.sin(time + x * .02) > .8) { ctx.globalAlpha = .35; ctx.fillRect(x, y, size, size); ctx.globalAlpha = 1; }
};

export const AsciiCanvas: React.FC<Props> = ({ params, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const merged = { ...DEFAULT_ASCII_PARAMS, ...params, pfx: { ...DEFAULT_ASCII_PARAMS.pfx, ...(params?.pfx || {}) }, lights: { ...DEFAULT_ASCII_PARAMS.lights, ...(params?.lights || {}) }, mask: { ...DEFAULT_ASCII_PARAMS.mask, ...(params?.mask || {}) } } as AsciiEffectParams;
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true }); if (!ctx) return;
    const source = new Image(); source.crossOrigin = 'anonymous'; const maskImage = new Image(); let frame = 0; let imageReady = false; let maskReady = false;
    const drawPlaceholder = (target: CanvasRenderingContext2D, w: number, h: number) => {
      const gradient = target.createLinearGradient(0, 0, w, h); gradient.addColorStop(0, '#080604'); gradient.addColorStop(.55, '#2c160a'); gradient.addColorStop(1, '#070504'); target.fillStyle = gradient; target.fillRect(0, 0, w, h);
      const glow = target.createRadialGradient(w * .62, h * .38, 0, w * .62, h * .38, Math.min(w, h) * .42); glow.addColorStop(0, 'rgba(239,145,68,.82)'); glow.addColorStop(.45, 'rgba(130,58,20,.26)'); glow.addColorStop(1, 'rgba(0,0,0,0)'); target.fillStyle = glow; target.fillRect(0, 0, w, h);
      const cx = w * .62, cy = h * .45, unit = Math.min(w, h) * .16; target.save(); target.shadowColor = '#000'; target.shadowBlur = unit * .24; target.shadowOffsetY = unit * .13; target.fillStyle = '#d47a35'; target.beginPath(); target.roundRect(cx - unit * .36, cy - unit * 1.35, unit * .72, unit * 1.45, unit * .34); target.fill(); target.fillStyle = '#301407'; target.beginPath(); target.roundRect(cx - unit * .22, cy - unit * 1.2, unit * .44, unit * 1.08, unit * .2); target.fill(); target.strokeStyle = '#f5b06e'; target.lineWidth = unit * .1; target.beginPath(); target.arc(cx, cy - unit * .12, unit * .58, 0, Math.PI); target.stroke(); target.beginPath(); target.moveTo(cx, cy + unit * .45); target.lineTo(cx, cy + unit * .93); target.moveTo(cx - unit * .52, cy + unit * .93); target.lineTo(cx + unit * .52, cy + unit * .93); target.stroke(); target.restore();
    };
    const render = (timeMs: number) => {
      const rect = canvas.getBoundingClientRect(); const dpr = Math.min(2, window.devicePixelRatio || 1); const w = Math.max(1, Math.floor(rect.width * dpr)); const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      const time = timeMs * .001 * (merged.animSpeed.enabled ? merged.animSpeed.intensity / 100 : 0);
      const sourceCanvas = document.createElement('canvas'); sourceCanvas.width = w; sourceCanvas.height = h; const sourceCtx = sourceCanvas.getContext('2d'); if (!sourceCtx) return;
      if (imageReady) { const scale = Math.max(w / source.width, h / source.height); const iw = source.width * scale, ih = source.height * scale; sourceCtx.drawImage(source, (w - iw) / 2, (h - ih) / 2, iw, ih); } else drawPlaceholder(sourceCtx, w, h);
      ctx.clearRect(0, 0, w, h); const bg = hexToRgb(merged.bgColor || '#080d17');
      if (merged.bgMode === 'solid') { ctx.fillStyle = `rgba(${bg.join(',')},${merged.bgOpacity / 100})`; ctx.fillRect(0, 0, w, h); } else if (merged.bgMode === 'original' || merged.bgMode === 'blurred') { ctx.globalAlpha = merged.bgOpacity / 100; ctx.filter = merged.bgMode === 'blurred' ? `blur(${merged.bgBlur * dpr}px)` : 'none'; ctx.drawImage(sourceCanvas, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1; }
      const pixels = sourceCtx.getImageData(0, 0, w, h).data; const cell = Math.max(4, merged.cellSize * dpr); const chars = merged.customChars || (merged.charSet === 'blocks' ? ' ░▒▓█' : merged.charSet === 'minimal' ? ' .oO' : ' .:-=+*#%@'); ctx.save(); ctx.globalCompositeOperation = merged.styleBlend;
      for (let y = 0; y < h; y += cell) for (let x = 0; x < w; x += cell) {
        let r = 0, g = 0, b = 0, count = 0; for (let sy = y; sy < Math.min(h, y + cell); sy += Math.max(1, Math.floor(cell / 4))) for (let sx = x; sx < Math.min(w, x + cell); sx += Math.max(1, Math.floor(cell / 4))) { const i = (sy * w + sx) * 4; r += pixels[i]; g += pixels[i + 1]; b += pixels[i + 2]; count++; }
        let color: RGB = [r / count, g / count, b / count]; let tone = luminance(color); if (merged.invert) tone = 1 - tone; tone = clamp((tone + merged.brightness / 100 - .5) * merged.contrast / 100 + .5, 0, 1); const grey = tone * 255; color = mix(color, [grey, grey, grey], merged.grayscale / 100); const max = Math.max(color[0], color[1], color[2]); const sat = (merged.saturation / 100); color = color.map(v => clamp(max - (max - v) * sat)) as RGB; color = mix(color, hexToRgb(merged.tint), merged.tintOpacity / 100); const alpha = (merged.coverage / 100) * (merged.density ? Math.min(1, merged.density / 100 + tone) : 1); if (Math.random() > alpha) continue;
        let animatedTone = tone; if (merged.animated && merged.animIntensity.enabled) { const wave = Math.sin(x * .018 + time * 2 + y * .011) * merged.animIntensity.intensity / 100 * .12; if (merged.animStyle === 'pulse') animatedTone += Math.sin(time * 3) * .1; else if (merged.animStyle === 'flicker') animatedTone += (Math.random() - .5) * .12; else animatedTone += wave; } animatedTone = clamp(animatedTone, 0, 1); ctx.globalAlpha = alpha; ctx.filter = merged.blurType === 'off' ? 'none' : `blur(${Math.max(0.5, merged.blurAmount / 18)}px)`; drawPrimitive(ctx, merged.renderMode, x, y, cell, animatedTone, `rgb(${color.map(v => Math.round(v)).join(',')})`, time, chars); ctx.filter = 'none';
      }
      ctx.restore(); ctx.globalAlpha = 1;
      const pfx = merged.pfx; if (pfx.bloom?.enabled) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = pfx.bloom.intensity / 400; ctx.filter = `blur(${Math.max(1, pfx.bloom.intensity / 12)}px)`; ctx.drawImage(canvas, 0, 0); ctx.restore(); }
      if (pfx.chromatic?.enabled) { ctx.save(); ctx.globalAlpha = pfx.chromatic.intensity / 250; ctx.globalCompositeOperation = 'screen'; ctx.drawImage(canvas, 3 * dpr, 0); ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(canvas, -3 * dpr, 0); ctx.restore(); }
      if (pfx.scanLines?.enabled) { ctx.save(); ctx.globalAlpha = pfx.scanLines.intensity / 300; ctx.fillStyle = '#000'; for (let y = 0; y < h; y += 4 * dpr) ctx.fillRect(0, y, w, dpr); ctx.restore(); }
      if (pfx.halftone?.enabled) { ctx.save(); ctx.globalAlpha = pfx.halftone.intensity / 250; ctx.fillStyle = '#000'; for (let y = 0; y < h; y += 6 * dpr) for (let x = 0; x < w; x += 6 * dpr) ctx.fillRect(x, y, dpr, dpr); ctx.restore(); }
      if (pfx.filmGrain?.enabled || pfx.filmDust?.enabled) { ctx.save(); ctx.globalAlpha = (pfx.filmGrain?.intensity || pfx.filmDust?.intensity || 0) / 500; for (let i = 0; i < w * h / 180; i++) { ctx.fillStyle = Math.random() > .5 ? '#fff' : '#000'; ctx.fillRect(Math.random() * w, Math.random() * h, dpr, dpr); } ctx.restore(); }
      if (pfx.glitch?.enabled && Math.random() < .12) { const slice = Math.max(1, Math.floor(h * .04)); ctx.drawImage(canvas, Math.random() * 10 * dpr, slice, w, slice, 0, slice, w, slice); }
      if (merged.mask.enabled && merged.mask.dataUrl && maskReady) {
        const maskCanvas = document.createElement('canvas'); maskCanvas.width = w; maskCanvas.height = h; const maskCtx = maskCanvas.getContext('2d');
        if (maskCtx) { maskCtx.drawImage(maskImage, 0, 0, w, h); if (merged.mask.invert) { const maskData = maskCtx.getImageData(0, 0, w, h); for (let i = 0; i < maskData.data.length; i += 4) maskData.data[i] = maskData.data[i + 1] = maskData.data[i + 2] = 255 - maskData.data[i]; maskCtx.putImageData(maskData, 0, 0); } ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.globalAlpha = .95; ctx.drawImage(maskCanvas, 0, 0); ctx.restore(); }
      }
      if (pfx.vignette?.enabled) { const gradient = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .2, w / 2, h / 2, Math.max(w, h) * .75); gradient.addColorStop(0, 'rgba(0,0,0,0)'); gradient.addColorStop(1, `rgba(0,0,0,${pfx.vignette.intensity / 100})`); ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h); }
      if (merged.lights.enabled) merged.lights.points.forEach(point => { const gradient = ctx.createRadialGradient(point.x * w, point.y * h, 0, point.x * w, point.y * h, point.radius * dpr); gradient.addColorStop(0, `${point.color || '#3ca6ff'}${Math.round(Math.min(1, point.intensity / 100) * 255).toString(16).padStart(2, '0')}`); gradient.addColorStop(1, 'transparent'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h); });
      frame = merged.animated ? requestAnimationFrame(render) : 0;
    };
    source.onload = () => { imageReady = true; render(0); }; source.onerror = () => { imageReady = false; render(0); }; source.src = merged.src;
    if (merged.mask.enabled && merged.mask.dataUrl) { maskImage.onload = () => { maskReady = true; render(performance.now()); }; maskImage.src = merged.mask.dataUrl; }
    render(0); const resize = () => render(performance.now()); window.addEventListener('resize', resize); return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [merged]);
  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-label="Animated ASCII art image effect" />;
};
