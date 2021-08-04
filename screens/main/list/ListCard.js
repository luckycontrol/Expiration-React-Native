import React from 'react'
import { View, Text, Image } from 'react-native'
import tw from "tailwind-react-native-classnames"

const ListCard = ({ item }) => {

    const expiration = new Date(item.expiration);

    return (
        <View 
            style={tw`h-20 my-2 bg-white p-5 shadow-sm flex-row justify-between items-center`}
        >
            <View style={{ flexDirection: "row" }}>
                <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={ item.image ? { uri: item.image } : require("../../../assets/icon.png")} />
                <View style={tw`justify-around ml-3`}>
                    <Text style={{ fontSize: 16, fontWeight: "500" }} >{item.name}</Text>
                    <Text>{item.type}</Text>
                </View>
            </View>

            <View style={tw`mr-3`}>
                <Text>{`${expiration.getFullYear()}년 ${expiration.getMonth() + 1}월 ${expiration.getDate()}일`}</Text>
            </View>
        </View>
    )
}

export default ListCard
