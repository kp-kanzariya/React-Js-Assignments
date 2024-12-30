import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { React, useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '../../../assets/config/Colors';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { appendTextToFile } from '../../../helper/utils/Logger';
import { store } from '../../../redux/store';


export default function Calendar(props) {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);


  return (
    <>
      <View
        style={{
          ...styles.container,
          padding: 10,
          flex: isLandscape ? 1 : 0
        }}>
        <CalendarPicker
          {...props}
          // height={isLandscape ? 250 : 300}
          height={isMobile ? (isLandscape ? 250 : 300) : isLandscape ? 550 : 600}
          width={isMobile ? (isLandscape ? 250 : 300) : isLandscape ? 550 : 600}
          enableDateChange={false}
          customDatesStyles={props.getColors}
          minDate={new Date()}
          selectedDayTextColor="#000"
          textStyle={{
            color: '#000',
            padding: 0,
            fontFamily: FontFamily.TTCommonsMedium,
            fontSize: 16,
          }}
          onDateChange={props.onDateChange}
          onMonthChange={async e => {
            // console.error("E___________",e.isoWeekday())
            try {
              // setCustomDate(moment(e).format('YYYY-MM-DD'));
              let fromDate = moment(e).startOf('month').format('YYYY-MM-DD');
              let toDate = moment(e).endOf('month').format('YYYY-MM-DD');
              // alert(fromDate)
              await props.getDataForCalendar(fromDate, toDate);
            } catch (err) {
              appendTextToFile({
                text: `Error in catch fun OnMonthChange inside Calendar Line 69 ${err}`,
                headerDate: store?.getState().header.headerDate
              });
              console.error('🚀 ~ file: Calendar.js:64 ~ Calendar ~ err:', err);
            }
          }}
        />
        <View
          style={{
            ...styles.aprv_pending_holiday_cont,
          }}>
          <View style={{ ...styles.aprv_pending_holiday_view }}>
            <View
              style={{
                ...styles.box_view,
                borderRadius: 10,
                marginLeft:isMobile?0:10
              }}
            />
            <Text style={styles.TextLagend}>Approved</Text>
          </View>

          <View style={{ ...styles.aprv_pending_holiday_view, marginLeft: 10 }}>
            <View
              style={{
                ...styles.box_view,
                backgroundColor: 'orange',
                borderRadius: 10,
                marginLeft:isMobile?0:10
              }}
            />
            <Text style={styles.TextLagend}>Pending</Text>
          </View>
          {/* <View style={{...styles.aprv_pending_holiday_view, marginLeft: 10}}>
                  <View
                    style={{
                      ...styles.box_view,
                      backgroundColor: '#fc4f4f',
                      borderRadius:10
                    }}
                  />
                  <Text style={styles.TextLagend}>LWP</Text>
                </View> */}
          <View style={{ ...styles.aprv_pending_holiday_view, marginLeft: 10 }}>
            <View
              style={{
                ...styles.box_view,
                backgroundColor: '#cc07fba1',
                borderRadius: 10,
                marginLeft:isMobile?0:10
              }}
            />
            <Text style={styles.TextLagend}>Week Off</Text>
          </View>
          <View style={{ ...styles.aprv_pending_holiday_view, marginLeft: 10 }}>
            <View
              style={{
                ...styles.box_view,
                backgroundColor: '#4E9A9C',
                borderRadius: 10,
                marginLeft:isMobile?0:10
              }}
            />
            <Text style={styles.TextLagend}>Holiday</Text>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 5 }} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    zIndex: 1,
    // padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    width: '100%',
    flex: 1,
    // marginTop:100
    justifyContent: 'center',
    alignSelf: 'center'
  },
  aprv_pending_holiday_cont: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  aprv_pending_holiday_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box_view: {
    width: 15,
    height: 15,
    backgroundColor: Colors.MRGREEN,
    margin: 10,
  },
  TextLagend: {
    fontSize:12,
    fontFamily: FontFamily.TTCommonsMedium,
    color: Colors.black,
  },
});

Calendar.defaultProps = {
  height: 300,
  width: 500,
  onDateChange: () => { },
};
