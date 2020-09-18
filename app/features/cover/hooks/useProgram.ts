import { useDispatch } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { debounceTime } from '../constants';
import { setProgram } from '../slice';

//const labelProps: LabelProps = {
//  id: 'program',
//  text: '',
//  textAfter: '',
//  left: 100,
//  top: 300,
//  bottom: 0,
//  right: 0,
//  fontSize: 80,
//  maxWidth: 0,
//  color: '#fff'
//};

export const useProgram = () => {
  const dispatch = useDispatch();

  //  const update = useCallback((props) => {
  //    const editor = editorRef.current;
  //    if (!editor) return;
  //    editor.addLabels([new Label(props, labelProps.id)]);
  //  }, []);

  const onProgramInput = debounce(debounceTime, (text: string) => {
    dispatch(setProgram(text));
  });

  return { onProgramInput };
};
