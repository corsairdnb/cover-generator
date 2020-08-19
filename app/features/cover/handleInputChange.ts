import { SyntheticEvent } from 'react';
import { Editor } from '../../editor/Editor';
import { EditorCallbacks } from './types';

export const handleInputChange = (
  changeEvent: SyntheticEvent<HTMLInputElement>,
  editor: Editor | null,
  callbacks: EditorCallbacks
) => {
  const { onUpdateImageUrl, onUpdateImage, onUpdateFile } = callbacks;
  const fileInput = changeEvent.currentTarget;

  if (!editor || !fileInput.files?.length) {
    return;
  }

  const currentFile = fileInput.files[0];

  if (!/image.*/.exec(currentFile.type)) {
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(currentFile);
  const currentImage = new Image();
  reader.onload = (event) => {
    if (event.target?.readyState === FileReader.DONE) {
      currentImage.src = <string>event.target?.result?.toString();
      currentImage.onload = () => {
        editor.image = currentImage;
        onUpdateImageUrl(editor.getDataUrl() || '');
        onUpdateImage(currentImage);
        onUpdateFile(currentFile);
      };
    }
  };
};
