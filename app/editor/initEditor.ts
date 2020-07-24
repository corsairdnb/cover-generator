import { Editor } from './Editor';

export const initEditor = (context: CanvasRenderingContext2D, imageInput: HTMLInputElement) => {
  const editor = new Editor(context);

  if (imageInput.files) {
    const file = imageInput.files[0];
    const fr = new FileReader();
    //    fr.onload = createImage; // onload fires after reading is complete
    fr.readAsDataURL(file); // begin reading
    const img = new Image();
    //    img.onload = imageLoaded;
    editor.init();
  }
};
