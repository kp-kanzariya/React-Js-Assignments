import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, TextInput, Dimensions, Text } from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../../assets/config/Colors';
import { FontSize } from '../../../assets/fonts/Fonts';
import { FontFamily } from '../../../assets/fonts/FontFamily';
const { width } = Dimensions.get('window');

// import moment from 'moment';

function DateTimePicker(props) {
  //   const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [value, setValue] = useState('Select Date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === 'ios');
    // setDate(currentDate);
    setDate1(currentDate);
    props.setDate(
      moment(currentDate).format(
        props.mode == 'time' ? 'hh:mm A' : 'YYYY-MM-DD',
      ),
    );
    props.onChangeDate(
      moment(currentDate).format(
        props.mode == 'time' ? 'hh:mm A' : 'YYYY-MM-DD',
      ),
    );
    setValue(props.mode == 'time'
      ? moment(currentDate).format('hh:mm A')
      : currentDate?.toUTCString()?.substring(0, 16))
  };

  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    if (props.defaultdate) {
      setDate1(props?.defaultdate);
      setValue(props.mode == 'time'
        ? moment(props?.defaultdate).format('hh:mm A')
        : moment(props?.defaultdate).format('ddd,DD MMM YYYY'))
    }
    if (!props.placeholderNew) {
      // setValue(moment().format('ddd,DD MMM YYYY'))
      setValue(props.mode == 'time'
        ? moment().format('hh:mm A')
        : moment().format('ddd,DD MMM YYYY'))
    }
  }, [props.defaultdate]);


  console.log('date1==>', date1);
  console.log('props.defaultdate', props?.defaultdate);

  return (
    <>
      <TouchableOpacity
        disabled={!props.editable}
        onPress={showDatepicker}
        style={{ width: '100%' }}>
        <View
          style={{
            borderRadius: props.borderRadius,
            borderWidth: props.borderWidth,
            borderColor: props.borderColor,
            width: props.width,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: props.editable ? props.backgroundColor : Colors.borderColor,
            height: props.height,
          }}>
          <TextInput
            editable={false}
            value={
              value
            }
            label="* Enter Date"
            style={{
              marginLeft: 10,
              fontFamily: FontFamily.TTCommonsMedium,
              // fontSize: FontSize.labelText,
              // top: 2,
              width: '98%',
              overflow: 'hidden',
              color: Colors.black,
            }}
            underlineColor={'transparent'}
            labelStyle={{ fontSize: FontSize.labelText, color: Colors.MRTEXTGREY }}
          />
          <View style={{ position: 'absolute', right: 10 }}>
            <Ionicons
              name="calendar-sharp"
              size={17}
              color={'black'}
            />
          </View>
          <View style={{ position: 'absolute', right: 40 }}>
            <Text style={{ color: props.placeholderColor }}>{props.placeholder}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {show && (
        <DatePicker
          {...props}
          testID="dateTimePicker"
          value={date1}
          mode={props.mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}

DateTimePicker.defaultProps = {
  width: '100%',
  format: 'DD-MM-YYYY',
  borderColor: Colors.borderColor1,
  mode: 'date',
  borderRadius: 8,
  backgroundColor: 'white',
  height: 40,
  defaultdate: false,
  onChangeDate: () => { },
  setDate: () => { },
  editable: true,
  placeholder: '',
  placeholderNew: false,
};

export default DateTimePicker;
