import React from 'react'
import { View, Text, Image } from 'react-native'
import tw from "tailwind-react-native-classnames"

const ListCard = ({ item }) => {

    return (
        <View 
            style={tw`h-20 mx-5 my-2 bg-white rounded-md p-2 shadow-sm flex-row justify-between items-center`}
        >
            <View style={tw`flex-row`}>
                <Image style={tw`w-14 h-14`} source={require("../../../assets/icon.png")} />
                <View style={tw`justify-around ml-3`}>
                    <Text>{item.title}</Text>
                    <Text>타입</Text>
                </View>
            </View>

            <View style={tw`mr-3`}>
                <Text>유통기한</Text>
            </View>
        </View>
    )
}

export default ListCard
