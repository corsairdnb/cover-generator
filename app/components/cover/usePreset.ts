import { RefObject, useEffect, useRef } from 'react';
import { ImageAsset } from '../../editor/ImageAsset';
import logo from '../../assets/logo.png';
import { Editor } from '../../editor/Editor';
import { props } from './preset';
import { Preset } from './types';

export const usePreset = async (
  editorRef: RefObject<Editor>,
  canvasRef: RefObject<HTMLCanvasElement>
): Promise<Preset> => {
  const logoRef = useRef<string | null>(null);

  let resolveImage: (preset: Preset) => void;
  const load: Promise<Preset> = new Promise((resolve) => {
    resolveImage = resolve;
  });

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
    image.onload = () => {
      const { maxWidth, bottom } = props;
      const logoAsset = new ImageAsset(ctx, props, image);
      const height = Math.round((maxWidth * image.height) / image.width);
      const y = canvas.getBoundingClientRect().height - height - bottom;
      logoAsset.attributes = new DOMRect(100, y, maxWidth, height);
      // TODO: may be some array of assets
      resolveImage({ assets: [logoAsset] });
    };
  }, []);

  return await load;
};
