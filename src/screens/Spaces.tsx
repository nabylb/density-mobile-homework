import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, NativeModules, LayoutAnimation} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {setIsLoading, addSpace} from '../store/actions';
import {useFetch} from '../hooks';
import {DyHeader} from '../components/atoms';
import {DyList} from '../components/templates';
import {useAlerts} from '../context/AlertsContext';
import {Colors} from '../styles';
import {SpaceType} from '../types';

// Layout animation
const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Spaces = () => {
  const [previousData, setPreviousData] = useState<SpaceType | null>(null);
  const [previousEvent, setPreviousEvent] = useState<SpaceType | null>(null);
  const [spacesCount, setSpacesCount] = useState<number>(0);
  const [notification, setNotification] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const res = useFetch();
  const [showAlert] = useAlerts();

  const dispatch = useDispatch();
  const _setIsLoading = useCallback(setIsLoading, [dispatch]);
  const _data = useSelector((state) => state.spaces.spaces);

  const _addSpace = useCallback(
    (space: SpaceType) => dispatch(addSpace(space)),
    [dispatch],
  );

  useEffect(() => {
    if (notification) {
      setNotification(false);
    }
  }, [notification]);

  useEffect(() => {
    if (res.error) {
      showAlert(res.error);
      res.setError(null);
    }
  }, [res.error, res.setError]);

  useEffect(() => {
    if (res.data && !_.isEqual(res.data, previousData)) {
      LayoutAnimation.spring();
      setSpacesCount(res.data.length);
      res.data.map(
        (item: {id: any; name: any; current_count: any; capacity: any}) => {
          _addSpace({
            id: item.id,
            name: item.name,
            count: item.current_count,
            capacity: item.capacity || -1,
          });
        },
      );
    }
    setPreviousData(res.data);
  }, [res.data]);

  useEffect(() => {
    let event = JSON.parse(res.event);

    if (!event || !event.payload) return;

    if (!_.isEqual(event.payload, previousEvent)) {
      _addSpace({
        id: event.payload.space_id,
        count: event.payload.count,
      });
      setNotification(true);
    }
    setPreviousEvent(event.payload);
  }, [res.event]);

  _setIsLoading(res.isLoading);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16)},
      ]}>
      <DyList
        header={
          <DyHeader
            title="Spaces"
            count={spacesCount}
            isLoading={res.isLoading}
            notification={notification}
          />
        }
        spaces={_data}
        loading={res.isLoading}
        refetch={res.refetch}
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
