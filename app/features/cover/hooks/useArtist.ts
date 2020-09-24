import { RefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setArtist } from '../slice';
import { Label, LabelProps } from '../../../editor/Label';
import { artistSelector, colorSelector } from '../selectors';
import { Editor } from '../../../editor/Editor';

const labelProps: LabelProps = {
  id: 'artist',
  text: '',
  textAfter: ', ',
  left: 130,
  top: 250,
  bottom: 0,
  right: 0,
  fontSize: 101,
  maxWidth: 0,
  color: '#fff'
};

export const useArtist = (editorRef: RefObject<Editor>, onFieldChange: () => void) => {
  const dispatch = useDispatch();
  const value = useSelector(artistSelector);
  const color = useSelector(colorSelector);

  const update = useCallback(
    (props) => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.setLabels([new Label({ ...props, color }, labelProps.id)]);
    },
    [editorRef.current, color]
  );

  useEffect(() => {
    if (!editorRef.current) return;
    update({ ...labelProps, text: value });
  }, [editorRef.current, color]);

  const onArtistInput = debounce(debounceTime, (text: string) => {
    dispatch(setArtist(text));
    update({ ...labelProps, text });
    onFieldChange();
  });

  return { onArtistInput };
};
