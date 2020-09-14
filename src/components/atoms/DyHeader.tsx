import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography, Metrics} from '../../styles';

interface IProps {
  title?: string;
}

const DyHeader: React.FC<IProps> = ({title = ''}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Metrics.card.height,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    marginBottom: 20,
  },
  title: {
    ...Typography.headlineStyle,
    color: Colors.text,
    textAlign: 'center',
  },
});

export default DyHeader;
