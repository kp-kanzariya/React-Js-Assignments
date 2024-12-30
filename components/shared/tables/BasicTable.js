import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import { Colors } from '../../../assets/config/Colors';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import SimmerCampaign from '../../../screens/dcr/SimmerCampaign';
import { ScrollView } from 'react-native';
import NoData from '../noDataCOmponent/NoData';
// import NoData from '../noDataCOmponent/NoData';
// import NoData from '../noDataCOmponent/NoData';

const tableHead = [
  'Campaign name',
  'Start date',
  'End date',
  'Input',
  'Visit notes',
];
const tableData = [
  ['Diabetes Week', '11 Jan 2023', '21 Jan 2023', 'Chitpad', 'Simple notes'],
  [
    'Eye Health Program',
    '11 Jan 2023',
    '21 Jan 2023',
    'Chitpad',
    'Simple notes',
  ],
  [
    'World No Tobacco Day',
    '11 Jan 2023',
    '21 Jan 2023',
    'Chitpad',
    'Simple notes',
  ],
  ['World AIDS Day', '11 Jan 2023', '21 Jan 2023', 'Chitpad', 'Simple notes'],
];

export default function BasicTable(props) {
  return (
    <>
      <View style={{ width: '100%', }}>
        <Table
          borderStyle={{
            borderColor: Colors.borderColor1,
            borderWidth: 0.5,
            borderRadius: 10,
          }}
          style={{
            // borderWidth: 0.5,
            // borderColor: Colors.borderColor1,
            width: '100%',
            backgroundColor: Colors.white,
            borderRadius: 10,
            // minHeight: 100,
            overflow: 'hidden',
            // height:'100%'

          }}>
            <TouchableOpacity disabled={!props.clickableHeader} onPress={props.onHeaderPress} >
          <Row
            data={props.tableHead}
            flexArr={props.columnRatio}
            style={{ ...styles.head }}
            textStyle={{ ...styles.BlueHeading, paddingVertical: 8, marginHorizontal: props.MH, fontSize: props.LabelText }}
          />
          </TouchableOpacity>
          {props.shimmer ? (
            <SimmerCampaign />
          ) : (
            <ScrollView
              style={{
                maxHeight: props.HT,
                borderRadius: 10,
                overflow: 'hidden',
              }}
              nestedScrollEnabled={true}>
              {props?.tableData?.length > 0 ? <TableWrapper style={styles.wrapper}>
                <Col
                  data={props.tableTitle}
                  style={styles.title}
                  heightArr={[28, 28]}
                  textStyle={styles.text}
                />
                <Rows
                  data={props.tableData}
                  flexArr={props.columnRatio}
                  style={{
                    borderBottomColor: props.RowBorderColor,
                    borderBottomWidth: props.RowBorderWidth,
                  }}
                  textStyle={{ ...styles.text, paddingVertical: 10, fontSize: props.LabelText1 }}
                />
              </TableWrapper> : <View style={{ justifyContent: 'center', alignItems: "center", height: props.noDataHeight }} ><NoData /></View>}
            </ScrollView>
          )}
        </Table>
      </View>
    </>
  )
}

BasicTable.defaultProps = {
  tableTitle: false,
  tableHead: tableHead,
  tableData: tableData,
  RowBorderWidth: 0.5,
  TableBorderColor: Colors.borderColor,
  TableBorderWidth: 0,
  shimmer: false,
  columnRatio: [1, 1, 1, 1, 1, 1],
  height: 'auto',
  noDataHeight: 200,
  LabelText: 12,
  MH: 15,
  LabelText1: 12,
  maxHeight: 200,
  clickableHeader:false,
  onHeaderPress:()=>{}
};

const styles = StyleSheet.create({
  head: {
    height: 'auto',
    backgroundColor: Colors.MRTABLESHEADINGBG,
    // paddingVertical: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10

  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: Colors.white },
  row: { height: 'auto', textAlign: 'center' },
  text: {
    color: Colors.black,
    // textAlign: 'center',
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 12,
    paddingVertical: 5,
    marginHorizontal: 15
  },
  BlueHeading: {
    fontSize: 13,
    color: Colors.MRTableTextHead,
    // textAlign: 'center',
    fontFamily: FontFamily.TTCommonsMedium,
    paddingVertical: 5,
    marginHorizontal: 15
  },
  TableMainView: {
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Colors.white,
    // height:220
    // flex:1

  },
  BorderStyles: { borderWidth: 0.5, borderColor: Colors.borderColor },
});
