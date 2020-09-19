import {
  canvasHeight,
  canvasWidth,
  exportHeight,
  exportWidth,
  initialFontFamily
} from './constants';
import { Asset } from './Asset';
import { Label } from './Label';
import { ContextConfig, EditorAssets, EditorLabels } from './types';

export class Editor {
  private assets: EditorAssets = {};
  private labels: EditorLabels = {};
  private imageElement: HTMLImageElement | undefined;
  private logoImage: HTMLImageElement | undefined;
  private logoColorCode = '#fff';

  set logoColor(value: string) {
    this.logoColorCode = value;
    this.render();
  }

  set logo(value: HTMLImageElement) {
    this.logoImage = value;
    this.render();
  }

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
  private logoCanvas = document.createElement('canvas');
  private exportCtx: CanvasRenderingContext2D;
  private logoCtx: CanvasRenderingContext2D;
  public readonly ctx: CanvasRenderingContext2D;
  private contexts: ContextConfig[] = [];

  constructor(readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.exportCtx = this.exportCanvas.getContext('2d')!;
    this.logoCtx = this.logoCanvas.getContext('2d')!;
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

  private static hexToRGB(h: string): [number, number, number] {
    let r;
    let g;
    let b;

    if (h.length === 4) {
      r = `0x${h[1]}${h[1]}`;
      g = `0x${h[2]}${h[2]}`;
      b = `0x${h[3]}${h[3]}`;
    } else if (h.length === 7) {
      r = `0x${h[1]}${h[2]}`;
      g = `0x${h[3]}${h[4]}`;
      b = `0x${h[5]}${h[6]}`;
    }

    return [Number(r), Number(g), Number(b)];
  }

  private renderAssets() {
    this.contexts.forEach(({ ctx, scale }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(this.assets).forEach(([_id, asset]) => {
        const { maxWidth, bottom, left: x, width: targetWidth, maxHeight } = asset.props;
        const imageWidth = asset.image.width;
        const imageHeight = asset.image.height;
        const width = maxWidth
          ? Math.min(imageWidth * scale, maxWidth) * scale
          : targetWidth * scale;
        const height = Math.min(Math.round((width * imageHeight) / imageWidth), maxHeight);
        const left = x * scale;
        const top = ctx.canvas.height - height - bottom * scale;

        this.logoCtx.clearRect(0, 0, this.logoCanvas.width, this.logoCanvas.height);
        this.logoCtx.drawImage(asset.image, 0, 0, width, height);
        const imageData = this.logoCtx.getImageData(
          0,
          0,
          this.logoCanvas.width,
          this.logoCanvas.height
        );
        const data = imageData.data;
        const [r, g, b] = Editor.hexToRGB(this.logoColorCode);
        for (let i = 0; i < data.length; i += 4) {
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
        }
        this.logoCtx.putImageData(imageData, 0, 0);

        ctx.drawImage(this.logoCanvas, left, top, this.logoCanvas.width, this.logoCanvas.height);
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
    assets.forEach((asset) => {
      if (!this.assets[asset.id]) {
        this.assets[asset.id] = asset;
      } else {
        const oldAsset = this.assets[asset.id];
        this.assets[asset.id] = { ...oldAsset, ...asset };
      }
    });
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
