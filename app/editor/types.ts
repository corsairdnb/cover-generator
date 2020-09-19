import { Label } from './Label';
import { Asset } from './Asset';

export type ContextConfig = {
  ctx: CanvasRenderingContext2D;
  scale: number;
};

export type EditorLabels = { [id: string]: Label };
export type EditorAssets = { [id: string]: Asset };
