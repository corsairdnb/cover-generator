import { ChangeEvent, RefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImage, setFileName } from '../slice';
import { CoverEditorImageHook } from '../types';
import { imageSelector } from '../selectors';
import { Editor } from '../../../editor/Editor';

export const useImage = (
  editorRef: RefObject<Editor>,
  onDataUrlChange: (value: string) => void,
  onImageChange: (img: HTMLImageElement) => void
): CoverEditorImageHook => {
  const dispatch = useDispatch();
  const value = useSelector(imageSelector);

  const update = useCallback((dataUrl?: string, image?: HTMLImageElement) => {
    if (!editorRef.current) return;
    onDataUrlChange(dataUrl || editorRef.current.getDataUrl() || '');
    if (!image) {
      const cachedImage = new Image();
      cachedImage.src = value;
      editorRef.current.image = cachedImage;
      onImageChange(cachedImage);
    } else {
      editorRef.current.image = image;
      onImageChange(image);
    }
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
          dispatch(setImage(dataUrl));
          dispatch(setFileName(file.name));
          update(dataUrl, currentImage);
        };
      }
    };
  };

  return { onImageInput };
};
