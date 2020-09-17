import {
  canvasHeight,
  canvasWidth,
  exportHeight,
  exportWidth,
  initialFontFamily
} from './constants';
import { Asset } from './Asset';
import { Label } from './Label';
import { ContextConfig, EditorLabels } from './types';

export class Editor {
  private assets: Asset[] = [];
  private labels: EditorLabels = {};
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
  private contexts: ContextConfig[] = [];

  constructor(readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.exportCtx = this.exportCanvas.getContext('2d')!;
    this.initExportContext();

    this.contexts = [
      {
        ctx: this.ctx,
        scale: 0.5
      },
      {
        ctx: this.exportCtx,
        scale: 1
      }
    ];
  }

  private initExportContext() {
    this.exportCanvas.width = exportWidth;
    this.exportCanvas.height = exportHeight;
  }

  private renderLabels() {
    this.contexts.forEach(({ ctx, scale }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(this.labels).forEach(([_id, label]) => {
        const { text, left, top, fontSize, color } = label.props;
        const line = text.toUpperCase();
        const size = fontSize * scale;
        const x = left * scale;
        const y = top * scale + size;
        const lines = line.split('\n');
        ctx.font = `${size}px/1em${this.fontFamily.padStart(this.fontFamily.length + 1)}`;
        ctx.fillStyle = color;
        if (lines.length === 1) {
          ctx.fillText(line, x, y);
        } else {
          let offset = 0;
          for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], x, y + offset);
            offset += size;
          }
        }
      });
    });
  }

  private renderBackground(
    ctx: CanvasRenderingContext2D,
    width = canvasWidth,
    height = canvasHeight
  ) {
    this.image && ctx.drawImage(this.image, 0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
  }

  private renderAssets() {
    this.contexts.forEach(({ ctx, scale }) => {
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
    });
  }

  public render() {
    this.renderPreviewContext();
    this.renderExportContext();
    this.renderLabels();
    this.renderAssets();
  }

  private renderPreviewContext() {
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.renderBackground(this.ctx);
  }

  private renderExportContext() {
    this.exportCtx.clearRect(0, 0, exportWidth, exportHeight);
    this.renderBackground(this.exportCtx, exportWidth, exportHeight);
  }

  public getDataUrl() {
    this.render();
    return this.exportCanvas.toDataURL('image/jpeg', 1);
  }

  public addAssets(assets: Asset[]) {
    this.assets = [...this.assets, ...assets];
    this.render();
  }

  public setLabels(labels: Label[]) {
    labels.forEach((label) => {
      if (!this.labels[label.id]) {
        this.labels[label.id] = label;
      } else {
        const oldLabel = this.labels[label.id];
        this.labels[label.id] = { ...oldLabel, ...label };
      }
    });
    this.render();
  }
}
