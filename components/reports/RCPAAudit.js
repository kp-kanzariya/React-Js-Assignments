import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Label from '../shared/Label';
import { Colors } from '../../assets/config/Colors';
import BarWithLineChart from '../shared/Charts/BarChart/BarWithLineChart';
import BrandsDao from '../../Database/DAO/BrandsDao';
import moment from 'moment';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import RcpaAuditShimmer from './RcpaAuditShimmer';
import Spacer from '../shared/spacers/Spacer';
import { getSpeciality } from '../../api/commonRepository';
import FilterDropdown from '../shared/dropdowns/FilterDropdown';
import OutletTagsDAO from '../../Database/DAO/OutletTagsDAO';
import NoData from '../shared/noDataCOmponent/NoData';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';



const RCPAAudit = props => {
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);

  const [fromDate, setFromDate] = useState(
    moment()
      .subtract(2, 'month')
      .startOf('month')
      .format('YYYY-MM-DD'),
  );
  const [toDate, setToDate] = useState(
    moment().endOf('month').format('YYYY-MM-DD'),
  );
  const [brandId, setBrandId] = useState('');
  const [classificationId, setClassificationId] = useState('')
  const [getLength, setLength] = useState('');
  const [brands, setBrands] = useState([]);
  const [show, setShow] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [showClass1, setShowClass1] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [classifications, setClassifications] = useState([]);
  const [tagId, setTagId] = useState('');
  const [outletTags, setOutletTags] = useState([]);


  const changeFilter = (item) => {
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
        .subtract(5, 'month')
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
    } else if (item.label == 'Quarterly') {
      let fDate = moment()
        .subtract(2, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
      let tDate = moment().endOf('month').format('YYYY-MM-DD');
      setFromDate(fDate);
      setToDate(tDate);
    }
  };

  const getBrands = async () => {
    try {
      const dt = await BrandsDao.getAllBrandsForFilter('All');
      setBrandId(dt[0].id);
      setBrands(dt);
      setShow(true);
    } catch (err) {
      console.error('err----->>>>>>:', err);
      appendTextToFile({
        text: `Error in catch fun getBrands inside RCPAAudit Line 111 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  const getRCPAChemistPrescriptionAuditData = async (
    startDate,
    endDate,
    empId,
    brandId,
    classificationId,
    tagId
  ) => {
    try {
      if (startDate == '' || endDate == '' || brandId == '' || empId == '') {
      } else {
        let params = {
          start_date: startDate,
          end_date: endDate,
          employee_id: empId,
          brand_id: brandId,
          classification: classificationId,
          outlet_tag_id: tagId
        };
        const response = await getData({
          url: API.rcpa_chemist_prescription_audit,
          params: params,
        });

        if (response.statusCode == 200) {
          console.log("rcpa_chemist_prescription_audit response.data) Line 135 --->",response.data);
          setData(response.data);
          setLength(response?.data?.own.length);
          setLoader(false)
        } else {
          setData([]);
          setLength(0);
          setLoader(false)
        }
      }
    } catch (err) {
      setLoader(false);
      setData([]);
      setLength(0);
      console.error('err------>>>>>:', err);
      appendTextToFile({
        text: `Error in catch fun getRCPAChemistPrescriptionAuditData inside RCPAAudit Line 160 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  const getClassifi = async () => {
    try {
      const res = await getSpeciality();
      res.unshift({ id: 'All', label: 'All Specialities' })

      setClassificationId(res[0].id);
      setClassifications(res)
      setShowClass(true);
    } catch (err) {
      console.log("🚀 ~ file: RCPAAudit.js:127 ~ getClassifi ~ err:", err)
      appendTextToFile({
        text: `Error in catch fun getClassifi inside RCPAAudit Line 177 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  }

  const getOutletTags = async () => {
    try {
      let res = await OutletTagsDAO.getAllTags();
      let frmtData = res.reduce((arr, item) => {
        arr.push({ id: item.TagName, label: item.TagName })
        return arr
      }, [])
      frmtData.unshift({ id: 'All', label: 'All Tags' })
      setTagId(frmtData[0].id);
      setOutletTags(frmtData);
      setShowClass1(true);
    } catch (err) {
      appendTextToFile({
        text: `Error in catch fun getOutletTags inside RCPAAudit Line 196 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
      console.log("🚀 ~ file: RCPAAudit.js:149 ~ getOutletTags ~ err:", err)
    }
  }

  React.useEffect(() => {
    getBrands();
    getClassifi();
    getOutletTags();
  }, []);

  React.useEffect(() => {
    if (fromDate && toDate && props.empId && brandId, classificationId, tagId) {
      getRCPAChemistPrescriptionAuditData(
        fromDate,
        toDate,
        props?.empId,
        brandId,
        classificationId,
        tagId
      );
    }
  }, [fromDate, toDate, props?.empId, brandId, classificationId, tagId]);

  function reformatDataFirst() {
    let formattedData = data.competitiors?.map((item, index) => {
      return { x: item.month, y: parseFloat(item.competitiors) };
    });
    return formattedData;
  }

  function reformatDataSecond() {
    let formattedData = data.prescribers?.map((item, index) => {
      return { x: item.month, y: parseFloat(item.prescribers) };
    });
    return formattedData;
  }

  function reformatDataThird() {
    let formattedData = data.own?.map((item, index) => {
      return { x: item.month, y: parseFloat(item.own) };
    });
    return formattedData;
  }

  return (
    <>
      <Spacer />
      {show && (
        <>
          <Label
            Label="RCPA - Retail Chemist Prescription Audit"
            WRAP={'wrap'}
            WIDTHTEXT={'60%'}
          // defaultSelected1={'Quarterly'}
          // lastFilterData={[
          //   { label: 'Current Month', id: 1 },
          //   // { label: 'Fortnight', id: 2 },
          //   { label: 'Last Month', id: 3 },
          //   { label: 'Quarterly', id: 2 },
          //   { label: 'Half Yearly', id: 4 },
          //   { label: 'Yearly', id: 5 },
          // ]}
          // onValueChange1={item => changeFilter(item)}
          // secondLastFilterData={brands}
          // secondLastPosition={110}
          // defaultSelected2={brands[0]?.label}
          // onValueChange2={item => setBrandId(item.id)}
          />
          <>
            {/* <FilterDropdown right={isMobile ? 0 : 140} topp={isMobile ? 32 : 10} options={brands} defaultSelected={brands[0]?.label} onValueChange={(item) => { setBrandId(item.id) }} /> */}
            <FilterDropdown right={0} topp={10} options={
              [
                { label: 'Current Month', id: 1 },
                // { label: 'Fortnight', id: 2 },
                { label: 'Last Month', id: 3 },
                { label: 'Quarterly', id: 2 },
                { label: 'Half Yearly', id: 4 },
                { label: 'Yearly', id: 5 },
              ]
            } defaultSelected={'Quarterly'} onValueChange={(item) => { changeFilter(item) }} />
          </>
        </>
      )}
      <Spacer />
      {loader ? <RcpaAuditShimmer />
        :
        <View
          style={{ ...styles.container, }}>
          {showClass && <FilterDropdown onValueChange={(item) => setClassificationId(item.id)} defaultSelected={'All Specialities'} right={5} topp={5} options={classifications} />}
          {
            show &&
            <FilterDropdown left={5} topp={5} options={brands} defaultSelected={brands[0]?.label} onValueChange={(item) => { setBrandId(item.id) }} />
          }
          <View style={{ width: isLandscape ? 450 : 320 }}>
            {getLength > 0 ? (
              <BarWithLineChart
                width={450}
                TOPBOTTOMITEM={-15}
                data={reformatDataFirst()}
                data1={reformatDataSecond()}
                data2={reformatDataThird()}
                getLength={getLength}
                secondbarColor={Colors.MRSTARTMYDAY}
              />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: '100%',

                }}>
                <NoData />
              </View>
            )}
          </View>
        </View>}
    </>
  );
};

export default RCPAAudit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    height: 200,
    overflow: 'hidden'
  },
});
