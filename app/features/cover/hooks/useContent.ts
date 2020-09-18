import { useSelector } from 'react-redux';
import {
  artistSelector,
  colorSelector,
  dateSelector,
  fileNameSelector,
  firstLineSelector,
  fontFamilySelector,
  programSelector,
  timeSelector
} from '../selectors';

export const useContent = () => {
  const firstLine = useSelector(firstLineSelector);
  const fileName = useSelector(fileNameSelector);
  const date = useSelector(dateSelector);
  const time = useSelector(timeSelector);
  const program = useSelector(programSelector);
  const artist = useSelector(artistSelector);
  const fontFamily = useSelector(fontFamilySelector);
  const color = useSelector(colorSelector);

  return { firstLine, fileName, date, time, program, artist, fontFamily, color };
};
