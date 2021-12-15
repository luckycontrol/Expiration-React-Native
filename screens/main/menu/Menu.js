import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory, deleteCategory, resetCategory } from '../../../features/Category/categorySlice'
import { categoryAPI, productAPI } from "../../../api"
import * as Haptics from "expo-haptics"

import { logout as LOGOUT_REDUCER } from '../../../features/Account/accountSlice'
import { resetCategoryList as RESET_CATEGORY_LIST_REDUCER } from '../../../features/Category/categorySlice'

import db, { saveLogoutStatus } from '../../../sqlite/sqlite'

const Menu = ({ navigation, ScaleTransitionEffect, setCreateCategory }) => {

    const login             = useSelector((state) => state.account.info)
    const selectedCategory  = useSelector((state) => state.category.value);
    const categoryList      = useSelector((state) => state.category.categoryList);
    const dispatch          = useDispatch();

    const [editCategory, setEditCategory] = useState(false);

    const removeCategory = async (categoryName) => {
        const {data: {data: {deleteCategory: {_id}}}} = await categoryAPI.deleteCategory(login.email, categoryName)

        if (!_id) {
            dispatch(deleteCategory(categoryName))
        }
    }

    const removeProductsInCategory = async (categoryName) => {
        productAPI.deleteManyProducts(login.email, categoryName)
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

    function handleLogout() {
        Alert.alert(
            "로그아웃 하시겠어요?",
            "",
            [
                {
                    text: "로그아웃",
                    onPress: () => {
                        dispatch(LOGOUT_REDUCER());
                        dispatch(RESET_CATEGORY_LIST_REDUCER([]));
                        saveLogoutStatus(db);
                    }
                    
                },
                {
                    text: "취소"
                }
            ]
        )
    }

    function handleClickSettingsBtn() {
        ScaleTransitionEffect()

        navigation.push("Settings");
    }

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
                    style={{ width: 15, height: 15, marginHorizontal: 20 }}
                />
            </TouchableOpacity>

            <Text style={{ color: "white", fontSize: 34, fontWeight: "bold", margin: 20 }}>{login.name}님{'\n'}안녕하세요.</Text>

            <ScrollView>
                <View style={{ margin: 20 }}>
                    {/* 카테고리, 편집 버튼 */}
                    <View style={{ width: 150, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>카테고리</Text>
                        <TouchableOpacity 
                            style={{ padding: 5, backgroundColor: editCategory ? "rgba(0, 0, 0, 0.5)" : "transparent", borderRadius: 5 }}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                setEditCategory(!editCategory);
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>편집</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 카테고리 항목들 출력 */}
                    <View style={{ marginVertical: 14 }}>
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
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }} >{category}</Text>
                                    {
                                        editCategory && (
                                            <TouchableOpacity
                                                onPress={() => handleDeleteCategory(category)}
                                            >
                                                <Image style={{ width: 1, height: 1, opacity: 0.8, padding: 7 }} source={require("../../../assets/close.png")} />
                                            </TouchableOpacity>
                                        )
                                    }
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>

                {/* 카테고리 추가버튼 */}
                <View>
                    <TouchableOpacity 
                        style={{ padding: 20 }}
                        onPress={() => {
                            setCreateCategory(true);
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }} >카테고리 추가</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            handleClickSettingsBtn();
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, marginBottom: 10 }} >설정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Menu
