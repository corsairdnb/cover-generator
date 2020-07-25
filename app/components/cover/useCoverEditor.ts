import { RefObject, useEffect, useRef } from 'react';
import { Editor } from '../../editor/Editor';

export type Refs = {
  canvasRef: RefObject<HTMLCanvasElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  editorRef: RefObject<Editor>;
};

export const useCoverEditor = (): Refs => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let context: CanvasRenderingContext2D | undefined | null = null;
    if (canvas) {
      context = canvas.getContext('2d');
    }
    if (!editorRef.current && context) {
      editorRef.current = new Editor(context);
    }
  }, [canvasRef.current]);

  return { canvasRef, fileInputRef, editorRef };
};
