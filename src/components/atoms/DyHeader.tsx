import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {Colors, Typography, Animations, Metrics} from '../../styles';

interface IProps {
  title?: string;
  count?: number;
  isLoading: boolean;
  notification: boolean;
}

const DyHeader: React.FC<IProps> = ({
  title = '',
  count = 7,
  isLoading,
  notification,
}) => {
  const displayCount = count <= 0 ? '' : `( ${count} )`;
  const refAnimation = useRef(null);

  useEffect(() => {
    if (!isLoading && notification) {
      refAnimation.current.play();
    }
  }, [isLoading, notification]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{displayCount}</Text>
      <View style={styles.notificationContainer}>
        {isLoading ? null : (
          <LottieView
            ref={refAnimation}
            source={Animations.notification}
            loop={false}
            style={{
              height: Metrics.icon.size,
              width: Metrics.icon.size,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Metrics.card.height,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Metrics.screenWidth,
  },
  notificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: Metrics.margin.s,
  },
  title: {
    ...Typography.headlineStyle,
    color: Colors.text,
    textAlign: 'center',
  },
});

export default DyHeader;
