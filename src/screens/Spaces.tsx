import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSocket} from '../hooks';
import {DyHeader} from '../components/atoms';
import {DyList} from '../components/templates';
import {Colors} from '../styles';
import {SpacesType} from '../types';

const spaces: SpacesType[] = [];

const Spaces = () => {
  const insets = useSafeAreaInsets();
  const res = useSocket(
    'wss://sockets.density.io:8443/v1/?code=skc_3563ltZpu4k6ovNRxB1dySFMqR5edEUF',
  );

  const data = JSON.parse(res.data);

  if (data && data.payload) {
    spaces[data.payload.space_id] = {
      name: data.payload.space_id,
      count: data.payload.count,
      id: data.payload.serial_number,
    };
  }
  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16)},
      ]}>
      <DyList
        header={<DyHeader title="Spaces" />}
        spaces={Object.values(spaces)}
        loading={res.isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default Spaces;
