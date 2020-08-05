import { Asset } from './Asset';
import { AssetProps } from './types';

export enum AssetOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export class ImageAsset extends Asset {
  get attributes(): DOMRect {
    return this.attrs;
  }

  set attributes(value: DOMRect) {
    this.attrs = value;
    //    this.render();
  }

  public assetOrientation: AssetOrientation = AssetOrientation.HORIZONTAL;
  public aspectRatio: number;

  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly props: AssetProps,
    readonly image: HTMLImageElement
  ) {
    super(ctx, props);
    this.image = image;
    this.aspectRatio = Number((image.width / image.height).toFixed(2));
    this.assetOrientation =
      this.aspectRatio > 0 ? AssetOrientation.HORIZONTAL : AssetOrientation.VERTICAL;
  }

  private attrs!: DOMRect;
  render() {
    //    this.ctx.strokeRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
    this.ctx.drawImage(this.image, this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  }
}
