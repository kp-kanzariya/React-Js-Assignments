import React, {useRef} from 'react';
import {
  View,
  Button,Text
} from 'react-native';

import { GestureHandlerRootView , gestureHandlerRootHOC} from "react-native-gesture-handler";
import DuoDragDrop , { Word, Lines, Placeholder } from "@jamsch/react-native-duo-drag-drop";

const ExampleWithHoc = gestureHandlerRootHOC(() => (
  <View>
      <Text>Helloooooo</Text>
  </View>
)
)

function App() {
 
  return (    
    <GestureHandlerRootView >
      {/* <ExampleWithHoc/> */}
    <View>
      <Text>Hello</Text>
    </View>

    <View style={{ margin: 20, minHeight: 300 }}>
      <DuoDragDrop 
      words={["Juan", "She", "apples", "today", "with", "eats", "her", "another"]}
     
     

      />
    </View>
  </GestureHandlerRootView>
  );
}

export default App;