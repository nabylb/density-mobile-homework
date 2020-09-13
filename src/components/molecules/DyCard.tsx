import React from 'react';
import {TouchableHighlight, Text, View, StyleSheet} from 'react-native';
import {Typography, Colors, Metrics} from '../../styles';

interface IProps {
  title: string;
  number: number;
  onPress: () => void;
  onLongPress: () => void;
}
const DyCard: React.FC<IProps> = ({title, number, onPress, onLongPress}) => {
  return (
    <TouchableHighlight
      style={[styles.container, {borderBottomColor: Colors.grey50}]}
      activeOpacity={0.8}
      underlayColor={Colors.bgDarkAccent}
      onPress={onPress}
      onLongPress={onLongPress}>
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{number}</Text>
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
    color: Colors.dark,
    fontWeight: '600',
  },
  subtitle: {
    ...Typography.bodyStyle,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default DyCard;
