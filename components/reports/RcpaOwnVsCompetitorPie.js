import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Label from '../shared/Label';
import PieChart from '../shared/Charts/PieChart/PieChart';
import { Colors } from '../../assets/config/Colors';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import { FontFamily } from '../../assets/fonts/FontFamily';
import moment from 'moment';
import BrandsDao from '../../Database/DAO/BrandsDao';
import Spacer from '../shared/spacers/Spacer';
import RcpaOwnVsCompetitorPieShimmer from './RcpaOwnVsCompetitorPieShimmer';
import NoData from '../shared/noDataCOmponent/NoData';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';

const RcpaOwnVsCompetitorPie = props => {
  const [data, setData] = useState([]);
  const [colorsArray, setColorsArray] = useState([]);
  const [fromDate, setFromDate] = useState(
    moment().startOf('month').format('YYYY-MM-DD'),
  );
  const [toDate, setToDate] = useState(
    moment().endOf('month').format('YYYY-MM-DD'),
  );
  const [brandId, setBrandId] = useState('');
  const [brands, setBrands] = useState([]);
  const [show, setShow] = useState(false);
  const [fullData, setFullData] = useState([]);
  const [loader, setLoader] = useState(true)

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const getRcpaOwnVsCompetitorData = async (
    startDate,
    endDate,
    empId,
    brandId,
  ) => {
    try {
      setLoader(true)
      if (startDate == '' || endDate == '' || brandId == '' || empId == '') {
        console.warn('required data not available');
      } else {
        let params = {
          start_date: startDate,
          end_date: endDate,
          employee_id: empId,
          brand_id: brandId,
        };
        // alert(JSON.stringify(params));
        const response = await getData({
          url: API.rcpa_own_vs_competitior,
          params: params,
        });
        if (response.statusCode == 200) {
          setLoader(false)
          setFullData(response.data);
          let new_data = response.data.competitor_data.reduce((arr, item) => {
            arr.push({
              y: Number(item.rcpaValue),
              x: `${item.competitor_name}(${item.rcpa_percentage})%`,
            });
            return arr;
          }, []);
          new_data.unshift({
            y: Number(response.data.own_value),
            x: `${response.data.brand_name}(${response.data.percentage})%`,
          });
          let colors = new_data.reduce((arr, item) => {
            arr.push(generateColor());
            return arr;
          }, []);

          setColorsArray(colors);
          setData(new_data);
        }
      }
    } catch (err) {
      console.error(
        '🚀 ~ file: RcpaOwnVsCompetitorPie.js:15 ~ getRcpaOwnVsCompetitorData ~ err:',
        err,
      );
      appendTextToFile({
        text: `Error in catch fun getRcpaOwnVsCompetitorPie inside RCPAOwnVsCompetitorPie Line 91 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  const changeFilter = (item, fDate, tDate) => {
    if (item.label == 'Current Month') {
      let fDate = moment().startOf('month').format('YYYY-MM-DD');
      let tDate = moment().endOf('month').format('YYYY-MM-DD');
      // getRCPABifurcation(fDate, tDate);
      setFromDate(fDate);
      setToDate(tDate);
    } else if (item.label == 'Last Month') {
      let fDate = moment()
        .subtract(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
      let tDate = moment()
        .subtract(1, 'month')
        .endOf('month')
        .format('YYYY-MM-DD');
      setFromDate(fDate);
      setToDate(tDate);
    } else if (item.label == 'Fortnight') {
      let fDate = moment().subtract(15, 'days').format('YYYY-MM-DD');
      let tDate = moment().format('YYYY-MM-DD');
      setFromDate(fDate);
      setToDate(tDate);
    } else if (item.label == 'Half Yearly') {
      let fDate = moment()
        .subtract(6, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
      let tDate = moment().endOf('month').format('YYYY-MM-DD');
      setFromDate(fDate);
      setToDate(tDate);
    } else if (item.label == 'Yearly') {
      let fDate = moment().startOf('year').format('YYYY-MM-DD');
      let tDate = moment().endOf('year').format('YYYY-MM-DD');
      setFromDate(fDate);
      setToDate(tDate);
    }
  };

  const getBrands = async () => {
    try {
      const dt = await BrandsDao.getAllBrandsForFilter();
      setBrandId(dt[0]?.id);
      setBrands(dt);
      setShow(true);
      setLoader(false);
    } catch (err) {
      console.error('🚀 ~ file: Rcpa.js:170 ~ getBrands ~ err:', err);
      appendTextToFile({
        text: `Error in catch fun getBrands inside RCPAOwnVsCompetitorPie Line 151 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    // let fDate = moment().startOf('month').format('YYYY-MM-DD');
    // let tDate = moment().endOf('month').format('YYYY-MM-DD');
    getRcpaOwnVsCompetitorData(fromDate, toDate, props?.empId, brandId);
  }, [fromDate, toDate, brandId, props.empId]);

  return (
    <>
      <Spacer />
      {show && (
        <Label
          Label="RCPA Own Vs Competitor"
          defaultSelected1={'Current Month'}
          lastFilterData={[
            { label: 'Current Month', id: 1 },
            { label: 'Fortnight', id: 2 },
            { label: 'Last Month', id: 3 },
            { label: 'Half yearly', id: 4 },
            { label: 'Yearly', id: 4 },
          ]}
          onValueChange1={item => changeFilter(item)}
          secondLastFilterData={brands}
          secondLastPosition={130}
          defaultSelected2={brands[0]?.label}
          onValueChange2={item => setBrandId(item.id)}
        />
      )}
      <Spacer />
      {loader ? <RcpaOwnVsCompetitorPieShimmer /> :
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // flexDirection: 'row',
            // height: 250,
            width: '100%',
            backgroundColor: 'white',
            // right: 15,
            overflow: 'hidden',
            // marginTop: 5,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: Colors.borderColor1,
            paddingVertical: 10
          }}>
          <View style={styles.container}>
            {data.length <= 1 ? (
              <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%' }} ><NoData /></View>
            ) : (
              <>
                <View style={{ width: '60%' }}>
                  <PieChart
                    data={data}
                    colorArray={colorsArray}
                    right={30}
                    width={350}
                    height={350}
                  />
                </View>
                <View
                  style={{
                    position: 'relative',
                    width: '40%',
                    flexDirection: 'column',
                  }}>

                  <View
                    style={{
                      // marginTop: 40,
                      //   justifyContent: 'center',
                      // alignItems: 'center',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      // marginLeft: 25,
                      zIndex: -1,
                    }}>
                    {/* <Text>Competitors</Text> */}
                    <ScrollView
                      style={{ height: 150 }}
                      contentContainerStyle={{}}
                      nestedScrollEnabled={true}>
                      <View
                        style={{
                          // flexDirection: 'row',
                          // alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                        {data.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  height: 10,
                                  width: 10,
                                  backgroundColor: colorsArray[index],
                                  borderRadius: 10,
                                }}></Text>
                              <Text
                                style={{
                                  // height: 10,
                                  // width: 10,
                                  // backgroundColor: colorsArray[index],
                                  borderRadius: 10,
                                  fontFamily: FontFamily.TTCommonsMedium,
                                  fontWeight: index == 0 ? 600 : 400,
                                  borderWidth: index == 0 ? 1 : 0,
                                  paddingHorizontal: index == 0 ? 10 : 0,
                                  marginLeft: 10,
                                  backgroundColor:
                                    index == 0
                                      ? Colors.MRSTARTMYDAY
                                      : 'transparent',
                                  color: index == 0 ? 'white' : 'black',
                                }}>
                                {item['x']}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </ScrollView>
                  </View>
                </View>
                <Spacer h={20} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '70%',
                  }}>
                  <Text
                    style={{ fontFamily: FontFamily.TTCommonsMedium, color: 'black' }}>
                    Own total : {fullData.percentage}%
                  </Text>
                  <Text
                    style={{ fontFamily: FontFamily.TTCommonsMedium, color: 'black' }}>
                    Competitors total : {fullData.competitor_percentage}%
                  </Text>
                </View>
              </>
            )}
          </View>

        </View>}
    </>
  );
};

export default RcpaOwnVsCompetitorPie;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 250,
    width: '100%',
    // backgroundColor: 'white',
    // right: 15,
    overflow: 'hidden',
    marginTop: 5,
    borderRadius: 12,
    // borderWidth: 1,
    borderColor: Colors.borderColor1,
  },
});
