import React, {
  useRef,
  useState,
  useContext,
  useMemo,
  createContext,
} from 'react';
import {
  Text,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {Colors, Typography, Metrics} from '../styles';
import {useNetwork} from '../hooks';
import {DyIconType, Alerts} from '../types';
import DyIcon from '../components/atoms/DyIcon';

const NETWORK_ALERT = 'You have lost your mobile network.';

const AlertsContext = createContext(() => []);

const useAlerts = () => {
  const context = useContext(AlertsContext);

  if (!context) {
    throw new Error('useAlerts must be used within a AlertsProvider');
  }
  return context;
};

const AlertsProvider = ({children}: {children: JSX.Element}) => {
  const [alert, setAlert] = useState<string>('');
  const [type, setType] = useState<Alerts>(Alerts.Error);
  const statusPosY = useRef(new Animated.Value(60)).current;
  const [isConnected, isReachable] = useNetwork();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showStatusModal = () => {
    Animated.timing(statusPosY, {
      toValue: -Metrics.screenHeight / 20,
      duration: Metrics.alertAnimation.showDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const automaticHide = () => {
    Animated.timing(statusPosY, {
      toValue: Metrics.alert.height,
      duration: Metrics.alertAnimation.showDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    });
  };

  const showAlert = (
    alertMessage: string,
    type: Alerts = Alerts.Error,
    checkNetwork = true,
  ) => {
    if (timerRef.current) {
      return;
    }
    setType(type);
    setAlert(
      checkNetwork && (!isConnected || !isReachable)
        ? NETWORK_ALERT
        : alertMessage,
    );
    showStatusModal();
    timerRef.current = setTimeout(
      () => automaticHide(),
      Metrics.alertAnimation.hideDuration,
    );
  };

  const hide = () => {
    automaticHide();
  };

  let icon: DyIconType;
  let color: string;
  let backgroundColor: string;

  switch (type) {
    case Alerts.Error:
      icon = DyIconType.Error;
      color = Colors.white;
      backgroundColor = Colors.danger;
      break;
    default:
      icon = DyIconType.Info;
      color = Colors.white;
      backgroundColor = Colors.info;

      break;
  }
  const value = useMemo(() => [showAlert], [showAlert]);

  return (
    <AlertsContext.Provider value={value}>
      <>
        {children}
        <Animated.View
          style={[
            styles.archiveStatusBar,
            {
              backgroundColor: backgroundColor,
              transform: [{translateY: statusPosY}],
            },
          ]}>
          <TouchableWithoutFeedback onPress={hide}>
            <View style={styles.pressContainer}>
              <Text style={[styles.archiveStatusBarText, {color: color}]}>
                {alert}
              </Text>
              <View style={styles.iconContainer}>
                <DyIcon type={icon} size={25} focus={false} color={color} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </>
    </AlertsContext.Provider>
  );
};

const styles = StyleSheet.create({
  pressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: Metrics.alert.padding,
  },
  archiveStatusBarText: {
    ...Typography.body1Style,
    fontSize: 14,
    paddingLeft: Metrics.alert.padding,
  },
  archiveStatusBar: {
    borderRadius: 10,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 1.5,
    shadowOpacity: 1,
    marginHorizontal: 15,
    height: Metrics.alert.height,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
});

export {AlertsProvider, useAlerts};
