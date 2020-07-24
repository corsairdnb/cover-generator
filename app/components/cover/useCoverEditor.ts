import { RefObject, useEffect, useRef } from 'react';
import { Editor } from '../../editor/Editor';

export type EditorContext = {
  canvasRef: RefObject<HTMLCanvasElement>;
  fileRef: RefObject<HTMLInputElement>;
  context: CanvasRenderingContext2D | undefined | null;
};

export type EditorProps = {
  onUpdateImage: (dataUrl: string) => void;
  onUpdateImageName: (name: string) => void;
};

export const useCoverEditor = ({
  onUpdateImage,
  onUpdateImageName
}: EditorProps): EditorContext => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editorRef = useRef<Editor>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  let context: EditorContext['context'] = null;
  let editor = editorRef.current;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      context = canvas.getContext('2d');
    }
    if (!editor && context) {
      editor = new Editor(context);
    }
  }, []);

  useEffect(() => {
    const fileInput = fileRef.current;
    if (fileInput && editor) {
      fileInput.onchange = () => {
        if (fileInput.files?.length) {
          const file = fileInput.files[0];
          if (file.type.match('image.*')) {
            const reader = new FileReader();
            //    reader.onload = createImage; // onload fires after reading is complete
            reader.readAsDataURL(file);
            const image = new Image();
            reader.onload = (event) => {
              if (event.target?.readyState === FileReader.DONE) {
                image.src = <string>event.target?.result?.toString();
                image.onload = () => {
                  editor.image = image;
                  editor.init();
                  const width = image.width;
                  const imageName = file.name;
                  console.log(width); // TODO: use sizes for manual adjusting
                  onUpdateImage(editor?.getDataUrl() || '');
                  onUpdateImageName(imageName);
                };
              }
            };
          }
        }
      };
    }
  });

  return { canvasRef, fileRef, context };
};
