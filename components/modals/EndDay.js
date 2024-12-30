import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ModalRoot from '../shared/modals/ModalRoot';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import { useSelector } from 'react-redux';
import Input from '../shared/textinputs/Input';
import Attachment from '../shared/attachment/Attachment';
import DateTimePicker from '../shared/datepicker/DateTimePicker';
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions';
import { ImagesAssets } from '../shared/ImagesAssets';
import moment from 'moment';

const EndDayComp = ({
  setEndDayRemarkModal,
  setShowModal,
  isMobile,
  isLandscape,
  handleAttendance,
  time,
  setTime,
}) => {
  //   const [timeData, setTimeData] = useState(new Date());
  const { headerDate } = useSelector(state => state.header);

  // const handleEndDayBtn = (dt) => {
  //   punchOut(dt);
  //   setShowModal(false);
  //   //   setEndDayRemarkModal(true);
  // };

  useEffect(() => {
    // alert(time);
  }, [time]);

  return (
    <View style={{ ...styles.ed_Cont }}>
      <View>
        {isMobile ? (
          <Image
            resizeMode="contain"
            style={{
              height: isLandscape ? 100 : 200,
              width: 200,
            }}
            source={ImagesAssets.Calandergif}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={{
              height: 200,
              width: 200,
            }}
            source={ImagesAssets.Calandergif}
          />
        )}
      </View>

      <View style={{ ...styles.heading_text_container }}>
        <Text style={{ ...styles.heading_text }}>{moment(headerDate).format('dddd, Do MMM YYYY')}</Text>
      </View>
      <View style={{ width: '100%', backgroundColor: '#f4f4f4', borderRadius: 8 }}>
        <DateTimePicker
          height={50}
          borderColor="#f4f4f4"
          backgroundColor="#f4f4f4"
          mode="time"
          setDate={setTime}
        // format={'hh:mm A'}
        />
      </View>
      <View style={{ ...styles.btn_end_my_day }}>
        <ButtonRoot
          testID={'clickPunchOut'}
          onPress={() => handleAttendance('punchOut', time)}
          color="#00acd3"
          borderRadius={5}
          title="End My Day"
          width={'100%'}
        />
      </View>
    </View>
  );
};

const EndDay = props => {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  const [endDayModalWidth] = useResponsiveDimensions({
    mobile: ['40%', '80%'],
    tab: ['40%', '60%'],
  });
  const [endDayRemarkModal, setEndDayRemarkModal] = useState(false);

  const [time, setTime] = useState(moment().format('hh:mm A'));

  const DayEndRemark = punchOut => {
    return (
      <View>
        <View style={{ ...styles.heading_text_container }}>
          <Text style={{ ...styles.heading_text }}>End Day</Text>
        </View>
        <View style={{ ...styles.input_sty }}>
          <Input
            width="100%"
            height={102}
            borderRadius={0}
            backgroundColor="#f4f4f4"
          />
        </View>

        <View style={{ ...styles.attachment_cont }}>
          <View style={{ ...styles.attachment_style }}>
            <Attachment size={25} />
          </View>
          <View style={{ ...styles.attachment_style }}>
            <Attachment size={25} />
          </View>
          <View style={{ ...styles.attachment_style }}>
            <Attachment size={25} />
          </View>
        </View>
        <View style={{ ...styles.submit_cancel_btn }}>
          <View style={{}}>
            <ButtonRoot color="#50b030" width={100} borderRadius={15} />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text>Cancel</Text>
          </View>
        </View>
      </View>
    );
  };

  //Function for the day End
  // Function for the day End Remark open when click on (handleEndDayBtn)

  // const punchOut = async (dt) => {
  //   // props.setRefreshButton(!props.refreshButton)
  //   try {
  //     let params = {
  //       punchout_date: moment(dt).format('YYYY-MM-DD'),
  //       punchout_time: time,
  //       latlnt: `${345},${564}`,
  //       location: 'Gwalior',
  //       remark: '',
  //     };
  //     let response = await postData({url: API.punchout, params});
  //     if (response.statusCode == 200) {
  //       AlertSuccess(response.message);
  //     } else {
  //       alert(JSON.stringify(response))
  //       AlertWarning(response.message);
  //     }
  //     // setEndDayRemarkModal(false);
  //     // setTimeout(()=>{
  //       setEndDayRemarkModal(false);

  //     // },1000)
  //     props.setRefreshButton(!props.refreshButton);
  //   } catch (err) {
  //     console.error('🚀 ~ file: EndDay.js:111 ~ punchOut ~ err:', err);
  //   }
  // };

  return (
    <>
      <ModalRoot
        testID={'EndDayModal'}
        width={endDayModalWidth}
        padding={1}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        content={
          <EndDayComp
            setEndDayRemarkModal={setEndDayRemarkModal}
            setShowModal={props.setShowModal}
            handleAttendance={props.handleAttendance}
            time={time}
            setTime={setTime}
          />
        }
      />
      {/* <ModalRoot
        width={isLandscape ? 400 : 350}
        padding={15}
        showModal={endDayRemarkModal}
        setShowModal={setEndDayRemarkModal}
        content={<DayEndRemark punchOut={punchOut} />}
      /> */}
    </>
  );
};

export default EndDay;

const styles = StyleSheet.create({
  heading_text: {
    fontFamily: FontFamily.TTCommonsBold,
    color: '#000000',
    fontSize: 16,
  },
  heading_text_container: {
    width: '100%',
    padding: 5,
  },

  ed_Cont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input_sty: {
    width: '100%',
    flexWrap: 'wrap',
  },
  attachment_cont: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
  },
  attachment_style: {
    marginLeft: 10,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 5,
  },
  submit_cancel_btn: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_end_my_day: {
    width: '100%',
    marginTop: 20,
  },
});
