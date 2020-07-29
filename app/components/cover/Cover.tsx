import React, { FC, SyntheticEvent, useCallback, useRef, useState } from 'react';
import styles from './Cover.module.css';
import { useCoverEditor } from './useCoverEditor';
import { handleInputChange } from './handleInputChange';

export const Cover: FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const coverContainerRef = useRef<HTMLDivElement | null>(null);
  const { canvasRef, fileInputRef, editorRef } = useCoverEditor({ coverContainerRef });

  const onImageChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) =>
      handleInputChange(event, editorRef.current, {
        onUpdateImageUrl: setImageDataUrl,
        onUpdateImage: setImage,
        onUpdateFile: setFile
      }),
    [editorRef.current]
  );

  const onFontFamilyInput = useCallback((event: SyntheticEvent<HTMLInputElement>) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.font = event.currentTarget.value;
    setImageDataUrl(editor.getDataUrl());
  }, []);

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
          Font family: <input type="text" placeholder="Arial" onInput={onFontFamilyInput} />
        </p>
      </div>
      <div className={styles.right} ref={coverContainerRef}>
        <canvas id="canvas" className={styles.cover} ref={canvasRef} />
      </div>
    </div>
  );
};
