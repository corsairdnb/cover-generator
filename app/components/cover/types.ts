import { Asset } from '../../editor/Asset';

export type EditorCallbacks = {
  onUpdateImageUrl: (dataUrl: string) => void;
  onUpdateImage: (image?: HTMLImageElement) => void;
  onUpdateFile: (file?: File) => void;
};

export type Preset = {
  assets: Asset[];
};
