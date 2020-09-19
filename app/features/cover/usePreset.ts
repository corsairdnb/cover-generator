import { RefObject, useEffect, useRef } from 'react';
import { Asset } from '../../editor/Asset';
import logo from '../../assets/logo.png';
import { Editor } from '../../editor/Editor';
import { Label } from '../../editor/Label';
import { initialPreset } from './preset';
import { Preset } from './types';

export const usePreset = async (
  editorRef: RefObject<Editor>,
  canvasRef: RefObject<HTMLCanvasElement>
): Promise<Preset> => {
  const logoRef = useRef<string | null>(null);

  let resolvePreset: (preset: Preset) => void;
  const load: Promise<Preset> = new Promise((resolve) => {
    resolvePreset = resolve;
  });

  const assets: Asset[] = [];
  const labels: Label[] = [];

  useEffect(() => {
    if (!editorRef.current || !canvasRef.current) return;

    if (!logoRef.current) {
      logoRef.current = logo as string;
    }

    //    const label = new Label(initialPreset.labels[0], '');
    //    labels.push(label);

    const logoImage = new Image();
    logoImage.src = logoRef.current;
    logoImage.onload = () => {
      const logoAsset = new Asset(initialPreset.assets[0], logoImage, 'logo');
      assets.push(logoAsset);
      resolvePreset({ assets, labels });
    };
  }, []);

  return await load;
};
