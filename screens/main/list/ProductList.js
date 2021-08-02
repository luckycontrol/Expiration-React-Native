import React, { useRef, useState } from 'react'
import { 
  TouchableOpacity,
  Image, 
  SafeAreaView,
  View,
  Text,
  Animated,
  ScrollView
} from 'react-native'
import { useSelector } from "react-redux"

const ProductList = ({ navigation, menu, scaleValue, offsetValue, ScaleTransitionEffect }) => {

  const selectedCategory = useSelector((state) => state.category.value);

  return (
      <Animated.View
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#f5f5f5",
            transform: [
                { scale: scaleValue, translateX: offsetValue }
            ],
            borderRadius: menu ? 15 : 0
        }}
      >
          <SafeAreaView>
              <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 30,
                    marginTop: menu ? 30 : 0
                }}
              >
                  <TouchableOpacity
                    onPress={ScaleTransitionEffect}
                  >
                      <Image source={require("../../../assets/menu.png")} style={{ width: 25, height: 25 }} />
                  </TouchableOpacity>

                  <Text style={{ fontSize: 24, fontWeight: "500" }}>{selectedCategory}</Text>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Add")}
                  >
                      <Image source={require("../../../assets/plus.png")} style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
              </View>
              <ScrollView
                style={{
                    height: "100%",
                    margin: 30
                }}
              >
                  <Text>asdf</Text>
              </ScrollView>
          </SafeAreaView>
      </Animated.View>
  )
}

export default ProductList
