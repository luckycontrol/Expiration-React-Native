import React from 'react'
import { Pressable } from 'react-native';
import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import tw from "tailwind-react-native-classnames";
import ListCard from './ListCard';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

const ProductList = () => {
    return (
        <SafeAreaView style={tw`bg-gray-100`}>
            <View style={tw`flex-row items-center justify-around`}>
              <Pressable>
                <Image style={tw`w-5 h-5`} source={require("../../../assets/menu.png")} />
              </Pressable>

              <Text style={tw`mx-5 text-xl font-medium self-center`}>식품 목록</Text>

              <Pressable>
                <Image style={tw`w-5 h-5`} source={require("../../../assets/loupe.png")} />
              </Pressable>
            </View>
            
            <FlatList
                style={tw`h-full mt-5`}
                data={DATA}
                renderItem={({ item, index, separators }) => (
                    <ListCard item={item} />
                )}
            />
        </SafeAreaView>
    )
}

export default ProductList
