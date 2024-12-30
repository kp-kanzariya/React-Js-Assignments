import { StyleSheet, Text, View, } from 'react-native';
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { Colors } from '../../assets/config/Colors';
import FilterDropdown from '../shared/dropdowns/FilterDropdown';
import Label from '../shared/Label';
import { FontFamily } from '../../assets/fonts/FontFamily';
import moment from 'moment';
import { getSgpiTypes, handleFilterOfMonthName } from '../../api/commonRepository';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import { AlertWarning } from '../shared/alerts/Alert';
import Spacer from '../shared/spacers/Spacer';
import BrandsDao from '../../Database/DAO/BrandsDao';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';
import useGetSGPIDistribution from '../../data/useGetSGPIDistribution';
import AttendanceReportShimmer from './AttendanceReportShimmer';

const InputConsistencyReport = (props) => {
  const [moYe, setMoYe] = useState(moment().format('MM-YYYY'));
  const [show, setShow] = useState(false);
  // const [inputsData, setInputsData] = useState({});
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [sgpiTypes, setSgpiTypes] = useState([]);
  const [selectedSgpi, setSelectedSgpi] = useState('');
  const [show1, setShow1] = useState(false);
  const { inputsData, loading } = useGetSGPIDistribution(moYe, brandId, props.positionId, selectedSgpi);
  console.log("input ===== 30",inputsData)

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
      console.error("🚀 ~ file: InputConsistencyReport.js:45 ~ handleFilter ~ err:", err)
      appendTextToFile({
        text: `Error in catch fun handleFilter inside InputConsistencyReport Line 58 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  const getBrands = async () => {
    try {
      const dt = await BrandsDao.getAllBrandsForFilter('All')
      setBrandId(dt[0].id);
      setBrands(dt);
      setShow(true);
    } catch (err) {
      console.error("🚀 ~ file: InputConsistencyReport.js:73 ~ getBrands ~ err:", err)
      appendTextToFile({
        text: `Error in catch fun getbrands inside InputConsistencyReport Line 86 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  useEffect(() => {
    getBrands();
  }, [])

  useEffect(() => {
    getSgpis()
  }, [])


  const getSgpis = async () => {
    try {
      const res = await getSgpiTypes();
      setSgpiTypes(res);
      setShow1(true);
      setSelectedSgpi(res[0]?.id);
    } catch (err) {
      console.log("🚀 ~ file: InputConsistencyReport.js:84 ~ getSgpis ~ err:", err)
      setShow1(false);
      appendTextToFile({
        text: `Error in catch fun getSgpis inside InputConsistencyReport Line 126 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  }


  // const getSgpiInputs = async (brId, sgpiType) => {
  //   try {
  //     let params = { moye: moYe, brand_id: brId, position_id: props?.positionId, sgpi_type: sgpiType }
  //     const response = await getData({ url: API.getSgpiDistribution, params: params });
  //     if (response.statusCode === 200) {
  //       setInputsData(response.data)
  //     } else {
  //       AlertWarning(response.message);
  //       setInputsData([]);
  //     }
  //   } catch (err) {
  //     console.error("🚀 ~ file: InputConsistencyReport.js:117 ~ getSgpiInputs ~ err:", err)
  //     appendTextToFile({
  //       text: `Error in catch fun getSgpiInputs inside InputConsistencyReport Line 58 ${err}`,
  //       headerDate: store?.getState().header.headerDate
  //     });
  //   }
  // }

  // useEffect(() => {
  //   if (props.positionId && selectedSgpi && brandId) {
  //     getSgpiInputs(brandId, selectedSgpi)
  //   }
  // }, [moYe, brandId, props.positionId, selectedSgpi])

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  // alert(show)



  return (
    <>
      <Spacer h={10} />
      {show &&
        <>
          <Label
            Label="SGPI Compliance in (%)"
          // WIDTHTEXT={'35%'}
          // lastFilterData={[
          //   { label: moment().format('MMMM'), id: 0 },
          //   { label: moment().subtract(1, 'month').format('MMMM'), id: 1 },
          //   { label: moment().subtract(2, 'months').format('MMMM'), id: 2 },
          // ]}
          // secondLastPosition={100}
          // defaultSelected1={moment().format('MMMM')}
          // onValueChange1={item => handleFilter(item.id)}
          // secondLastFilterData={brands}
          // defaultSelected2={`${brands[0]?.label}`}
          // onValueChange2={item => setBrandId(item.id)}
          />

          <FilterDropdown right={0} topp={12} options={
            [
              { label: moment().format('MMMM'), id: 0 },
              { label: moment().subtract(1, 'month').format('MMMM'), id: 1 },
              { label: moment().subtract(2, 'months').format('MMMM'), id: 2 },
            ]
          } defaultSelected={moment().format('MMMM')} onValueChange={(item) => { handleFilter(item.id) }} />
        </>
      }
      <Spacer />
      <View
        style={{
          ...styles.mainContainer,
          position: 'relative',
          zIndex: -1
        }}
      >
        {show && <FilterDropdown left={5} topp={5} options={brands} defaultSelected={brands[0]?.label} onValueChange={(item) => { setBrandId(item.id) }} />}
        {show1 && <FilterDropdown onValueChange={(itm) => setSelectedSgpi(itm.id)} defaultSelected={sgpiTypes[0]?.id} options={sgpiTypes} right={5} topp={5} />}
        {!loading ? <>
          <View style={{ paddingVertical: 10 }} />
          <ProgressBar perIcon size={90} fillPercent={parseFloat(inputsData?.Percentage)} percentage={inputsData?.Percentage} fontSize={25} color={generateColor()} />
          <View style={{ paddingVertical: 10 }} />
          <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between' }} >
            <Text style={{ fontFamily: FontFamily.TTCommonsDemiBold, color: 'black', fontSize: 13 }}>Outlets Tagged : {inputsData?.Credit}</Text>
            <Text style={{ fontFamily: FontFamily.TTCommonsDemiBold, color: 'black', fontSize: 13 }}>Compliant Outlets : {inputsData?.Debit}</Text>
            <Text style={{ fontFamily: FontFamily.TTCommonsDemiBold, color: 'black', fontSize: 13 }}>Leaks : {inputsData?.Leaks ?? 0}</Text>
          </View>
          <View style={{ paddingVertical: 10 }} />
        </> : <AttendanceReportShimmer borderWidth={0} size={180} />}
      </View>
    </>

  );
};

export default InputConsistencyReport;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    // padding: 20,
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    alignItems: 'center',
    // position: 'relative',
    backgroundColor: Colors.white,
    flex: 1,
  },
});