import React from 'react'
import { View, Text, Image } from 'react-native'
import tw from "tailwind-react-native-classnames"

const ListCard = ({ item }) => {

    const expiration = new Date(item.expiration);

    const checkExpiration = () => {
        const sample_expiration = new Date(expiration.setHours(0, 0, 0, 0));

        const oneLeft = new Date(sample_expiration.setDate(sample_expiration.getDate()));
    
        const three   = new Date(sample_expiration.setDate(sample_expiration.getDate() - 1));

        const week    = new Date(sample_expiration.setDate(sample_expiration.getDate() - 3));

        const now     = new Date(new Date().setHours(0, 0, 0, 0));

        if (now < week) {
            return ["일주일", require("../../../assets/expiration/일주일.png")];
        }
        else if (now < three) {
            return ["사흘", require("../../../assets/expiration/사흘.png")];
        }
        else if (now <= oneLeft) {
            return ["하루", require("../../../assets/expiration/하루.png")];
        }
        else {
            return ["지남", require("../../../assets/expiration/지남.png")];
        }
    }

    return (
        <View style={tw`h-20 my-2 bg-white p-5 shadow-sm flex-row justify-between items-center`}>
            <View style={{ flexDirection: "row" }}>
                <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={ item.image ? { uri: item.image } : require("../../../assets/icon.png")} />
                <View style={tw`justify-around ml-3`}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500"}} >{item.name}</Text>
                        <Image style={{ width: 10, height: 10, marginLeft: 5 }} source={checkExpiration()[1]} />
                    </View>
                    <Text>{item.type}</Text>
                </View>
            </View>

            <View style={tw`mr-3`}>
                <Text style={{ color: checkExpiration()[0] == "지남" ? "red" : "black" }}>{`${expiration.getFullYear()}년 ${expiration.getMonth() + 1}월 ${expiration.getDate()}일`}</Text>
            </View>
        </View>
    )
}

export default ListCard
