import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
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
import { useContent } from './hooks/useContent';
import { programs } from './preset';

export const Cover: FC = () => {
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const coverContainerRef = useRef<HTMLDivElement | null>(null);
  const { canvasRef, fileInputRef, editorRef } = useCoverEditor({ coverContainerRef });
  const preset = usePreset(editorRef, canvasRef);
  const content = useContent();
  const { firstLine, fileName, date, time, program, artist, fontFamily, color } = content;

  const onUpdate = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const labelProps: LabelProps = {
      id: 'firstLine',
      text: firstLine,
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
    editor.logoColor = color;
    setImageDataUrl(editor.getDataUrl());
  }, [editorRef.current, firstLine, artist, fontFamily, color]);

  const onFieldChange = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    onUpdate();
  }, [editorRef.current, onUpdate]);

  useEffect(() => {
    if (!editorRef.current) return;
    onUpdate();
  }, [editorRef.current, onUpdate]);

  const onDataUrlChange = (value: string) => setImageDataUrl(value);
  const onImageChange = (img: HTMLImageElement) => setImage(img);

  const { onDateInput } = useDate();
  const { onTimeInput } = useTime();
  const { onProgramInput } = useProgram();
  const { onFontFamilyInput } = useFontFamily(editorRef, onFieldChange);
  const { onArtistInput } = useArtist(editorRef, onFieldChange);
  const { onImageInput } = useImage(editorRef, onDataUrlChange, onImageChange);

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
            <select
              defaultValue={program}
              onInput={({ currentTarget: { value } }) => onProgramInput(value)}
            >
              {Object.entries(programs).map(([key, value]) => (
                <option value={key} key={key}>
                  {value.name}
                </option>
              ))}
            </select>
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
            Choose Image: <input type="file" ref={fileInputRef} onChange={onImageInput} />
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
        {image && (
          <div className={styles.output}>
            <p>
              <a href={imageDataUrl} download={fileName}>
                Download image
              </a>
            </p>
          </div>
        )}
      </div>
      <div className={styles.right} ref={coverContainerRef}>
        <canvas id="canvas" className={styles.cover} ref={canvasRef} />
      </div>
    </div>
  );
};
