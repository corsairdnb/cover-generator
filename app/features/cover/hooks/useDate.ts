import { RefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setDate } from '../slice';
import { Label, LabelProps } from '../../../editor/Label';
import { CoverEditorHook } from '../types';
import { dateSelector } from '../selectors';
import { Editor } from '../../../editor/Editor';

const dateLabelProps: LabelProps = {
  text: '',
  left: 100,
  top: 100,
  bottom: 0,
  right: 0,
  fontSize: 80,
  maxWidth: 0
};

const dateId = 'date';

export const useDate = (
  editorRef: RefObject<Editor>,
  onFieldChange: () => void
): CoverEditorHook => {
  const dispatch = useDispatch();
  const value = useSelector(dateSelector);

  const update = useCallback((props) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.addLabels([new Label(props, dateId)]);
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    update({ ...dateLabelProps, text: value });
  }, [editorRef.current]);

  const onInput = debounce(debounceTime, (text: string) => {
    dispatch(setDate(text));
    update({ ...dateLabelProps, text });
    onFieldChange();
  });

  return { value, onInput };
};
