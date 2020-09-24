import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
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
import { Asset, AssetProps, VerticalAlignment } from '../../editor/Asset';

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
      left: 130,
      top: 140,
      bottom: 0,
      right: 0,
      fontSize: 76,
      maxWidth: 0,
      color: '#fff'
    };
    const logoProps: AssetProps = {
      left: 110,
      top: 0,
      bottom: 105,
      right: 0,
      maxWidth: 0,
      width: 190,
      maxHeight: 0,
      verticalAlignment: VerticalAlignment.CENTER
    };
    const logoImage = new Image();
    const programLogo = require(`../../assets/programs/${program}.png`) as { default: string };
    logoImage.src = programLogo.default;
    logoImage.onload = () => {
      editor.addAssets([new Asset(logoProps, logoImage, 'program')]);
    };
    editor.setLabels([new Label(labelProps, labelProps.id)]);
    editor.logoColor = color;
    setImageDataUrl(editor.getDataUrl());
  }, [editorRef.current, firstLine, artist, fontFamily, color, program]);

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
          <div className={styles.line}>
            <div className={styles.label}>Date:</div>
            <input
              type="text"
              placeholder="31/12"
              defaultValue={date}
              onInput={({ currentTarget: { value } }) => onDateInput(value)}
              className={styles.input}
            />
          </div>
          <div className={styles.line}>
            <div className={styles.label}>Time:</div>
            <input
              type="text"
              placeholder="19:00"
              defaultValue={time}
              onInput={({ currentTarget: { value } }) => onTimeInput(value)}
              className={styles.input}
            />
          </div>
          <div className={styles.line}>
            <div className={styles.label}>Program:</div>
            <select
              defaultValue={program}
              onInput={({ currentTarget: { value } }) => onProgramInput(value)}
              className={styles.input}
            >
              {Object.entries(programs).map(([key, value]) => (
                <option value={key} key={key}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.line}>
            <div className={styles.label}>Artists:</div>
            <textarea
              placeholder="Name..."
              defaultValue={artist}
              onInput={({ currentTarget: { value } }) => onArtistInput(value)}
              rows={5}
              className={classnames(styles.input, styles.textarea)}
            />
          </div>
        </div>
        <div className={styles.design}>
          <div className={styles.line}>
            <div className={styles.label}>Image:</div>{' '}
            <input type="file" ref={fileInputRef} onChange={onImageInput} />
          </div>

          {image && (
            <div className={styles.line}>
              <div className={styles.label}>Image size:</div> {image.width}x{image.height}
            </div>
          )}
          <div className={styles.line}>
            <div className={styles.label}>Font family:</div>
            <input
              type="text"
              placeholder="Arial"
              defaultValue={fontFamily}
              onInput={({ currentTarget: { value } }) => onFontFamilyInput(value)}
              className={styles.input}
            />
          </div>
        </div>
        {image && (
          <div className={styles.output}>
            <a href={imageDataUrl} download={fileName} className={styles.download}>
              Download image
            </a>
          </div>
        )}
      </div>
      <div className={styles.right} ref={coverContainerRef}>
        <canvas id="canvas" className={styles.cover} ref={canvasRef} />
      </div>
    </div>
  );
};
