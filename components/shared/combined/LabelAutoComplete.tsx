import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import GenericLabel from '../Label/GenericLabel';
import { useReportsState } from '../../../modules/Reports/providers/ReportsStateProvider';

interface LabelAutocompleteProps {
  labelText: string;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  dropdowns?: React.ReactNode[];
  dropdownWidths?: number[];
  dropdownItemStyle?: ViewStyle;
  backgroundColor?: string;
}

const LabelAutocomplete: React.FC<LabelAutocompleteProps> = ({
  labelText,
  labelStyle,
  containerStyle,
  dropdowns,
  dropdownWidths = [],
  dropdownItemStyle,
  backgroundColor = '#F0F3F2'//'#ced6e0'
}) => {
  const {isMobile}  = useReportsState();

  return (
    <View style={[styles.container, containerStyle, { backgroundColor }]}>
      <View style={styles.labelContainer}>
        <GenericLabel text={labelText} fontWeight="600" textStyle={labelStyle} />
      </View>
      <View style={[styles.dropdownContainer, dropdownItemStyle]}>
        {dropdowns?.map((dropdown, index) => (
          <View
            key={index}
            style={[
              styles.dropdownWrapper,
              { width: dropdownWidths[index] || 'auto' },
            ]}
          >
            {dropdown}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    flexWrap:'wrap',
  },
  labelContainer: {
    justifyContent: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdownWrapper: {
    marginLeft: 10,
  },
});

export default LabelAutocomplete;
