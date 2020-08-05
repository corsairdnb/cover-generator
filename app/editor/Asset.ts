import { AssetProps } from './types';

export abstract class Asset {
  protected constructor(readonly ctx: CanvasRenderingContext2D, readonly props: AssetProps) {
    this.ctx = ctx;
  }
  abstract render(): void;
}
