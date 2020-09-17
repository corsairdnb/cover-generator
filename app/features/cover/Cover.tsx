import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCoverEditor } from './useCoverEditor';
import { usePreset } from './usePreset';
import { useDate } from './hooks/useDate';
import { useFontFamily } from './hooks/useFontFamily';
import { useTime } from './hooks/useTime';
import { useProgram } from './hooks/useProgram';
import { useArtist } from './hooks/useArtist';
import { useImage } from './hooks/useImage';
import { Label, LabelProps } from '../../editor/Label';
import styles from './Cover.module.scss';
import { dateSelector, programSelector, timeSelector } from './selectors';

// eslint-disable-next-line max-statements
export const Cover: FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const coverContainerRef = useRef<HTMLDivElement | null>(null);
  const { canvasRef, fileInputRef, editorRef } = useCoverEditor({ coverContainerRef });
  const preset = usePreset(editorRef, canvasRef);

  const onFieldChange = () => {
    const editor = editorRef.current;
    if (!editor) return;
    setImageDataUrl(editor.getDataUrl());
  };

  const stateDate = useSelector(dateSelector);
  const stateTime = useSelector(timeSelector);
  const stateProgram = useSelector(programSelector);

  const onUpdate = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const labelProps: LabelProps = {
      id: 'firstLine',
      text: `${stateDate}, ${stateTime}, ${stateProgram}`,
      textAfter: '',
      left: 100,
      top: 100,
      bottom: 0,
      right: 0,
      fontSize: 80,
      maxWidth: 0,
      color: '#fff'
    };
    editor.setLabels([new Label(labelProps, labelProps.id)]);
  }, [stateDate, stateTime, stateProgram]);

  const onDataUrlChange = (value: string) => setImageDataUrl(value);
  const onFileChange = (f: File) => setFile(f);
  const onImageChange = (img: HTMLImageElement) => setImage(img);

  const { onInput: onDateInput, value: date } = useDate(editorRef, onFieldChange, onUpdate);
  const { onInput: onFontFamilyInput, value: fontFamily } = useFontFamily(editorRef, onFieldChange);
  const { onInput: onTimeInput, value: time } = useTime(editorRef, onFieldChange, onUpdate);
  const { onInput: onProgramInput, value: program } = useProgram(
    editorRef,
    onFieldChange,
    onUpdate
  );
  const { onInput: onArtistInput, value: artist } = useArtist(editorRef, onFieldChange);
  const { onImageInput } = useImage(
    editorRef,
    onFieldChange,
    onDataUrlChange,
    onFileChange,
    onImageChange
  );

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    preset
      .then(({ assets, labels }) => {
        editor.addAssets(assets);
        editor.setLabels(labels);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

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
            Time:{' '}
            <input
              type="text"
              placeholder="19:00"
              defaultValue={time}
              onInput={({ currentTarget: { value } }) => onTimeInput(value)}
            />
          </p>
          <p>
            Program:{' '}
            <input
              type="text"
              placeholder="Xtra"
              defaultValue={program}
              onInput={({ currentTarget: { value } }) => onProgramInput(value)}
            />
          </p>
          <p>
            Artists:{' '}
            <textarea
              placeholder="Name..."
              defaultValue={artist}
              onInput={({ currentTarget: { value } }) => onArtistInput(value)}
            />
          </p>
        </div>
        <div className={styles.design}>
          {/*<p>*/}
          {/*  Logo:{' '}*/}
          {/*  <select>*/}
          {/*    <option>Logo 1</option>*/}
          {/*    <option>Logo 2</option>*/}
          {/*    <option>Logo 3</option>*/}
          {/*  </select>*/}
          {/*</p>*/}
          <p>
            Choose Image: <input type="file" id="file" ref={fileInputRef} onChange={onImageInput} />
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
