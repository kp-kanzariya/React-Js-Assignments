import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import DonutChart from '../shared/Charts/dount_chart/DonutChart';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Label from '../shared/Label';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { getTerritories } from '../../api/commonRepository';
import BrandsDao from '../../Database/DAO/BrandsDao';
import FilterDropdown from '../shared/dropdowns/FilterDropdown';
import NoData from '../shared/noDataCOmponent/NoData';
import Spacer from '../shared/spacers/Spacer';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';

const RCPABifurcation = props => {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);

  const [rcpaBifurcation, setRCPABifurcation] = React.useState('');
  const [show, setShow] = useState(true);
  const [colorArray, setColorArray] = useState([]);
  const [valueData, setValueData] = useState([]);
  const [rexerData, setRexerData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MM-YYYY'));
  const [selectedTerr, setSelectedTerr] = useState('');
  const [territories, setTerritories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [showClass, setShowClass] = useState(false);
  const [showT, setShowT] = useState(false);


  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  function reformatPropData(rcpaBifurcation, colorArray) {
    let formattedData = rcpaBifurcation?.rcpa_classification?.map(
      (item, index) => {
        return { name: item.name, y: parseInt(item.percentage), color: colorArray[index] };
      },
    );
    return formattedData;
  }

  function reformatPropDataSecond(rcpaBifurcation, colorArray) {
    let formattedData = rcpaBifurcation?.rcpa_prescribers_classification?.map(
      (item, index) => {
        return { name: item.name, y: parseInt(item.percentage), color: colorArray[index] };
      },
    );
    return formattedData;
  }

  // ======/==========

  const getRCPABifurcation = async (moYe, selectedTerr, brandId) => {
    // setShow(true);
    try {
      let response;
      if (props.showTerr) {
        let terr = await getTerritories();
        let dt = terr?.data;
        let formtdData = Object.keys(dt).reduce((arr, item) => {
          arr.push({ label: dt[item], id: parseInt(item) })
          return arr;
        }, [])
        setTerritories(formtdData);
        setShowT(true);
        response = await getData({
          url: API.rcpa_bifurcation,
          params: { moye: moYe, ter_id: selectedTerr == '' ? formtdData[0].id : selectedTerr, brand_id: brandId },
        });
      } else {
        response = await getData({
          url: API.rcpa_bifurcation,
          params: { moye: moYe, brand_id: brandId },
        });
        // console.log("response====== BIfurcation...113", response)
      }
      if (response.statusCode == 200) {
        // console.log("response====== BIfurcation...91",JSON.stringify(response))
        setRCPABifurcation(response.data);
        let colorArr = response.data.rcpa_classification.reduce((arr, item) => {
          arr.push(generateColor());
          return arr;
        }, []);

        setColorArray(colorArr);
        let rcpaValueWise = reformatPropData(response.data, colorArr);
        // alert(JSON.stringify(rcpaValueWise));
        setValueData(rcpaValueWise)
        let rcpaPresWise = reformatPropDataSecond(response.data, colorArr);
        setRexerData(rcpaPresWise)
      } else {
        return null;
      }
      // setTimeout(() => {
      //   setShow(false);
      // }, 1000);
    } catch (err) {
      appendTextToFile({
        text: `Error in catch fun getRCPABifucation inside RCPABifurcation Line 119 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
      console.error('errrr', err);
    }
    setShow(false);
  };

  const getBrands = async () => {
    // setLoader(true);
    try {
      const dt = await BrandsDao.getAllBrandsForFilter('All');
      setBrandId(dt[0]?.id);
      setBrands(dt);
      setShowClass(true);
    } catch (err) {
      appendTextToFile({
        text: `Error in catch fun getBrands inside RCPABifurcation Line 143 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
      console.error("🚀 ~ file: RCPABifurcation.js:129 ~ getBrands ~ err:", err)
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    if (selectedMonth && brandId) {
      getRCPABifurcation(selectedMonth, selectedTerr, brandId);
    }
  }, [selectedMonth, selectedTerr, brandId]);
  // ================
  // alert(show)
  const ShimmerBifurcation = () => {
    return (
      <View
        style={{
          // flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 12,
          borderColor: Colors.borderColor1,
          paddingVertical: 20,
        }}>
        <SkeletonPlaceholder speed={1000}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{}}>
              <View style={{ height: 150, width: 150, borderRadius: 100 }} />
            </View>
            {/* <View style={{width:100}} /> */}
            <View style={{}}>
              <View style={{ height: 150, width: 150, borderRadius: 100 }} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ height: 10, width: 100 }} />
              <View style={{ height: 10, width: 150, marginTop: 10 }} />
            </View>
            {/* <View style={{width:100}} /> */}
            <View style={{ alignItems: 'center' }}>
              <View style={{ height: 10, width: 100 }} />
              <View style={{ height: 10, width: 150, marginTop: 10 }} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  };

  // alert(isLandscape)
  return (
    <>
      <View style={{ marginVertical: 5 }} />
      {(!show && props.showTerr) ?
        <>
          <Label
            Size={14}
            Family={FontFamily.TTCommonsMedium}
            Label={'RCPA Bifurcation By Outlet Speciality'}
          // defaultSelected1={moment().format('MMMM')}
          // lastFilterData={[
          //   { label: moment().format('MMMM'), id: moment().format('MM-YYYY') },
          //   { label: moment().subtract(1, 'month').format('MMMM'), id: moment().subtract(1, 'month').format('MM-YYYY') },
          //   { label: moment().subtract(2, 'month').format('MMMM'), id: moment().subtract(2, 'month').format('MM-YYYY') },
          // ]}
          // onValueChange1={item => setSelectedMonth(item.id)}
          // defaultSelected2={`${territories[0]?.label}`}
          // onValueChange2={item => setSelectedTerr(item.id)}
          // secondLastFilterData={territories}
          // secondLastPosition={100}
          // WRAP={'wrap'}
          // WIDTHTEXT={'33%'}
          />
          <>
            {showT && <FilterDropdown right={isMobile ? 0 : 115} topp={isMobile ? 27 : 10}
              options={territories}
              defaultSelected={`${territories[0]?.label}`}
              onValueChange={(item) => setSelectedTerr(item.id)}
            />}
            <FilterDropdown right={0} topp={isMobile ? 0 : 10}
              options={[
                { label: moment().format('MMMM'), id: moment().format('MM-YYYY') },
                { label: moment().subtract(1, 'month').format('MMMM'), id: moment().subtract(1, 'month').format('MM-YYYY') },
                { label: moment().subtract(2, 'month').format('MMMM'), id: moment().subtract(2, 'month').format('MM-YYYY') },
              ]}
              defaultSelected={moment().format('MMMM')}
              onValueChange={(item) => setSelectedMonth(item.id)}
            />
          </>
        </>
        :
        <Label
          Size={14}
          Family={FontFamily.TTCommonsMedium}
          Label={'RCPA Bifurcation By Outlet Speciality'}
          defaultSelected1={moment().format('MMMM')}
          lastFilterData={[
            { label: moment().format('MMMM'), id: moment().format('MM-YYYY') },
            { label: moment().subtract(1, 'month').format('MMMM'), id: moment().subtract(1, 'month').format('MM-YYYY') },
            { label: moment().subtract(2, 'month').format('MMMM'), id: moment().subtract(2, 'month').format('MM-YYYY') },
          ]}
          onValueChange1={item => setSelectedMonth(item.id)}
        />
      }
      <View style={{ marginVertical: 5 }} />
      {!show ? (
        <>
          {isMobile && <Spacer h={15} />}
          <View style={{ ...styles.container, position: 'relative' }}>
            {showClass && <FilterDropdown onValueChange={(item) => setBrandId(item.id)} defaultSelected={brands[0]?.label} right={10} topp={5} options={brands} />}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '94%',
              }}>
              {valueData.length > 0 ? (
                <View
                  style={{ position: 'relative', top: isLandscape ? -20 : -12, left: isMobile ? 60 : 35 }}>
                  <DonutChart
                    data={valueData}
                    size={isLandscape ? 260 : 240}
                    percent={'%'}
                    valuePosition={3}
                  />
                  <View style={{ ...styles.RCPATextView }}>
                    <Text style={{ ...styles.text_Css }}>
                      RCPA own value wise
                    </Text>
                    <Text style={{ ...styles.text_Css }}>
                      <FAIcon name="rupee" />
                      {' '} {rcpaBifurcation?.rcpa_total.toFixed('2')}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
                  <NoData width={100} />
                </View>
              )}
              {rexerData.length > 0 ? (
                <View
                  style={{ position: 'relative', top: isLandscape ? -20 : -10, right: isMobile ? 60 : 35 }}>
                  <DonutChart
                    data={rexerData}
                    size={isLandscape ? 260 : 240}
                    percent={'%'}
                    valuePosition={3}

                  />
                  <View style={{ ...styles.RCPATextView }}>
                    <Text style={{ ...styles.text_Css }}>
                      Total Prescribers(Rexers)
                    </Text>
                    <Text style={{ ...styles.text_Css }}>
                      {rcpaBifurcation.total_prescribers}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text></Text>
                </View>
              )}
              {/* <DonutChart /> */}
            </View>
            {/* <View style={{}} > */}
            <View
              style={{
                ...styles.ViewContainer,
              }}>
              {rcpaBifurcation?.rcpa_classification?.map((i, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      ...styles.styleCss,
                    }}>
                    <View
                      style={{
                        ...styles.labelCss,
                        // backgroundColor: i.color,
                        backgroundColor: colorArray[index],
                      }}></View>
                    <Text
                      style={{
                        ...styles.labelTextCss,
                      }}>
                      {i.name}
                      {/* {i.y} */}
                    </Text>
                  </View>
                );
              })}
            </View>
            {/* </View> */}
          </View>
        </>
      ) : (
        <ShimmerBifurcation />
      )}
    </>
  );
};

export default RCPABifurcation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.borderColor1,
  },
  RCPATextView: {
    alignItems: 'center',
    position: 'relative',
    top: -30,
  },
  text_Css: {
    fontSize: FontSize.labelText2,
    color: 'black',
    fontFamily: FontFamily.TTCommonsMedium,
  },
  ViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    bottom: 15,
    width: '90%',
    // backgroundColor:'red',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  styleCss: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelCss: {
    height: 15,
    width: 15,
    borderRadius: 20,
  },
  labelTextCss: {
    marginLeft: 5,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText2,
    color: Colors.black,
  },
});
