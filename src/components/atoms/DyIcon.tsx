import React from 'react';
import {View, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Colors, Metrics} from '../../styles';
import {DyIconType} from '../../types';

interface IProps {
  type: DyIconType;
  focus?: boolean;
  size?: number;
  color?: string;
  focusColor?: string;
}
const DyIcon: React.FC<IProps> = ({
  type,
  focus = false,
  size = Metrics.icon.size,
  color = Colors.secondary,
  focusColor = Colors.secondary,
}) => {
  const renderIcon = () => {
    const fill = focus ? focusColor : color;

    switch (type) {
      case DyIconType.Info: {
        return <FontAwesomeIcon name="info" size={size} color={fill} />;
      }
      case DyIconType.Error: {
        return <FontAwesomeIcon name="warning" size={size} color={fill} />;
      }
      default: {
        return <View style={styles.placeholder} />;
      }
    }
  };

  return <>{renderIcon()}</>;
};

const styles = StyleSheet.create({
  placeholder: {
    width: Metrics.icon.size,
    height: Metrics.icon.size,
  },
});

export default DyIcon;
