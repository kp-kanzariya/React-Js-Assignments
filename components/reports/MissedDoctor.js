import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import BasicTable from '../shared/tables/BasicTable';
import Label from '../shared/Label';
import { getData } from '../../api/Request';
import { API } from '../../api/API';
import moment from 'moment';
import { Colors } from '../../assets/config/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { getTerritories } from '../../api/commonRepository';
import FilterDropdown from '../shared/dropdowns/FilterDropdown';
import { useSelector } from 'react-redux';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';

const MissedDoctor = props => {
  const { isMobile } = useSelector(state => state.isLandscape);

  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [territories, setTerritories] = useState('');
  const [selectedTerr, setSelectedTerr] = useState('');
  const [show, setShow] = useState(false);
  //   let tableHead=['Name','Apr','Mar','Feb']

  const getMissedOutlets = async (terr) => {
    try {
      let response;
      if (props.showTerr) {
        let terri = await getTerritories();
        let dt = terri?.data;
        let formtdData = Object.keys(dt).reduce((arr, item) => {
          arr.push({ label: dt[item], id: parseInt(item) })
          return arr;
        }, [])
        // formtdData.unshift({ id: mydt[0]?.TerritoryId, label: `${mydt[0]?.TerritoryCode} | ${mydt[0]?.TerritoryName} | MYSELF ` })
        setTerritories(formtdData);
        setShow(true);
        response = await getData({
          url: API.getMissedOutlets,
          params: { territory_id: terr == '' ? formtdData[0].id : terr },
        });
      } else {
        response = await getData({
          url: API.getMissedOutlets,
        });
      }
      if (response.statusCode === 200) {
        // console.log("response of missed doctor", response)
        let data = Object.values(response.data);
        let tHead = [
          'Customer Name',
          data[0]?moment(`${data[0]?.Moye3?.split('-')?.reverse()?.join('-')}-01`)?.format('MMM'):'--',
          data[0]?moment(`${data[0]?.Moye2?.split('-')?.reverse()?.join('-')}-01`)?.format('MMM'):'--',
          data[0]?moment(`${data[0]?.Moye1?.split('-')?.reverse()?.join('-')}-01`)?.format('MMM'):'--',
        ];
        setTableHead(tHead);
        let formatted_data = data.reduce((arr, item) => {
          arr.push([
            item.Name,
            <Text style={{ marginLeft: 10 }} >{item.Visited3 == false ? <Entypo name='cross' size={18} color={'red'} /> : <Entypo name='check' size={18} color={'green'} />}</Text>,
            <Text style={{ marginLeft: 10 }} >{item.Visited2 == false ? <Entypo name='cross' size={18} color={'red'} /> : <Entypo name='check' size={18} color={'green'} />}</Text>,
            <Text style={{ marginLeft: 10 }} >{item.Visited1 == false ? <Entypo name='cross' size={18} color={'red'} /> : <Entypo name='check' size={18} color={'green'} />}</Text>,
          ]);
          return arr;
        }, []);
        setData(formatted_data);
      }
    } catch (err) {
      console.error(
        '🚀 ~ file: MissedDoctor.js:13 ~ getMissedOutlets ~ err:',
        err,
      );
      appendTextToFile({
        text: `Error in catch fun getMissedOutlets inside MissedDoctor Line 74 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
    }
  };

  useEffect(() => {
    getMissedOutlets(selectedTerr);
  }, [selectedTerr]);

  // console.log("props.checkReplacement('MissedOutlets','title')",props.checkReplacement('MissedOutlets','title'))

  return (
    <View>
      <View style={{ marginVertical: 5 }} />
      {props.showTerr ?
        <>
          <Label
            Size={14}
            Label={props.checkReplacement('MissedOutlets','title')||'Consecutive Missed Doctors'}
            // defaultSelected1={`${territories[0]?.label}`}
            // onValueChange1={item => setSelectedTerr(item.id)}
            // lastFilterData={territories}
            WRAP={'wrap'}
            WIDTHTEXT={'60%'}
          />
          {show && <>
            <FilterDropdown right={0} topp={isMobile ? 28 : 10} options={territories} defaultSelected={`${territories[0]?.label}`} onValueChange={(item) => setSelectedTerr(item.id)} />
          </>}
        </>
        : <Label WRAP={'wrap'}
          // WIDTHTEXT={'40%'} 
          TOP={-2} 
          Label={props.checkReplacement('MissedOutlets','title')||'Consecutive Missed Doctors'}
          />
          }

      <View style={{ marginVertical: 3 }} />
      <BasicTable HT={220} tableHead={tableHead} tableData={data} RowBorderWidth={1} RowBorderColor={Colors.borderColor1} />
    </View>
  );
};

export default MissedDoctor;
MissedDoctor.defaultProps = {
  showTerr: false
}

const styles = StyleSheet.create({});
