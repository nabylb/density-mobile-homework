import {useState, useEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isReachable, setIsReachable] = useState<boolean | null | undefined>(
    false,
  );
  const [type, setType] = useState<string>();

  useEffect(() => {
    const setNetworkState = (state: NetInfoState) => {
      setIsConnected(state.isConnected);
      setIsReachable(state.isInternetReachable);
      setType(state.type);
    };

    const onConnectivityChange = (state: NetInfoState) =>
      setNetworkState(state);

    NetInfo.fetch()
      .then((state: NetInfoState) => setNetworkState(state))
      .catch((error: any) => {
        console.log(error);
      });

    const unsubscribe = NetInfo.addEventListener(onConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return [isConnected, isReachable, type];
};

export default useNetwork;
