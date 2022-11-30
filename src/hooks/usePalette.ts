import { useSelector } from 'react-redux';

import { settingsState } from '../redux/store';
import palette from '../styles/palette';

const usePalette = () => {
  const { theme } = useSelector(settingsState);

  return { palette: palette[theme], theme };
};

export default usePalette;
