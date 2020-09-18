import { useDispatch } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setTime } from '../slice';

//const labelProps: LabelProps = {
//  id: 'time',
//  text: '',
//  textAfter: ', ',
//  left: 100,
//  top: 200,
//  bottom: 0,
//  right: 0,
//  fontSize: 80,
//  maxWidth: 0,
//  color: '#fff'
//};

export const useTime = () => {
  const dispatch = useDispatch();

  //  const update = useCallback((props) => {
  //    const editor = editorRef.current;
  //    if (!editor) return;
  //    editor.addLabels([new Label(props, labelProps.id)]);
  //  }, []);

  const onTimeInput = debounce(debounceTime, (text: string) => {
    dispatch(setTime(text));
  });

  return { onTimeInput };
};
