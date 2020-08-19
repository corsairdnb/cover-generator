export type LabelProps = {
  text: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  maxWidth: number;
  fontSize: number;
};

export class Label {
  constructor(readonly props: LabelProps) {
    // eslint-disable-next-line no-console
    console.log(props);
  }

  //  render() {
  //    //    this.ctx.strokeRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  //    this.ctx.drawImage(this.image, this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  //  }
}
