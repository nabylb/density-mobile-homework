import {FontType} from '../types';
import Colors from './colors';

const Typography: FontType = {
  headlineStyle: {
    fontSize: 30,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: -1.5,
    color: Colors.white,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.44,
    color: Colors.white,
  },
  bodyStyle: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.44,
    color: Colors.white,
  },
};

export default Typography;
