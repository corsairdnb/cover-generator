import { RefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setArtist } from '../slice';
import { Label, LabelProps } from '../../../editor/Label';
import { CoverEditorHook } from '../types';
import { artistSelector } from '../selectors';
import { Editor } from '../../../editor/Editor';

const labelProps: LabelProps = {
  id: 'artist',
  text: '',
  textAfter: ', ',
  left: 100,
  top: 200,
  bottom: 0,
  right: 0,
  fontSize: 80,
  maxWidth: 0,
  color: '#ff0000'
};

export const useArtist = (
  editorRef: RefObject<Editor>,
  onFieldChange: () => void
): CoverEditorHook => {
  const dispatch = useDispatch();
  const value = useSelector(artistSelector);

  const update = useCallback((props) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.addLabels([new Label(props, labelProps.id)]);
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    update({ ...labelProps, text: value });
  }, [editorRef.current]);

  const onInput = debounce(debounceTime, (text: string) => {
    dispatch(setArtist(text));
    update({ ...labelProps, text });
    onFieldChange();
  });

  return { value, onInput };
};
