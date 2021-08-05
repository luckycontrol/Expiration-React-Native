import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import tw from "tailwind-react-native-classnames"
import { useSelector, useDispatch } from 'react-redux'
import { setCategory, deleteCategory, resetCategory } from '../../../features/Category/categorySlice'
import { deleteCategory as DELETE_CATEGORY } from "../../../api/category/categoryApi"
import { deleteManyProducts as DELETE_MANY_PRODUCTS } from '../../../api/product/productApi'
import * as Haptics from "expo-haptics"
import url from "../../../api/url"

const Menu = ({ ScaleTransitionEffect, setCreateCategory }) => {

    const selectedCategory  = useSelector((state) => state.category.value);
    const categoryList      = useSelector((state) => state.category.categoryList);
    const dispatch          = useDispatch();

    const [editCategory, setEditCategory] = useState(false);

    const removeCategory = async (categoryName) => {
        const result = await fetch(url, {
            method: "post",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                query: DELETE_CATEGORY,
                variables: {
                    email       : "cho",
                    categoryName: categoryName
                }
            })
        });

        const { data: { deleteCategory: { _id } } } = await result.json();

        if (!_id) {
            dispatch(deleteCategory(categoryName))
        }
    }

    const removeProductsInCategory = async (categoryName) => {
        fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: DELETE_MANY_PRODUCTS,
                variables: {
                    email: "cho",
                    categoryName: categoryName
                }
            })
        });
    }

    const handleDeleteCategory = (categoryName) => (
        Alert.alert(
            "선택하신 카테고리를 삭제하실건가요?",
            "해당 카테고리에 포함된 항목들은 모두 삭제됩니다.",
            [
                {
                    text: "삭제",
                    onPress: () => {
                        removeCategory(categoryName);
                        removeProductsInCategory(categoryName);
                        dispatch(resetCategory());
                    },
                    style: "destructive"
                },
                {
                    text: "취소",
                },
            ]
        )
    )

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
                    <View style={{ width: 150, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={tw`text-white text-xl font-bold`}>카테고리</Text>
                        <TouchableOpacity 
                            style={{ padding: 5, backgroundColor: editCategory ? "rgba(0, 0, 0, 0.5)" : "transparent", borderRadius: 5 }}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                setEditCategory(!editCategory);
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>편집</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`my-2`}>
                        {
                            categoryList.map(category => (
                                <TouchableOpacity
                                    style={{ 
                                        padding: 10, 
                                        width: 150, 
                                        height: 40, 
                                        backgroundColor: category == selectedCategory ? "rgba(0, 0, 0, 0.3)" : "transparent", 
                                        borderRadius: 10, 
                                        flexDirection: "row", 
                                        justifyContent: "space-between", 
                                        alignItems: "center" 
                                    }}
                                    key={category}
                                    onPress={() => {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                        dispatch(setCategory(category));
                                    }}
                                >
                                    <Text style={tw`text-white font-bold`} >{category}</Text>
                                    {
                                        editCategory && (
                                            <TouchableOpacity
                                                onPress={() => handleDeleteCategory(category)}
                                            >
                                                <Image style={{ width: 5, height: 5, padding: 7 }} source={require("../../../assets/close.png")} />
                                            </TouchableOpacity>
                                        )
                                    }
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>

                <View>
                    <TouchableOpacity 
                        style={{ padding: 20 }}
                        onPress={() => {
                            setCreateCategory(true);
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }} >카테고리 추가</Text>
                    </TouchableOpacity>
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
