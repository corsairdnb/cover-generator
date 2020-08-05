import React, { FC, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'throttle-debounce';
import { useCoverEditor } from './useCoverEditor';
import { handleInputChange } from './handleInputChange';
import { debounceTime } from './constants';
import styles from './Cover.module.css';
import { usePreset } from './usePreset';

export const Cover: FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const coverContainerRef = useRef<HTMLDivElement | null>(null);
  const { canvasRef, fileInputRef, editorRef } = useCoverEditor({ coverContainerRef });
  const preset = usePreset(editorRef, canvasRef);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    preset
      .then(({ assets }) => {
        editor.addAssets(assets);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const onImageChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) =>
      handleInputChange(event, editorRef.current, {
        onUpdateImageUrl: setImageDataUrl,
        onUpdateImage: setImage,
        onUpdateFile: setFile
      }),
    [editorRef.current]
  );

  const setNewDataUrl = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    setImageDataUrl(editor.getDataUrl());
  }, [editorRef.current]);

  const fontInputCallback = useCallback(
    (value: string) => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.font = value;
      setNewDataUrl();
    },
    [editorRef.current]
  );

  const onFontFamilyInput = debounce(debounceTime, (value: string) => {
    fontInputCallback(value);
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <p>
          Choose File: <input type="file" id="file" ref={fileInputRef} onChange={onImageChange} />
        </p>
        {image && (
          <p>
            Image dimensions: {image.width}x{image.height}
          </p>
        )}
        {file && (
          <p>
            <a href={imageDataUrl} download={file.name}>
              Download image
            </a>
          </p>
        )}
        <p>
          Font family:{' '}
          <input
            type="text"
            placeholder="Arial"
            onInput={({ currentTarget: { value } }) => onFontFamilyInput(value)}
          />
        </p>
      </div>
      <div className={styles.right} ref={coverContainerRef}>
        <canvas id="canvas" className={styles.cover} ref={canvasRef} />
      </div>
    </div>
  );
};
