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
  constructor(readonly props: LabelProps, readonly id: string) {
    // eslint-disable-next-line no-console
    console.log(props);
  }

  //  render() {
  //    //    this.ctx.strokeRect(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  //    this.ctx.drawImage(this.image, this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  //  }
}

export const dateLabelProps: LabelProps = {
  text: '',
  left: 100,
  top: 100,
  bottom: 0,
  right: 0,
  fontSize: 80,
  maxWidth: 0
};

export const dateId = 'date';
