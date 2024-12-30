import {View, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import SearchInput from '../../../components/shared/Searching/SearchBarComponent';
import {Colors} from '../../../assets/config/Colors';
import outletViewDao from '../../../Database/DAO/outletViewDao';
import {SearchingFLList} from './SearchingFLList';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../header/Header';
import SubHeader from '../header/SubHeader';

const {width, height} = Dimensions.get('window');

const SearchHeader = props => {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchAllData, setSearchAllData] = React.useState([]);
  const [showResultFound, setShowResultFound] = React.useState(false);
  const dispatch = useDispatch();
  const {isLandscape, isMobile} = useSelector(state => state.isLandscape);
  const fetchSearchedData = async () => {
    if (searchValue != '') {
      let res = await outletViewDao.searchOutlet(searchValue);
      setSearchAllData(res);
    } else {
      setSearchAllData([]);
    }
  };

  React.useEffect(() => {
    fetchSearchedData();
  }, [searchValue]);

  return (
    <>
      <Header />
      <SubHeader
        bgsub={Colors.MRSUBHEADERGREY}
        name="Search"
        onPress={() => {
          props.navigation.goBack();
          dispatch({
            type: 'SearchHeader',
          });
        }}
      />
      {/* <View style={styles.SearchSecondView} /> */}
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        {/* <View style={{ marginVertical: 5 }} /> */}
        <SearchInput
          LeftIcon="search"
          RightMicIcon="mic"
          RightCloseIcon="close"
          placeholder="Search"
          lefticoncolor={Colors.black}
          placetextcolor={Colors.black}
          TOPS={2}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <View style={{marginTop: 5}} />
        {/* <View> */}
        <SearchingFLList searchedData={searchAllData} />
        {/* </View> */}
      </View>
    </>
  );
};
export default SearchHeader;
const styles = StyleSheet.create({
  SearchSecondView: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    marginVertical: 20,
  },
});
