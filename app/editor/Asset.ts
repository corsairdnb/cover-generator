export abstract class Asset {
  constructor(readonly ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  abstract render(): void;
}
