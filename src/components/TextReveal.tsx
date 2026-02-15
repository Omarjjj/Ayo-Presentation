import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  type?: 'chars' | 'words' | 'lines';
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  animate?: boolean;
}

const TextReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  type = 'chars',
  tag: Tag = 'span',
  animate = true,
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    const el = containerRef.current;
    if (!el) return;

    hasAnimated.current = true;

    const spans = el.querySelectorAll('.anim-unit');
    gsap.set(spans, { opacity: 0, y: 40, rotateX: -90 });

    gsap.to(spans, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    });

    return () => {
      hasAnimated.current = false;
    };
  }, [animate, delay, duration, stagger]);

  const splitContent = () => {
    if (type === 'chars') {
      return children.split('').map((char, i) => (
        <span
          key={i}
          className="anim-unit inline-block"
          style={{ perspective: '600px', display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    if (type === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <span className="anim-unit inline-block" style={{ perspective: '600px' }}>
            {word}
          </span>
        </span>
      ));
    }

    // lines
    return children.split('\n').map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <span className="anim-unit block" style={{ perspective: '600px' }}>
          {line}
        </span>
      </span>
    ));
  };

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {splitContent()}
    </Tag>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  animate?: boolean;
}

const FadeIn = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 40,
  animate = true,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    const el = ref.current;
    if (!el) return;

    hasAnimated.current = true;

    const dirs = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    gsap.set(el, { opacity: 0, ...dirs[direction] });
    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    });

    return () => {
      hasAnimated.current = false;
    };
  }, [animate, delay, duration, direction, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  animate?: boolean;
}

const StaggerChildren = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
  animate = true,
}: StaggerChildrenProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    const el = ref.current;
    if (!el) return;

    hasAnimated.current = true;

    const items = el.children;
    gsap.set(items, { opacity: 0, y: 30, scale: 0.95 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger,
      delay,
      ease: 'power2.out',
    });

    return () => {
      hasAnimated.current = false;
    };
  }, [animate, delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  animate?: boolean;
}

const CountUp = ({
  end,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  className = '',
  animate = true,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
      },
    });
  }, [animate, end, duration, delay, suffix, prefix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
};

export { TextReveal, FadeIn, StaggerChildren, CountUp };
