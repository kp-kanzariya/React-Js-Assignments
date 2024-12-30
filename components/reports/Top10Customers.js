import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Label from '../shared/Label';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import moment from 'moment';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { SERVER_URL, downloadExcelReport, getAppToken, getEmployeeId, getTerritories, handleFilterOfMonthName } from '../../api/commonRepository';
import Spacer from '../shared/spacers/Spacer';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ModalRoot from '../shared/modals/ModalRoot';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import FilterDropdown from '../shared/dropdowns/FilterDropdown';
import { AlertDanger } from '../shared/alerts/Alert';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';



function RenderItem({ item, headerDate, emp }) {
  // console.log("item testing&*(", item)
  // alert(item?.DcrDate)
  const { network } = useSelector(state => state.network);
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();


  const onClick = async (action) => {
    if (network) {
      setOpenModal(!openModal);
      try {
        if (action == 'webview') {
          navigation.navigate('Webview', {
            URL: API.DvpReport,
            date: headerDate,
            EmployeeId: emp,
            CameFrom: 'DarReport',
          });
        } else {
          const serverurl = await SERVER_URL()
          const appptkn = await getAppToken();
          // let url = `${serverurl}${API.DvpReport}?apptoken=${appptkn}&date=${headerDate}&&action=download`
          let url = `${serverurl}${API.DvpReport}?apptoken=${appptkn}&date=${headerDate}&employee_id=${emp}&action=download`
          downloadExcelReport(url, 'RcpaBaseReport')
        }
      } catch (err) {
        console.log("🚀 ~ file: VisitHistory.js:51 ~ onClick ~ err:", err)
        appendTextToFile({
          text: `Error in catch fun onClick inside Top10Customers Line 52 ${err}`,
          headerDate: store?.getState().header.headerDate
        });

      }
    } else {
      AlertDanger('No internet connection.')
    }
  }

  return (
    <ScrollView style={{ height: 'auto' }} nestedScrollEnabled={true}>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('Webview', {
          //   URL: API.DvpReport,
          //   date: headerDate,
          //   EmployeeId: emp,
          //   CameFrom: 'DarReport',
          // });
          setOpenModal(!openModal);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 5,
            borderTopWidth: 0.8,
            borderColor: Colors.borderColor1,
            paddingVertical: 5,
          }}>
          <View style={{ ...styles.container, marginLeft: 5 }}>
            <Text style={styles.headText1}>
              {item.Name}
            </Text>
          </View>

          <View style={{ ...styles.container, }}>
            <Text style={styles.headText1}>
              {parseInt(item?.Potential)}
            </Text>
          </View>
          <View
            style={{ ...styles.container, }}>

            <Text style={styles.headText1}>
              {parseInt(item?.Own)}
            </Text>
          </View>
          <View
            style={{ ...styles.container, }}>
            <Text style={styles.headText1}>
              {item.Brands.length > 3 ? `>3 BrandRexers` : `${item?.Brands?.length} Brand Rexers`}
            </Text>
          </View>
          <View
            style={{ ...styles.container }}>
            <Text style={styles.headText1}>
              {item?.VisitFq}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <ModalRoot width={250} showModal={openModal} setShowModal={setOpenModal} content={
        <View style={{ width: 230, alignSelf: 'center', position: 'relative' }} >
          <TouchableOpacity onPress={() => setOpenModal(!openModal)}
            style={{ position: 'absolute', top: -20, right: -5, }}
          >
            <Entypo name='circle-with-cross' size={30} />
          </TouchableOpacity>
          <Spacer />
          <ButtonRoot padding={5} height={40} title={`View DVP Report`} onPress={() => { onClick('webview') }} />
          <Spacer h={5} />
          <ButtonRoot padding={5} height={40} title={`Download DVP Report`} onPress={() => { onClick('download') }} />
        </View>
      } />
    </ScrollView>
  );
}

const Top10Customers = props => {
  const { headerDate } = useSelector(state => state.header);
  const { isMobile } = useSelector(state => state.isLandscape);


  const [data, setData] = useState([]);
  const [selectedTerr, setSelectedTerr] = useState('');
  const [territories, setTerritories] = useState('');
  const [moye, setMoYe] = useState(moment().format('MM-YYYY'));
  const [emp, setEmp] = useState('');
  const [show, setShow] = useState(false);

  const getTopOutlet = async (moye, terr) => {

    try {
      let response;
      if (props.showTerr) {
        let terri = await getTerritories();
        // console.log("terri Line 100-->", terri)
        let dt = terri?.data;
        let formtdData = Object.keys(dt).reduce((arr, item) => {
          arr.push({ label: dt[item], id: parseInt(item) })
          return arr;
        }, [])
        // formtdData.unshift({ id: mydt[0]?.TerritoryId, label: `${mydt[0]?.TerritoryCode} | ${mydt[0]?.TerritoryName} | MYSELF ` })
        setTerritories(formtdData);
        setShow(true)
        response = await getData({
          url: API.getTopOutlets,
          params: { territory_id: terr == '' ? formtdData[0].id : terr, moye: moye },
        });
        // console.log("response Top rxbers", response)
      } else {
        response = await getData({
          url: API.getTopOutlets,
          params: { moye: moye }
        });
      }
      if (response.statusCode === 200) {
        // let formatted_data = response.data.reduce((arr, item) => {
        //   // console.error(item.Brands.length)
        //   let brands = item.Brands.length
        //   // alert(typeof item.Own)
        //   arr.push([
        //     item.Name,
        //     item.Potential,
        //     item.Own,
        //     `${brands > 3 ? '>3' : brands} Brand Rexer`,
        //     item.VisitFq,
        //   ]);
        //   return arr;
        // }, [])
        // setData(formatted_data);
        setData(response.data);
      }
    } catch (err) {
      console.error(
        '🚀 ~ file: MissedDoctor.js:13 ~ getMissedOutlets ~ err:',
        err,
      );
    }
  };

  // console.log("data-----------", data)

  const handleFilter = key => {
    try {
      if (key === 0) {
        let moye = moment().format('MM-YYYY');
        setMoYe(moye);
      } else if (key === 1) {
        let moye = moment().subtract(1, 'month').format('MM-YYYY');
        setMoYe(moye);
      } else if (key === 2) {
        let moye = moment().subtract(2, 'month').format('MM-YYYY');
        setMoYe(moye);
      }

    } catch (err) {
      console.error(
        '🚀 ~ file: BasicActivityReport.js:140 ~ handleFilter ~ err:',
        err,
      );
    }
  };

  const getEmp = async () => {
    const emp = await getEmployeeId();
    setEmp(emp)
  }

  useEffect(() => {
    getTopOutlet(moye, selectedTerr);
    getEmp()
  }, [moye, selectedTerr]);

  return (
    <View>
      <View style={{ marginVertical:isMobile?10:5 }} />
      {props.showTerr ?
        <>
          <Label
            Size={14}
            Family={FontFamily.TTCommonsMedium}
            Label={props.checkReplacement('TopOutlets','title')||'Top Doctors'}
            // lastFilterData={[
            //   { label: moment().format('MMMM'), id: 0 },
            //   { label: moment().subtract(1, 'month').format('MMMM'), id: 1 },
            //   { label: moment().subtract(2, 'months').format('MMMM'), id: 2 },
            // ]}
            // defaultSelected1={moment().format('MMMM')}
            // onValueChange1={item => handleFilter(item.id)}
            // defaultSelected2={`${territories[0]?.label}`}
            // onValueChange2={item => setSelectedTerr(item.id)}
            // secondLastFilterData={territories}
            // secondLastPosition={100}
            WRAP={'wrap'}
            WIDTHTEXT={'33%'}
          />

          {show && <FilterDropdown right={isMobile ? 0 : 115} topp={isMobile ? 20 : 10}
            options={territories}
            defaultSelected={`${territories[0]?.label}`}
            onValueChange={(item) => setSelectedTerr(item.id)} />}
          <FilterDropdown right={0} topp={isMobile ? -3 : 10}
            options={[
              { label: moment().format('MMMM'), id: 0 },
              { label: moment().subtract(1, 'month').format('MMMM'), id: 1 },
              { label: moment().subtract(2, 'months').format('MMMM'), id: 2 },
            ]}
            defaultSelected={moment().format('MMMM')}
            onValueChange={(item) => handleFilter(item.id)} />
        </>
        :
        <Label
          Size={14}
          Family={FontFamily.TTCommonsMedium}
          Label={props.checkReplacement('TopOutlets','title')||'Top Doctors'}
          lastFilterData={[
            { label: moment().format('MMMM'), id: 0 },
            { label: moment().subtract(1, 'month').format('MMMM'), id: 1 },
            { label: moment().subtract(2, 'months').format('MMMM'), id: 2 },
          ]}
          defaultSelected1={moment().format('MMMM')}
          onValueChange1={item => handleFilter(item.id)}
          WRAP={'wrap'}
          WIDTHTEXT={'33%'}
        />
      }
      <View style={{ marginVertical: 3 }} />

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          overflow: 'hidden',
          borderColor: Colors.borderColor1,
          backgroundColor: 'white',
          height: 250,
          // flex:1
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: '#e9f6fa',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: 30,
            alignItems: 'center',
          }}>
          <View style={{ ...styles.container, }}>
            <Text style={styles.headText}>Customer Name</Text>
          </View>

          <View style={{ ...styles.container, }}>
            <Text style={styles.headText}>Potential</Text>
          </View>

          <View
            style={{
              ...styles.container,
              // flex: 3,
              // alignItems: 'flex-start',
              marginLeft: 20,
            }}>
            <Text style={styles.headText}>Own</Text>
          </View>
          <View
            style={{
              ...styles.container,
              // flex: 3,
              alignItems: 'flex-start',
              marginLeft: 20,
            }}>
            <Text style={styles.headText}>Classification</Text>
          </View>
          <View
            style={{
              ...styles.container,
              // flex: 3,
              alignItems: 'flex-start',
              // marginLeft: 20,
              marginLeft: 2
            }}>
            <Text style={styles.headText}>Visit Frequency</Text>
          </View>
        </View>
        <View style={{}}>
          <ScrollView
            style={{ height: 'auto' }}
            nestedScrollEnabled
            contentContainerStyle={{}}>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <RenderItem item={item} index={index} headerDate={headerDate} emp={emp} />
              )}
            />
          </ScrollView>
        </View>
      </View>


      {/* ======== */}

    </View>
  );
};

export default Top10Customers;

const styles = StyleSheet.create({
  headText: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 12,
    color: 'black',
  },
  headText1: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 12,
    color: 'black',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});

