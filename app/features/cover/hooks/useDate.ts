import { useDispatch } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setDate } from '../slice';

//const labelProps: LabelProps = {
//  id: 'date',
//  text: '',
//  textAfter: ', ',
//  left: 100,
//  top: 100,
//  bottom: 0,
//  right: 0,
//  fontSize: 80,
//  maxWidth: 0,
//  color: '#fff'
//};

export const useDate = () => {
  const dispatch = useDispatch();

  //  const update = useCallback((props) => {
  //    const editor = editorRef.current;
  //    if (!editor) return;
  //    editor.addLabels([new Label(props, labelProps.id)]);
  //  }, []);

  const onDateInput = debounce(debounceTime, (text: string) => {
    dispatch(setDate(text));
  });

  return { onDateInput };
};
