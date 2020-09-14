import React from 'react';
import {TouchableHighlight, Text, View, StyleSheet} from 'react-native';
import {Typography, Colors, Metrics} from '../../styles';

interface IProps {
  name: string;
  count: number;
  capacity: number;
  onPress: () => void;
  onLongPress: () => void;
}
const DyCard: React.FC<IProps> = ({
  name,
  count,
  capacity,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableHighlight
      style={[styles.container, {borderBottomColor: Colors.grey50}]}
      activeOpacity={0.8}
      underlayColor={Colors.bgDarkAccent}
      onPress={onPress}
      onLongPress={onLongPress}>
      <>
        <View style={styles.titleContainer}>
          <View style={styles.leftTextContainer}>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.rightTextContainer}>
            <Text style={styles.subtitle}>{count}</Text>
            <Text style={styles.capacity}>
              /{capacity === -1 ? 'N/A' : capacity}
            </Text>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.card.height,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    ...Typography.titleStyle,
    color: Colors.accent,
    fontWeight: '600',
  },
  subtitle: {
    ...Typography.titleStyle,
    color: Colors.dark,
  },
  capacity: {
    ...Typography.bodyStyle,
    color: Colors.dark,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftTextContainer: {
    flex: 5,
  },
  rightTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default DyCard;
