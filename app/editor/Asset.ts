export enum AssetOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export enum VerticalAlignment {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom'
}

export type AssetProps = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  maxWidth: number;
  width: number;
  maxHeight: number;
  verticalAlignment: VerticalAlignment;
};

export class Asset {
  public assetOrientation: AssetOrientation = AssetOrientation.HORIZONTAL;
  public aspectRatio: number;

  constructor(readonly props: AssetProps, readonly image: HTMLImageElement, readonly id: string) {
    this.image = image;
    this.aspectRatio = Number((image.width / image.height).toFixed(2));
    this.assetOrientation =
      this.aspectRatio > 0 ? AssetOrientation.HORIZONTAL : AssetOrientation.VERTICAL;
  }

  //  render() {
  //    //    this.ctx.strokeRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  //    this.ctx.drawImage(this.image, this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  //  }
}
