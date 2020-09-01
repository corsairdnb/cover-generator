import { RefObject, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setDate } from '../slice';
import { LabelProps } from '../../../editor/Label';
import { CoverEditorHook } from '../types';
import { dateSelector } from '../selectors';
import { Editor } from '../../../editor/Editor';

const labelProps: LabelProps = {
  id: 'date',
  text: '',
  textAfter: ', ',
  left: 100,
  top: 100,
  bottom: 0,
  right: 0,
  fontSize: 80,
  maxWidth: 0,
  color: '#fff'
};

export const useDate = (
  editorRef: RefObject<Editor>,
  onFieldChange: () => void,
  onUpdate: (props: LabelProps) => void
): CoverEditorHook => {
  const dispatch = useDispatch();
  const value = useSelector(dateSelector);

  //  const update = useCallback((props) => {
  //    const editor = editorRef.current;
  //    if (!editor) return;
  //    editor.addLabels([new Label(props, labelProps.id)]);
  //  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    onUpdate({ ...labelProps, text: value });
  }, [editorRef.current]);

  const onInput = debounce(debounceTime, (text: string) => {
    dispatch(setDate(text));
    onUpdate({ ...labelProps, text });
    onFieldChange();
  });

  return { value, onInput };
};
