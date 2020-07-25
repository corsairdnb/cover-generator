import { RefObject, useEffect, useRef } from 'react';
import { Editor } from '../../editor/Editor';

export type EditorContext = {
  canvasRef: RefObject<HTMLCanvasElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  editorRef: RefObject<Editor>;
  context: CanvasRenderingContext2D | undefined | null;
};

export const useCoverEditor = (): EditorContext => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  let context: EditorContext['context'] = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      context = canvas.getContext('2d');
    }
    if (!editorRef.current && context) {
      editorRef.current = new Editor(context);
    }
  }, [canvasRef.current]);

  return { canvasRef, fileInputRef, editorRef, context };
};
