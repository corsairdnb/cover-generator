import { RefObject, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setProgram } from '../slice';
import { LabelProps } from '../../../editor/Label';
import { CoverEditorHook } from '../types';
import { programSelector } from '../selectors';
import { Editor } from '../../../editor/Editor';

const labelProps: LabelProps = {
  id: 'program',
  text: '',
  textAfter: '',
  left: 100,
  top: 300,
  bottom: 0,
  right: 0,
  fontSize: 80,
  maxWidth: 0,
  color: '#fff'
};

export const useProgram = (
  editorRef: RefObject<Editor>,
  onFieldChange: () => void,
  onUpdate: (props: LabelProps) => void
): CoverEditorHook => {
  const dispatch = useDispatch();
  const value = useSelector(programSelector);

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
    dispatch(setProgram(text));
    onUpdate({ ...labelProps, text });
    onFieldChange();
  });

  return { value, onInput };
};
