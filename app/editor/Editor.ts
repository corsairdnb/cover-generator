import {
  canvasHeight,
  canvasWidth,
  exportHeight,
  exportWidth,
  initialFontFamily
} from './constants';
import { Asset } from './Asset';
import { Label } from './Label';

export class Editor {
  private assets: Asset[] = [];
  private labels: Label[] = [];
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

  private renderLabels(ctx: CanvasRenderingContext2D, scale = 0.5) {
    this.labels.forEach((label) => {
      const { text, left, top, fontSize } = label.props;
      const size = fontSize * scale;
      const x = left * scale;
      const y = top * scale + size;
      ctx.font = `${size}px/0${this.fontFamily.padStart(this.fontFamily.length + 1)}`;
      ctx.fillStyle = 'red';
      ctx.fillText(text, x, y);
    });
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
      const width = Math.min(imageWidth * scale, maxWidth) * scale;
      const height = Math.round((width * imageHeight) / imageWidth);
      const left = x * scale;
      const top = ctx.canvas.height - height - bottom * scale;
      ctx.drawImage(asset.image, left, top, width, height);
    });
  }

  public render() {
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.renderBackground(this.ctx);
    this.renderLabels(this.ctx);
    this.renderAssets(this.ctx);
  }

  private renderExportContext() {
    this.exportCtx.clearRect(0, 0, exportWidth, exportHeight);
    this.renderBackground(this.exportCtx, exportWidth, exportHeight);
    this.renderLabels(this.exportCtx, 1);
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

  public addLabels(labels: Label[]) {
    this.labels = [...this.labels, ...labels];
    this.renderLabels(this.ctx);
    this.renderLabels(this.exportCtx);
  }
}
