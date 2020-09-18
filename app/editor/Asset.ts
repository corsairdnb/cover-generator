export enum AssetOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export type AssetProps = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  maxWidth: number;
  id: string;
};

export class Asset {
  public assetOrientation: AssetOrientation = AssetOrientation.HORIZONTAL;
  public aspectRatio: number;

  constructor(readonly props: AssetProps, readonly image: HTMLImageElement) {
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
