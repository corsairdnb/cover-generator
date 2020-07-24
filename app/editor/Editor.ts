export class Editor {
  private imageElement: HTMLImageElement | undefined;
  get image(): HTMLImageElement | undefined {
    return this.imageElement;
  }

  set image(value: HTMLImageElement | undefined) {
    this.imageElement = value;
  }

  constructor(private context: CanvasRenderingContext2D) {
    console.log(this.context);
  }

  public init() {
    this.context.fillStyle = 'green';
    this.context.fillRect(10, 10, 100, 100);
    this.image && this.context.drawImage(this.image, 0, 0, 700, 700);
  }

  public getDataUrl() {
    return this.context.canvas.toDataURL('image/jpeg');
  }
}
