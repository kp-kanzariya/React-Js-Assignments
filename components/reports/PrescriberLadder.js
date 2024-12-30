import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Label from '../shared/Label';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import { AlertWarning } from '../shared/alerts/Alert';
import SimmerCampaign from '../../screens/dcr/SimmerCampaign';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import { getMyTerritoty, getSpeciality, getTerritories } from '../../api/commonRepository';
import moment from 'moment';
import { userProfile } from '../../data/userProfile';
import { useSelector } from 'react-redux';
import BrandsDao from '../../Database/DAO/BrandsDao';
import OutletTagsDAO from '../../Database/DAO/OutletTagsDAO';
import FilterDropdown from '../shared/dropdowns/FilterDropdown';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import ReportsDownloadorViewModal from '../shared/modals/ReportsDownloadorViewModal';

const tableHead = [
  'Total Doctors',
  'Non-Rxber',
  '1 Brand Rxber',
  '2 Brands Rxber',
  '3 Brands Rxber',
  '>3 Brands Rxber',
];
const tableTitle = ['Title', 'Title2', 'Title3', 'Title4', 'Title4', 'Title4'];
const tableData = [
  ['200', '100', '30', '60', '30', '13'],
  //   ['', 'November 2022', 'December 2022', 'January 2023'],
  // ['1', '2', '3', '2', '3', '3'],
];


const tableHeadNew = [
  '',
  'Rxber Count',
  'Non-Rxber Count',
  'Rxber Count',
  'Non-Rxber Count',
  'Rxber Count',
  'Non-Rxber Count',
];

const PrescriberLadder = props => {
  const { network } = useSelector(state => state.network);
  const { teamList } = useSelector((state) => state.teamUnderData);
  const navigation = useNavigation()
  const [ladderData, setLadderData] = useState({});
  const [speciality, setSpeciality] = useState([]);
  const [territories, setTerritories] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  // const [selectedTerritory, setSelectedTerritory] = useState('');
  const [monthWiseData, setMonthWiseData] = useState([]);
  const [show, setShow] = useState(false);
  const [monthRow, setMonthRow] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState([]);
  const [position, setPosition] = useState(props?.positionId);
  const [selectedTerr, setSelectedTerr] = useState('');
  const [canShowTerr, setCanShowTerr] = useState(false);
  const [tagId, setTagId] = useState('');
  const [outletTags, setOutletTags] = useState([]);
  const [showFilter1, setShowFilter1] = useState(false);
  const [showFilter2, setShowFilter2] = useState(false);
  const [showFilter3, setShowFilter3] = useState(false);
  const [selectedTerrName, setSelectedTerrName] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [prescriberLadderSelectedObj, setPrescriberLadderSelectedObj] = useState({})
  // alert(showFilter1);first alert(selectedSpeciality)


  const getPrescriberData = async (classifi, territory, tag) => {
    // setShow(false);
    // setCanShowTerr(false);
    // console.log("params", JSON.stringify({ classifi, territory, tag }));
    try {

      // let UserData = await userProfile();
      // console.error(UserData)
      // if (props.showTerr) {
      //   // let myTerr = await getMyTerritoty();
      //   // let mydt = myTerr?.data;
      //   let terr = await getTerritories();
      //   let dt = terr?.data;
      //   let formtdData = Object.keys(dt).reduce((arr, item) => {
      //     arr.push({ label: dt[item], id: parseInt(item) })
      //     return arr;
      //   }, [])
      //   // formtdData.unshift({ id: mydt[0]?.TerritoryId, label: `${mydt[0]?.TerritoryCode} | ${mydt[0]?.TerritoryName} | MYSELF ` })
      //   setTerritories(formtdData);
      // }
      let response;
      if (!props.showTerr) {
        // alert("Hey")
        try {
          if (network) {
            response = await getData({
              url: API.prescriber_ladder,
              params: {
                classification: classifi,
                outlet_tag_id: tag
              },
            });
            // console.log("ladder response are ", response);
          }
        } catch (e) {
          setShow(true);
          console.error("🚀 ~ file: PrescriberLadder.js:113 ~ getPrescriberData ~ e:", e)
          appendTextToFile({
            text: `Error in catch fun getPrescriberData inside PrescriberLadder Line 130 ${e}`,
            headerDate: store?.getState().header.headerDate
          });
          // alert(e)
        }

      } else {
        // let myTerr = await getMyTerritoty();
        // let mydt = myTerr?.data;
        if (network) {
          try {
            response = await getData({
              url: API.prescriber_ladder,
              params: {
                classification: classifi,
                territory_id: territory,
                outlet_tag_id: tag
              },
            });
            setCanShowTerr(true);
            setShowFilter2(true);

          } catch (err) {
            console.log("🚀 ~ file: PrescriberLadder.js:153 ~ getPrescriberData ~ err:", err)

          }
        }
      }

      if (response) {
        if (response.statusCode == 200) {
          setLadderData(response.data);
          let dta = response.data;
          let currentMonthYear = moment().format('MM-YYYY');
          // console.log('firsttttttttt',JSON.stringify(dta))
          //==== total count=====
          // alert(dta.no_raxers)
          let arr = [
            dta.total,
            <TouchableOpacity onPress={() => {
              setPrescriberLadderSelectedObj({
                CameFrom: 'PrescriberLadderRXer',
                prescriberLevel: 'nonrax',
                territoryId: teamList?.length > 0 ? territory : null,
                Moye: currentMonthYear
              })
              setShowModal(!showModal)
            }} >
              <Text style={{ ...styles.text }}>{dta.no_raxers}</Text>
            </TouchableOpacity>,
            <TouchableOpacity onPress={() => {
              setPrescriberLadderSelectedObj({
                CameFrom: 'PrescriberLadderRXer',
                prescriberLevel: '1brandrax',
                territoryId: teamList?.length > 0 ? territory : null,
                Moye: currentMonthYear
              })
              setShowModal(!showModal)
            }} >
              <Text style={{ ...styles.text }}>{dta.one_brand}</Text>
            </TouchableOpacity>,
            <TouchableOpacity onPress={() => {
              setPrescriberLadderSelectedObj({
                CameFrom: 'PrescriberLadderRXer',
                prescriberLevel: '2brandrax',
                territoryId: teamList?.length > 0 ? territory : null,
                Moye: currentMonthYear
              })
              setShowModal(!showModal)
            }} >
              <Text style={{ ...styles.text }}>{dta.two_brand}</Text>
            </TouchableOpacity>,
            <TouchableOpacity onPress={() => {
              setPrescriberLadderSelectedObj({
                CameFrom: 'PrescriberLadderRXer',
                prescriberLevel: '3brandrax',
                territoryId: teamList?.length > 0 ? territory : null,
                Moye: currentMonthYear
              })
              setShowModal(!showModal)
            }} >
              <Text style={{ ...styles.text }}>{dta.three_brand}</Text>
            </TouchableOpacity>,
            <TouchableOpacity onPress={() => {
              setPrescriberLadderSelectedObj({
                CameFrom: 'PrescriberLadderRXer',
                prescriberLevel: 'morethantree',
                territoryId: teamList?.length > 0 ? territory : null,
                Moye: currentMonthYear
              })
              setShowModal(!showModal)
            }} >
              <Text style={{ ...styles.text }}>{dta.more_three_brand}</Text>
            </TouchableOpacity>,
            // dta.no_raxers,
            // dta.one_brand,
            // dta.two_brand,
            // dta.three_brand,
            // dta.more_three_brand,
          ];


          setTotalDataCount(arr);
          // ====end total count=====

          // ====month wise Rexer and non rexers count data formation====

          // let dt = dta?.data
          //   ?.reduce((arr, item, index) => {
          //     console.error('itemm', item);
          //     arr.push(Object.values(item));
          //     return arr;
          //   }, [])
          //   .map(item => {
          //     let lItem = item.pop();
          //     item.unshift(lItem);
          //     return item;
          //   });
          //////////////////////////////////////////////////////////////////////////////////////////////////
          let brandsArray = dta.data
            .reduce((arr, itm, index) => {
              arr.push(
                // [
                //   <View style={{flexDirection:'row',alignItems:'center'}}>
                //   <Text style={{fontFamily:FontFamily.TTCommonsMedium,fontSize:13,color:Colors.black,marginLeft:10}}>
                //   {Object.keys(itm)}
                //   </Text>
                //   <Text style={{fontFamily:FontFamily.TTCommonsMedium,fontSize:11,color:Colors.black,marginLeft:5}}>
                //   {'(0)'}
                //   </Text>
                //   </View>
                
                // ]
                Object.keys(itm)
              );

              arr[index].push(
                Object.values(Object.values(itm)[0]).map(item => {
                  // console.log("item line 265==",item)
                  let a = [
                    // Object.keys(itm),
                    // <TouchableOpacity>
                    //   <Text>{`${Object.keys(itm)}`}</Text>
                    // </TouchableOpacity>,
                    <TouchableOpacity onPress={() => {
                      // navigation.navigate('Webview', {
                      //   URL: API.DvpReport,
                      //   CameFrom: 'PrescriberLadder',
                      //   BrandId: item?.BrandId,
                      //   Moye: item?.month,
                      // });
                      // console.log("Click on number===",item);
                      setPrescriberLadderSelectedObj({
                        CameFrom: 'PrescriberLadder',
                        BrandId: item?.BrandId,
                        Status: 'raxers',
                        Moye: item?.month,
                        territoryId: teamList?.length > 0 ? territory : null,
                      })
                      setShowModal(!showModal)
                    }} >
                      <Text style={{ ...styles.text }}>{item.raxers}</Text>
                    </TouchableOpacity>,
                    <TouchableOpacity onPress={() => {
                      // navigation.navigate('Webview', {
                      //   URL: API.DvpReport,
                      //   CameFrom: 'PrescriberLadder',
                      //   BrandId: item?.BrandId,
                      //   Moye: item?.month,
                      // });
                      setPrescriberLadderSelectedObj({
                        CameFrom: 'PrescriberLadder',
                        BrandId: item?.BrandId,
                        Moye: item?.month,
                        Status: 'non_raxers',
                        territoryId: teamList?.length > 0 ? territory : null,
                      })
                      setShowModal(!showModal)
                    }} >
                      <Text style={{ ...styles.text }}>{item.non_raxers}</Text>
                    </TouchableOpacity>
                  ];
                  return a;
                }),
              );
              return arr;
            }, [])
            .map(item => {
              return item.flat(2);
            });
          setMonthWiseData(brandsArray);
          // ====month wise data formation end ====
          // ?=====month list=== heading
          let mnth = dta?.months?.reduce(
            (arr, item, index) => {
              let it = item?.split('-')?.reverse().join('-');
              arr.push(moment(`${it}-01`).format('MMMM'));
              return arr;
            },
            [''],
          );
          setMonthRow(mnth);
          setShow(true);

        } else {
          AlertWarning(response.message);
          setShow(true);

        }
      } else {
        setMonthRow([]);
        setShow(true);
      }

    } catch (err) {
      setShow(true);
      console.error(
        '🚀 ~ file: PrescriberLadder.js:12 ~ getPrescriberData ~ err:',
        err,
      );
      appendTextToFile({
        text: `Error in catch fun getPrescriberData inside PrescriberLadder Line 232 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  // alert(props?.empId)
  useEffect(() => {
    if (network) {
      if (selectedSpeciality && tagId) {
        getPrescriberData(selectedSpeciality, selectedTerr, tagId);
      }
    } else {
      setShow(true)
    }
  }, [selectedSpeciality, selectedTerr, network, tagId,]);

  const getClassification = async () => {
    setShowFilter2(false);
    try {
      let formattData = await getSpeciality();
      formattData.unshift({ id: 'All', label: 'All Specialities' })
      setSelectedSpeciality(formattData[0].id);
      setSpeciality(formattData);
      setShowFilter2(true);

    } catch (err) {
      console.error("🚀 ~ file: PrescriberLadder.js:228 ~ getClassification ~ err:", err)
      setShowFilter2(false);
    }
  }

  const getTags = async () => {
    // setLoader(true);
    setShowFilter2(false);
    try {
      let res = await OutletTagsDAO.getAllTags();
      let frmtData = res.reduce((arr, item) => {
        arr.push({ id: item.TagName, label: item.TagName })
        return arr
      }, [])
      frmtData.unshift({ id: 'All', label: 'All Tags' })
      setOutletTags(frmtData)
      setTagId(frmtData[0].id);
      setShowFilter2(true);
    } catch (err) {
      console.error("🚀 ~ file: RCPAAudit.js:149 ~ getOutletTags ~ err:", err)
      setShowFilter2(false);
      appendTextToFile({
        text: `Error in catch fun getTags inside PrescriberLadder Line 282 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  const getTerritoriesList = async () => {
    try {
      let terr = await getTerritories();
      // console.log("terrrrr", terr)
      let dt = terr?.data;
      let formtdData = Object.keys(dt).reduce((arr, item) => {
        arr.push({ label: dt[item], id: parseInt(item) })
        return arr;
      }, [])
      setSelectedTerrName(`${formtdData[0]?.label}` || "Select");
      setSelectedTerr(formtdData[0].id);
      // formtdData.unshift({ id: mydt[0]?.TerritoryId, label: `${mydt[0]?.TerritoryCode} | ${mydt[0]?.TerritoryName} | MYSELF ` })
      setTerritories(formtdData);
    } catch (err) {
      appendTextToFile({
        text: `Error in catch fun getTerritoriesList inside PrescriberLadder Line 302 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
      console.log(err);
    }
  }

  useEffect(() => {
    getClassification();
    getTags();
  }, [])

  useEffect(() => {
    if (network) {
      getTerritoriesList()
    }
  }, [network])

  // console.log({ showTerr: props.showTerr, territories, speciality })
  // console.log("outletTags==>> ", outletTags)
  const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
  return (
    <>
      {!show ? (
        <View style={{ marginTop: 10 }} >
          <SimmerCampaign />
        </View>
      ) : (
        <View>
          {/* <View style={{ ...styles.MV5, position: 'relative' }} /> */}
          {network && ((props.showTerr && showFilter2) ?
            <>
              <Label
                Size={14}
                Family={FontFamily.TTCommonsMedium}
                Label={'Prescriber Ladder'}
                // defaultSelected1={`${speciality[0]?.label}`}
                // onValueChange1={item => setSelectedSpeciality(item.id)}
                // lastFilterData={speciality}
                // defaultSelected2={`${territories[0]?.label}`}
                // onValueChange2={item => setSelectedTerr(item.id)}
                // secondLastFilterData={territories}
                // secondLastPosition={110}
                // WIDTHTEXT={'50%'}
                WRAP={'wrap'}
              />
              <>
                {territories && <FilterDropdown right={isMobile ? 0 : 150} topp={isMobile ? 25 : 3} options={territories} defaultSelected={selectedTerrName} onValueChange={(item) => { setSelectedTerr(item.id) }} />}
                <FilterDropdown right={0} topp={3} options={speciality} defaultSelected={`${speciality[0]?.label}`} onValueChange={(item) => { setSelectedSpeciality(item.id) }} />
              </>
            </>
            : showFilter2 ?
              <>
                <Label
                  Size={14}
                  Family={FontFamily.TTCommonsMedium}
                  Label={'Prescriber Ladder'}
                  // defaultSelected1={`${speciality[0]?.label}`}
                  // onValueChange1={item => setSelectedSpeciality(item.id)}
                  // lastFilterData={speciality}
                  // // defaultSelected2={`${outletTags[0]?.label}`}
                  // // onValueChange2={item => setTagId(item.id)}
                  // // secondLastFilterData={outletTags}
                  // secondLastPosition={120}
                  // WIDTHTEXT={'50%'}
                  WRAP={'wrap'}
                />
                <>
                  <FilterDropdown right={0} topp={3} options={speciality} defaultSelected={`${speciality[0]?.label}`} onValueChange={(item) => { setSelectedSpeciality(item.id) }} />
                </>
              </>
              : <></>)}
          {/* {props.showTerr && showFilter2 && <FilterDropdown right={0} topp={30} defaultSelected={`${outletTags[0]?.label}`} options={outletTags} onValueChange={(item) => setTagId(item.id)} />} */}
          <View style={styles.MV3} />
          <View style={{ marginVertical: !isMobile ? 2 : 7 }} />
          <Table
            // borderStyle={{borderWidth: 1, borderColor:'red'}}
            style={{
              // borderWidth: 0.7,
              // borderColor: Colors.borderColor1,
              // borderRadius: 8,
              width: '100%',
              backgroundColor: Colors.white,
            }}>
            <Row
              data={tableHead}
              flexArr={[1, 1, 1, 1, 1, 1]}
              style={{ ...styles.head, borderTopLeftRadius: 8, borderTopRightRadius: 8, }}
              textStyle={styles.BlueHeading}
            />
            <ScrollView
              style={{
                maxHeight: 200,
              }}
              nestedScrollEnabled={true}>
              <Row
                data={totalDataCount}
                flexArr={[1, 1, 1, 1, 1, 1]}
                style={styles.row}
                textStyle={{ ...styles.text, borderWidth: props.borderW, borderColor: props.borderC, padding: props.PADDING }}
              />
            </ScrollView>

            <TableWrapper>
              <Row
                data={monthRow}
                flexArr={[1, 2, 2, 2]}
                style={{ ...styles.head, backgroundColor: 'white' }}
                textStyle={styles.BlueHeading}
              />
              <Row
                data={tableHeadNew}
                flexArr={[1.5,1, 1, 1, 1, 1, 1]}
                style={styles.head}
                textStyle={{ ...styles.BlueHeading, borderWidth: props.borderW, borderColor: props.borderC, padding: props.PADDING }}
              />
              <ScrollView
                style={{
                  maxHeight: 200,
                }}
                nestedScrollEnabled={true}>
                <Rows
                  data={monthWiseData}
                  flexArr={[1.5,1, 1, 1, 1, 1, 1]}
                  style={styles.row}
                  textStyle={{ ...styles.text, borderWidth: props.borderW, borderColor: props.borderC, padding: props.PADDING }}
                />
              </ScrollView>
            </TableWrapper>

          </Table>
          {
            showModal && <ReportsDownloadorViewModal paramsData={prescriberLadderSelectedObj} setOpenModal={setShowModal} openModal={showModal} navigateTo={prescriberLadderSelectedObj?.CameFrom} />}

        </View>
      )}
    </>
  );
};

export default PrescriberLadder;

PrescriberLadder.defaultProps = {
  showTerr: false,
}

const styles = StyleSheet.create({
  MV3: { marginVertical: 3 },
  MV5: { marginVertical: 5 },
  MV8: { marginVertical: 8 },
  MainView: {
    width: '94%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    height: 'auto',
    justifyContent: 'space-between',
  },

  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    overflow: 'hidden',
  },
  img_background: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'relative',
  },

  side_all_text_container: {
    height: '100%',
    padding: 5,
  },
  head: { height: 40, backgroundColor: Colors.MRTABLESHEADINGBG, },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: Colors.white },
  row: { height: 28 },
  text: {
    color: Colors.black,
    textAlign: 'center',
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 10,

  },
  BlueHeading: {
    fontSize: 11,
    color: Colors.MRTableTextHead,
    textAlign: 'center',
    fontFamily: FontFamily.TTCommonsMedium,

  },
});
