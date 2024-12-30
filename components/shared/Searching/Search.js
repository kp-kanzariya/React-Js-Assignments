import React, {useState} from 'react';
import {
  StatusBar,
  Dimensions,
} from 'react-native';
import SearchHeader from '../Searching/SearchHeader';
import Header from '../header/Header';
const {width} = Dimensions.get('window');

export default function Search(props) {

  return (
    <>
      <SearchHeader />
    </>
  );
}
