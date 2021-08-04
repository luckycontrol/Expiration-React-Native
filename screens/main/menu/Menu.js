import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import tw from "tailwind-react-native-classnames"
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../../../features/Category/categorySlice'
import * as Haptics from "expo-haptics"

const list = ["음식", "생활용품"]

const Menu = ({ ScaleTransitionEffect }) => {

    const selectedCategory = useSelector((state) => state.category.value);
    const dispatch = useDispatch();

    return (
        <SafeAreaView
            style={{
                height: "100%",
                backgroundColor: "#DF711B"
            }}
        >

            <TouchableOpacity
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    ScaleTransitionEffect()
                }}
            >
                <Image
                    source={require("../../../assets/close.png")} 
                    style={tw`w-5 h-5 mx-5`}
                />
            </TouchableOpacity>

            <Text style={tw`m-5 text-white text-2xl font-bold`}>회원님, 안녕하세요.</Text>

            <ScrollView>
                <View style={tw`m-5`}>
                    <Text style={tw`text-white text-xl font-bold`}>카테고리</Text>
                    <View style={tw`my-2`}>
                        {
                            list.map(category => (

                                category == selectedCategory ? (
                                    <View
                                        style={tw`p-2 my-1 w-40 h-10 justify-center rounded-md shadow-sm bg-yellow-700`}
                                        key={category}
                                    >
                                        <Text style={tw`text-white font-bold`} >{category}</Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={tw`p-2 my-1 w-24 h-10 justify-center rounded-md shadow-sm`}
                                        key={category}
                                        onPress={() => {
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                            dispatch(setCategory(category));
                                        }}
                                    >
                                        <Text style={tw`text-white`} >{category}</Text>
                                    </TouchableOpacity>
                                )
                            ))
                        }
                    </View>
                </View>

                <View style={tw`m-5`}>
                    <TouchableOpacity>
                        <Text style={tw`text-white font-bold text-base`}>로그아웃 </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Menu
