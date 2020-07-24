import React, { FC, useState } from 'react';
import styles from './Cover.module.css';
import { useCoverEditor } from './useCoverEditor';

export const Cover: FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState((url = '') => {
    return url;
  });
  const [imageName, setImageName] = useState((name = '') => {
    return name;
  });
  const { canvasRef, fileRef } = useCoverEditor({
    onUpdateImage: setImageDataUrl,
    onUpdateImageName: setImageName
  });

  return (
    <div className={styles.cover}>
      <p>
        File: <input type="file" id="file" ref={fileRef} />
      </p>
      <br />
      <p>
        <a href={imageDataUrl} download={imageName}>
          Download image
        </a>
      </p>
      <canvas id="canvas" ref={canvasRef} width={700} height={700} />
    </div>
  );
};
