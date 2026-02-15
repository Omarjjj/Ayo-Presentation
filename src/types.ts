import type { ReactNode } from 'react';

export type SlideLayout = 'TITLE' | 'CONTENT' | 'DIAGRAM' | 'DEMO';

export interface SlideData {
  id: string;
  layout: SlideLayout;
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  imageSrc?: string;
  diagramStep?: {
    text: string;
    index: number;
    total: number;
  };
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
}
