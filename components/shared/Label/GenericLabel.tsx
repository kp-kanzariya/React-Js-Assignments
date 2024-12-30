import React, { useMemo } from 'react';
import { Text, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { FontFamily } from '../../../assets/fonts/FontFamily';

interface LabelProps {
  text: string;
  required?: boolean;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  color?: string;
  fontSize?: number;
  fontWeight?:TextStyle['fontWeight']
}

const GenericLabel = ({
  text,
  required = false,
  textStyle,
  containerStyle,
  color = '#000',  
  fontSize = 14,  
  fontWeight 
}: LabelProps): JSX.Element => {

  // Memoizing styles to prevent unnecessary recalculations
  const computedTextStyle = useMemo(() => {
    return [styles.text, { color, fontSize ,fontWeight}, textStyle];
  }, [color, fontSize, textStyle,fontWeight]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={computedTextStyle}>
        {text}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  text: {
    fontSize: 14,
    color: '#000',
    fontFamily: FontFamily.TTCommonsMedium
  },
  required: {
    color: 'red',  // Asterisk for required fields in red color
  },
});

export default GenericLabel;
