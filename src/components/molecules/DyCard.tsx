import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import {useAnimate} from '../../hooks';
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
  const {bgColor} = useAnimate(count);

  return (
    <Animated.View style={[styles.container, {backgroundColor: bgColor}]}>
      <TouchableHighlight
        style={styles.titleContainer}
        activeOpacity={0.8}
        underlayColor={Colors.bgDarkAccent}
        onPress={onPress}
        onLongPress={onLongPress}>
        <>
          <View style={styles.contentContainer}>
            <View style={styles.leftTextContainer}>
              <Text style={styles.title}>{name}</Text>
            </View>
            <View style={styles.rightTextContainer}>
              <Text style={styles.count}>{count}</Text>
              {capacity === -1 ? null : (
                <Text style={styles.capacity}>/{capacity}</Text>
              )}
            </View>
          </View>
        </>
      </TouchableHighlight>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.card.height,
    backgroundColor: Colors.primary,
    borderRadius: Metrics.margin.m,
    marginHorizontal: Metrics.margin.m,
    marginBottom: Metrics.margin.m,
    borderBottomColor: Colors.grey50,
  },
  contentContainer: {
    flex: 1,
    marginLeft: Metrics.margin.s,
    marginRight: Metrics.margin.s,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    ...Typography.titleStyle,
    color: Colors.accent,
    fontWeight: '600',
  },
  count: {
    ...Typography.titleStyle,
    color: Colors.dark,
  },
  capacity: {
    ...Typography.bodyStyle,
    color: Colors.dark,
  },
  titleContainer: {
    flex: 1,
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
