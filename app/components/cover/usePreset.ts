import { RefObject, useEffect, useRef } from 'react';
import { ImageAsset } from '../../editor/ImageAsset';
import logo from '../../assets/logo.png';
import { Asset } from '../../editor/Asset';
import { Editor } from '../../editor/Editor';

type Preset = {
  assets?: Asset[];
};

export const usePreset = (
  editorRef: RefObject<Editor>,
  canvasRef: RefObject<HTMLCanvasElement>,
  url: string
): Preset | undefined => {
  const logoRef = useRef<string | null>(null);
  const assetsRef = useRef<Asset[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const editor = editorRef.current;
    if (!editor || !canvas) return;

    if (!logoRef.current) {
      logoRef.current = logo as string;
    }

    const ctx = editor.ctx;
    const image = new Image();
    image.src = logoRef.current;

    // TODO: useMemo

    const logoAsset = new ImageAsset(ctx, image);
    const y = canvas.getBoundingClientRect().height - image.height;
    const maxWidth = 100;
    const height = Math.round((maxWidth * image.height) / image.width);
    logoAsset.attributes = new DOMRect(100, y, maxWidth, height);

    assetsRef.current = [logoAsset];
  }, [url]);

  return { assets: assetsRef.current };
};
