import {
  canvasHeight,
  canvasWidth,
  exportHeight,
  exportWidth,
  initialFontFamily
} from './constants';
import { Asset } from './Asset';

export class Editor {
  private assets: Asset[] = [];
  private imageElement: HTMLImageElement | undefined;
  get image(): HTMLImageElement | undefined {
    return this.imageElement;
  }
  set image(value: HTMLImageElement | undefined) {
    this.imageElement = value;
    this.render();
  }

  private fontFamily = initialFontFamily;
  get font(): string {
    return this.fontFamily;
  }
  set font(value: string) {
    if (value) {
      this.fontFamily = value;
    } else {
      this.fontFamily = initialFontFamily;
    }
    this.render();
  }

  private exportCanvas = document.createElement('canvas');
  private exportCtx: CanvasRenderingContext2D;
  public readonly ctx: CanvasRenderingContext2D;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    // eslint-disable-next-line no-console
    console.log(this.ctx);

    this.exportCtx = this.exportCanvas.getContext('2d')!;
    this.initExportContext();
  }

  private initExportContext() {
    this.exportCanvas.width = exportWidth;
    this.exportCanvas.height = exportHeight;
  }

  private renderFonts(ctx: CanvasRenderingContext2D) {
    ctx.font = `20px/0${this.fontFamily.padStart(this.fontFamily.length + 1)}`;
    ctx.fillText('Test content', 100, 50);
  }

  private renderBackground(
    ctx: CanvasRenderingContext2D,
    width = canvasWidth,
    height = canvasHeight
  ) {
    this.image && ctx.drawImage(this.image, 0, 0, width, height);
  }

  private renderAssets(ctx: CanvasRenderingContext2D, scale = 0.5) {
    this.assets.forEach((asset) => {
      const { maxWidth, bottom, left: x } = asset.props;
      const imageWidth = asset.image.width;
      const imageHeight = asset.image.height;
      const width = Math.max(imageWidth, maxWidth) * scale;
      const height = Math.round((width * imageHeight * scale) / width) * scale;
      const y = ctx.canvas.height - height - bottom;
      ctx.drawImage(asset.image, x, y, width, height);
    });
  }

  public render() {
    this.renderBackground(this.ctx);
    this.renderFonts(this.ctx);
    this.renderAssets(this.ctx);
  }

  private renderExportContext() {
    this.renderBackground(this.exportCtx, exportWidth, exportHeight);
    this.renderFonts(this.exportCtx);
    this.renderAssets(this.exportCtx, 1);
  }

  public getDataUrl() {
    this.renderExportContext();
    return this.exportCanvas.toDataURL('image/jpeg', 1);
  }

  public addAssets(assets: Asset[]) {
    this.assets = [...this.assets, ...assets];
    this.renderAssets(this.ctx);
    this.renderAssets(this.exportCtx);
  }
}
