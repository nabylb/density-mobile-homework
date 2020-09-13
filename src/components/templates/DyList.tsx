import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import DyCard from '../molecules/DyCard';
import {SpacesType} from '../../types';
import {useAlerts} from '../../context/AlertsContext';

interface IProps {
  header?: JSX.Element | null;
  spaces?: SpacesType[];
  loading: boolean;
}

const DyList: React.FC<IProps> = ({header = null, spaces = [], loading}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showAlert] = useAlerts();

  const renderSpace = (item: any) => {
    return (
      <DyCard
        title={item.item.name}
        number={item.item.count}
        id={item.item.id}
        onPress={null}
        onLongPress={null}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    showAlert('Hello');
    setTimeout(() => setRefreshing(false), 3000);
  };
  return (
    <View style={styles.container}>
      {header}
      <View style={styles.listContainer}>
        {!loading ? (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={spaces}
            renderItem={renderSpace}
            keyExtractor={(item) => `${item.id}`}
          />
        ) : (
          <Text>Waiting for Data</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
export default DyList;
