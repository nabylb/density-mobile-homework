import {useState, useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const useAppState = (settings: {
  onChange?: (newAppState: any) => void;
  onForeground?: () => () => Promise<void>;
  onBackground?: () => void;
}) => {
  const {onChange, onForeground, onBackground} = settings || {};
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // App states are:
    // active - The app is running in the foreground
    // background - The app is running in the background. The user is either:
    //        * in another app
    //        * on the home screen
    //        * [Android] on another Activity (even if it was launched by your app)
    // inactive [iOS] - This is a state that occurs when transitioning between
    //        foreground & background, and during periods of inactivity such as entering
    //        the Multitasking view or in the event of an incoming call
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        isValidFunction(onForeground) && onForeground();
      } else if (nextAppState.match(/inactive|background/)) {
        isValidFunction(onBackground) && onBackground();
      }
      setAppState(nextAppState);
      isValidFunction(onChange) && onChange(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);
    // didUnmount effect
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [onChange, onForeground, onBackground]);

  // settings validation
  function isValidFunction(func: any) {
    return func && typeof func === 'function';
  }

  return {appState};
};

export default useAppState;
