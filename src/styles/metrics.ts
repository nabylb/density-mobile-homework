import {Dimensions} from 'react-native';

const Metrics = {
  screenHeight: Dimensions.get('screen').height,
  screenWidth: Dimensions.get('screen').width,
  alert: {
    height: 40,
    padding: 10,
  },
  alertAnimation: {
    showDuration: 300,
    hideDuration: 400,
  },
  icon: {
    size: 20,
  },
  card: {
    height: 100,
  },
};

export default Metrics;
