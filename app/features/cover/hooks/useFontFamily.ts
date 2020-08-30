import { RefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setFontFamily } from '../slice';
import { CoverEditorHook } from '../types';
import { fontFamilySelector } from '../selectors';
import { Editor } from '../../../editor/Editor';

export const useFontFamily = (
  editorRef: RefObject<Editor>,
  onFieldChange: () => void
): CoverEditorHook => {
  const dispatch = useDispatch();
  const value = useSelector(fontFamilySelector);

  const update = useCallback(
    (font: string) => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.font = font;
      onFieldChange();
    },
    [editorRef.current]
  );

  useEffect(() => {
    if (!editorRef.current) return;
    update(value);
  }, [editorRef.current]);

  const onInput = debounce(debounceTime, (fontFamily: string) => {
    dispatch(setFontFamily(fontFamily));
    update(fontFamily);
  });

  return { value, onInput };
};
