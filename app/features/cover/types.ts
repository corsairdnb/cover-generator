import { ChangeEvent } from 'react';
import { Asset, AssetProps } from '../../editor/Asset';
import { Label, LabelProps } from '../../editor/Label';

export type EditorCallbacks = {
  onUpdateImageUrl: (dataUrl: string) => void;
  onUpdateImage: (image?: HTMLImageElement) => void;
  onUpdateFile: (file?: File) => void;
};

export type InitialPreset = {
  assets: AssetProps[];
  labels: LabelProps[];
};

export type Preset = {
  assets: Asset[];
  labels: Label[];
};

export type ContentState = {
  date: string;
  time: string;
  fontFamily: string;
  program: string;
  artist: string;
  image: string;
  fileName: string;
};

export type Program = {
  name: string;
  color: string;
};

export type CoverEditorImageHook = {
  onImageInput: (event: ChangeEvent<HTMLInputElement>) => void;
};
