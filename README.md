# Project

The project was completed with React Native 0.63.2 and Typescript. The libraries below were used:

- Lottie: for native run micro animations.
- React Navigation: for navigation.
- react-native-safe-area-context: for safe areas in iOS and Android.
- Redux: To manage the app global state and persist the state.
- @react-native-community/async-storage: To persist locally the Redux store and cache the data for fast loading.

# Description

The app loads the cached list of spaces from the phone local storage (async-storage) into the Redux store. If there is no data cached then it first gets the spaces list and connects through websocket to the live count update. 

The animated indicator in the top right blinks whenever a space count is updated. The space card color changes also when updated. A pull refresh refetches the spaces list before updating the count through websockets.

The space capacity is also displayed if available.

# iOS Demo

![iPhone demo](./Resources/ios.gif)

# Android Demo

![Android demo](./Resources/android.gif)
