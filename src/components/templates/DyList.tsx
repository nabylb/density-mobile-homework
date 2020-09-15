import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import DyCard from '../molecules/DyCard';
import {Animations, Metrics} from '../../styles';
import {SpaceType} from '../../types';
import {useAlerts} from '../../context/AlertsContext';

interface IProps {
  header?: JSX.Element | null;
  spaces?: SpaceType[];
  loading: boolean;
  refetch: () => void;
}

const DyList: React.FC<IProps> = ({
  header = null,
  spaces = [],
  loading,
  refetch,
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showAlert] = useAlerts();

  const renderSpace = (item: any) => {
    return (
      <DyCard
        name={item.item.name}
        count={item.item.count}
        capacity={item.item.capacity}
        id={item.item.id}
        onPress={null}
        onLongPress={null}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(false);
    refetch();
  };

  return (
    <View style={styles.container}>
      {header}
      <View style={styles.listContainer}>
        {!loading ? (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={Object.values(spaces)}
            renderItem={renderSpace}
            keyExtractor={(item) => `${item.id}`}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <LottieView
              source={Animations.loading}
              autoPlay
              loop
              resizeMode="cover"
              style={{
                height: Metrics.screenWidth / 2,
                width: Metrics.screenWidth / 2,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: Metrics.margin.s,
  },
  listContainer: {
    flex: 1,
  },
});
export default DyList;
