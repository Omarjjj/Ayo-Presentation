import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  onEnded?: () => void;
  loop?: boolean;
  threshold?: number; // Threshold for black removal
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  src, 
  className, 
  onEnded, 
  loop = false,
  threshold = 10 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      if (video.paused || video.ended) return;

      // Set canvas size to match video
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      const len = data.length;

      // Loop through pixels
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Check if pixel is close to black
        if (r < threshold && g < threshold && b < threshold) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      // Put modified image data back
      ctx.putImageData(frame, 0, 0);

      animationFrameId = requestAnimationFrame(render);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      render();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationFrameId);
      if (onEnded) onEnded();
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);
    
    // Start playing
    video.play().catch(err => console.error("Video play failed:", err));

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationFrameId);
    };
  }, [src, threshold, onEnded]);

  return (
    <div className={`relative ${className}`}>
      <video 
        ref={videoRef} 
        src={src} 
        loop={loop} 
        muted 
        playsInline 
        className="hidden" // Hide the original video
      />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default VideoBackground;
