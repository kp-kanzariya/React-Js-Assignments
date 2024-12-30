import React, {Component, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import {Colors} from '../../../assets/config/Colors';
import {FontFamily} from '../../../assets/fonts/FontFamily';
import SimmerBasicTable from './SimmerBasicTable';
import NestedTableShimmer from './NestedTableShimmer';
const tableHead = [
  'Total Doctors',
  'Non-Rxers',
  '1 Brand Rxers',
  '2 Brand Rxers',
  '3 Brand Rxers',
  '>3 Brand Rxers',
];
const tableTitle = ['Title', 'Title2', 'Title3', 'Title4', 'Title4', 'Title4'];
const tableData = [
  ['200', '100', '30', '60', '30', '13'],
  ['', 'November 2022', 'December 2022', 'January 2023'],
  // ['1', '2', '3', '2', '3', '3'],
];
const tableDatablue = [['', 'November 2022', 'December 2022', 'January 2023']];

const tableHead1 = [
  'Total Doctors',
  'Non-Rxers',
  '1 Brand Rxers',
  '2 Brand Rxers',
  '3 Brand Rxers',
  '>3 Brand Rxers',
];
const tableTitle1 = ['Title', 'Title2', 'Title3', 'Title4', 'Title4', 'Title4'];
const tableData1 = [
  ['Azithral OS', '100', '130', '160', '310', '113'],
  ['Azithral OL', '100', '130', '160', '310', '113'],
  ['Laveta', '100', '130', '160', '310', '113'],
];

export default function NestedTable(props) {
  const [show, setShow] = React.useState(true);
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setShow(false);
  //   }, 1000);
  // }, []);
  return (
    <>
      <Table
        borderStyle={{borderWidth: 0.7, borderColor: Colors.borderColor1}}
        style={{
          borderWidth: 0.7,
          borderColor: Colors.borderColor1,
          borderRadius: 8,
          overflow: 'hidden',
          width: '100%',
          backgroundColor: Colors.white,
        }}>
        <Row
          data={props.tableHead}
          flexArr={[1, 1, 1, 1, 1, 1]}
          style={styles.head}
          textStyle={styles.BlueHeading}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
            data={props.tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          />

          <Rows
            data={props.tableData}
            flexArr={[1, 1, 1, 1, 1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
        <TableWrapper style={styles.wrapper}>
          <Col
            data={props.tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          />
        </TableWrapper>
        <Row
          data={props.tableHead1}
          flexArr={[1, 1, 1, 1, 1, 1]}
          style={styles.head}
          textStyle={styles.BlueHeading}
        />
        <TableWrapper>
          <Col
            data={props.tableTitle1}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          />

          <Rows
            data={props.tableData1}
            flexArr={[1, 1, 1, 1, 1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    </>
  );
}

NestedTable.defaultProps = {
  tableTitle: false,
  tableHead: tableHead,
  tableData: tableData,
  tableTitle1: false,
  tableHead1: tableHead1,
  tableData1: tableData1,
};
const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: Colors.MRTABLESHEADINGBG},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: Colors.white},
  row: {height: 28},
  text: {
    color: Colors.black,
    textAlign: 'center',
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 9,
  },
  BlueHeading: {
    fontSize: 10,
    color: Colors.MRTableTextHead,
    textAlign: 'center',
    fontFamily: FontFamily.TTCommonsMedium,
  },
});
