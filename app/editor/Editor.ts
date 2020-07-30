import { initialFontFamily } from './constants';

export class Editor {
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

  constructor(private ctx: CanvasRenderingContext2D) {
    // eslint-disable-next-line no-console
    console.log(this.ctx);
    //    this.ctx.fillStyle = 'green';
    //    this.ctx.fillRect(10, 10, 100, 100);
  }

  private renderFonts() {
    this.ctx.font = `20px/0${this.fontFamily.padStart(this.fontFamily.length + 1)}`;
    this.ctx.fillText('Test content', 100, 50);
  }

  private renderBackground() {
    this.image && this.ctx.drawImage(this.image, 0, 0, 700, 700);
  }

  public render() {
    this.renderBackground();
    this.renderFonts();
  }

  public getDataUrl() {
    return this.ctx.canvas.toDataURL('image/jpeg', 1);
  }
}
