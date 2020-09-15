import {useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {Colors} from '../styles';

const useAnimate = (count: number) => {
  const [lastCount, setLastCount] = useState<number | null>(null);
  const colorAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;

  if (lastCount !== count) {
    if (lastCount) {
      Animated.sequence([
        Animated.timing(colorAnimation, {
          toValue: 1,
          easing: Easing.sin,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnimation, {
          toValue: 0,
          easing: Easing.ease,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    }
    setLastCount(count);
  }

  const bgColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.primary, Colors.accent],
  });

  return {bgColor};
};

export default useAnimate;
