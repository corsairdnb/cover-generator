import { RefObject, useEffect, useRef } from 'react';
import { throttle } from 'throttle-debounce';
import { Editor } from '../../editor/Editor';
import { debounceTime } from './constants';
import { canvasWidth } from '../../editor/constants';

export type Refs = {
  canvasRef: RefObject<HTMLCanvasElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  editorRef: RefObject<Editor>;
};

type Params = {
  coverContainerRef: RefObject<HTMLElement | null>;
};

export const useCoverEditor = ({ coverContainerRef }: Params): Refs => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!editorRef.current && canvas) {
      editorRef.current = new Editor(canvas);
    }
  }, [canvasRef.current]);

  useEffect(() => {
    const resizeListener = () => {
      const canvas = canvasRef.current;
      const container = coverContainerRef.current;
      if (canvas && container) {
        const containerRect = container.getBoundingClientRect();
        const width = Math.min(containerRect.width || 0, canvasWidth).toString();
        // const height = container?.height.toString();
        width && canvas.setAttribute('width', width);
        width && canvas.setAttribute('height', width);
        editorRef.current?.render();
      }
    };
    resizeListener();
    window.addEventListener('resize', throttle(debounceTime, resizeListener));
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [canvasRef.current]);

  return { canvasRef, fileInputRef, editorRef };
};
