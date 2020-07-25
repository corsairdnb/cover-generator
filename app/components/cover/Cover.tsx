import React, { FC, SyntheticEvent, useCallback, useState } from 'react';
import styles from './Cover.module.css';
import { useCoverEditor } from './useCoverEditor';
import { handleInputChange } from './handleInputChange';

export const Cover: FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const [file, setFile] = useState<File | undefined>((f?: File) => f);
  const { canvasRef, fileInputRef, editorRef } = useCoverEditor();

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
    if (!editorRef.current) return;
    editorRef.current.font = event.currentTarget.value;
  }, []);

  return (
    <div className={styles.cover}>
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
      <canvas id="canvas" ref={canvasRef} width={700} height={700} />
    </div>
  );
};
