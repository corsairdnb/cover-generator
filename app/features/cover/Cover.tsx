import React, { FC, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { useCoverEditor } from './useCoverEditor';
import { handleInputChange } from './handleInputChange';
import { debounceTime } from './constants';
import styles from './Cover.module.scss';
import { usePreset } from './usePreset';
import { setDate, setFontFamily } from './slice';
import { dateSelector, fontFamilySelector } from './selectors';
import { Label, dateLabelProps, dateId } from '../../editor/Label';

export const Cover: FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const coverContainerRef = useRef<HTMLDivElement | null>(null);
  const { canvasRef, fileInputRef, editorRef } = useCoverEditor({ coverContainerRef });
  const preset = usePreset(editorRef, canvasRef);
  const dispatch = useDispatch();

  const date = useSelector(dateSelector);
  const updateDate = useCallback((props) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.addLabels([new Label(props, dateId)]);
    // TODO: make it reactive, don't update manually
    setImageDataUrl(editor.getDataUrl());
  }, []);

  const fontFamily = useSelector(fontFamilySelector);
  const updateFontFamily = useCallback(
    (value: string) => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.font = value;
      // TODO: make it reactive, don't update manually
      setImageDataUrl(editor.getDataUrl());
    },
    [editorRef.current]
  );

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    preset
      .then(({ assets, labels }) => {
        editor.addAssets(assets);
        editor.addLabels(labels);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    updateDate({ ...dateLabelProps, text: date });
    updateFontFamily(fontFamily);
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

  const onFontFamilyInput = debounce(debounceTime, (value: string) => {
    dispatch(setFontFamily(value));
    updateFontFamily(value);
  });

  const onDateInput = debounce(debounceTime, (text: string) => {
    dispatch(setDate(text));
    updateDate({ ...dateLabelProps, text });
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.content}>
          <p>
            Date:{' '}
            <input
              type="text"
              placeholder="31/12"
              defaultValue={date}
              onInput={({ currentTarget: { value } }) => onDateInput(value)}
            />
          </p>
          <p>
            Time: <input type="text" placeholder="19:00" />
          </p>
          <p>
            Program: <input type="text" placeholder="Xtra" />
          </p>
          <p>
            Artists: <textarea placeholder="Name..." />
          </p>
        </div>
        <div className={styles.design}>
          <p>
            Logo:{' '}
            <select>
              <option>Logo 1</option>
              <option>Logo 2</option>
              <option>Logo 3</option>
            </select>
          </p>
          <p>
            Choose File: <input type="file" id="file" ref={fileInputRef} onChange={onImageChange} />
          </p>

          {image && (
            <p>
              Image dimensions: {image.width}x{image.height}
            </p>
          )}
          <p>
            Font family:{' '}
            <input
              type="text"
              placeholder="Arial"
              defaultValue={fontFamily}
              onInput={({ currentTarget: { value } }) => onFontFamilyInput(value)}
            />
          </p>
        </div>
        {file && (
          <div className={styles.output}>
            {file && (
              <p>
                <a href={imageDataUrl} download={file.name}>
                  Download image
                </a>
              </p>
            )}
          </div>
        )}
      </div>
      <div className={styles.right} ref={coverContainerRef}>
        <canvas id="canvas" className={styles.cover} ref={canvasRef} />
      </div>
    </div>
  );
};
