import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import StarRating from '../rating/Rating';
import { FontFamily } from '../../assets/fonts/FontFamily';

const StarRatingV = () => {
  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(2);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5, 6,7,8,9,10]);

  // Filled Star. You can also give the path from local
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
            style={{paddingHorizontal:5,}}
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
        <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',left:10,top:2}}>
        <Text style={styles.textStyle}>
          {/* To show the rating selected */}
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
       
        {/* View to hold our Stars */}
        <CustomRatingBar />
        
        
      </View>
    </SafeAreaView>
  );
};

export default StarRatingV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 10,
    justifyContent: 'flex-start',
    // textAlign: 'center',
  },
  titleText: {
    fontSize: 16,
  },
  textStyle: {
    fontSize: 16,
    color: '#000',
    fontFamily:FontFamily.TTCommonsMedium
  },
  customRatingBarStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    
  },
  starImageStyle: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    paddingHorizontal:10,
  },
});