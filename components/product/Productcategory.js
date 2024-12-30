import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/config/Colors';
import ShimmerProductCategoryList from '../../screens/material/components/ShimmerProductCategoryList';
const ProductCategory = props => {
  const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    }, []);
  return (
    <>
    {show ? (
           <></>
       ) : (


        <ShimmerProductCategoryList/>

       
)}

   {show && 
   <View style={styles.Container}>
      <Image
        style={styles.img}
        source={require('../../assets/alembicimages/store.png')}
      />
      <Text style={styles.txt}>
        {' '}
        {/* {props.txt} */}Pharmaceutical Formulations
      </Text>
    </View>
}
    </>
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.white,
    width: '50%',
    height: '30%',
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: Colors.lightgrey,
  },

  img: {
    resizeMode: 'contain',
    width: '15%',
    height: '100%',
    marginHorizontal: 20,
  },
  txt: {
    alignSelf: 'center',
    fontSize: 14,
  },
});
