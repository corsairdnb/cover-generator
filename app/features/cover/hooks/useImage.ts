import { ChangeEvent, RefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImage } from '../slice';
import { CoverEditorImageHook } from '../types';
import { imageSelector } from '../selectors';
import { Editor } from '../../../editor/Editor';

export const useImage = (
  editorRef: RefObject<Editor>,
  onFieldChange: () => void,
  onDataUrlChange: (value: string) => void,
  onFileChange: (file: File) => void,
  onImageChange: (img: HTMLImageElement) => void
): CoverEditorImageHook => {
  const dispatch = useDispatch();
  const value = useSelector(imageSelector);

  const update = useCallback(() => {
    if (!editorRef.current) return;
    onDataUrlChange(editorRef.current.getDataUrl() || '');
    const img = new Image();
    img.src = value;
    editorRef.current.image = img;
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    update();
  }, [editorRef.current]);

  let file!: File;

  const onImageInput = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const fileInput = changeEvent.currentTarget;

    if (!editorRef.current || !fileInput.files?.length) {
      return;
    }

    file = fileInput.files[0];

    if (!/image.*/.exec(file.type)) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    const currentImage = new Image();
    reader.onload = (e) => {
      if (e.target?.readyState === FileReader.DONE) {
        const src = <string>e.target?.result?.toString();
        currentImage.src = src;
        currentImage.onload = () => {
          const dataUrl = src;
          if (editorRef.current) {
            editorRef.current.image = currentImage;
          }
          onDataUrlChange(dataUrl);
          dispatch(setImage(dataUrl));
          update();
          onFileChange(file);
          onFieldChange();
          onImageChange(currentImage);
        };
      }
    };
  };

  return { onImageInput };
};
