import React, { FC, SyntheticEvent, useCallback, useState } from 'react';
import styles from './Cover.module.css';
import { useCoverEditor } from './useCoverEditor';
import { handleInputChange } from './handleInputChange';

export const Cover: FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState((url = '') => {
    return url;
  });
  const [image, setImage] = useState<HTMLImageElement | undefined>((img?: HTMLImageElement) => img);
  const [file, setFile] = useState<File | undefined>((f?: File) => f);
  const { canvasRef, fileInputRef, editorRef } = useCoverEditor();

  const onChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) =>
      handleInputChange(event, editorRef.current, {
        onUpdateImageUrl: setImageDataUrl,
        onUpdateImage: setImage,
        onUpdateFile: setFile
      }),
    [editorRef.current]
  );

  return (
    <div className={styles.cover}>
      <p>
        Choose File: <input type="file" id="file" ref={fileInputRef} onChange={onChange} />
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
      <canvas id="canvas" ref={canvasRef} width={700} height={700} />
    </div>
  );
};
