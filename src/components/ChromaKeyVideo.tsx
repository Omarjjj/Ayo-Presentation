import React, { useRef, useEffect, useState } from 'react';

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onEnded?: () => void;
  loop?: boolean;
  threshold?: number; // 0-255
  width?: number;
  height?: number;
}

const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({ 
  src, 
  className = '', 
  style,
  onEnded, 
  loop = false,
  threshold = 20,
  width = 1080,
  height = 1080
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const renderFrame = () => {
      if (video.paused || video.ended) return;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      const len = data.length;

      // Simple black keying
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is dark enough, make it transparent
        if (r < threshold && g < threshold && b < threshold) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(frame, 0, 0);
      requestRef.current = requestAnimationFrame(renderFrame);
    };

    const handlePlay = () => {
      requestRef.current = requestAnimationFrame(renderFrame);
    };

    const handleEnded = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (onEnded) onEnded();
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);
    
    // Attempt autoplay
    video.play().catch(e => console.log("Autoplay prevented:", e));

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [src, threshold, onEnded]);

  return (
    <div className={`relative ${className}`} style={style}>
      <video 
        ref={videoRef} 
        src={src} 
        loop={loop} 
        muted 
        playsInline 
        className="hidden"
        width={width}
        height={height}
      />
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ChromaKeyVideo;
