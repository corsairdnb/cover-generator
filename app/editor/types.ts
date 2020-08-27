import { Label } from './Label';

export type ContextConfig = {
  ctx: CanvasRenderingContext2D;
  scale: number;
};

export type EditorLabels = { [id: string]: Label };
