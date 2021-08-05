import React, { useState, useRef, useEffect } from 'react'
import {
    View, 
    Text, 
    Animated, 
    Modal, 
    TextInput, 
    TouchableOpacity 
} from 'react-native'
import ProductList from './list/ProductList'
import Menu from './menu/Menu'
import { 
    createCategory as CREATE_CATEGORY_REDUCER,
    setCategoryList as SET_CATEGORY_LIST
} from '../../features/Category/categorySlice'
import { 
    createCategory as CREATE_CATEGORY, 
    getCategoryList as GET_CATEGORY_LIST 
} from "../../api/category/categoryApi"
import { useDispatch } from 'react-redux'
import url from '../../api/url'

const Main = ({ navigation }) => {

    const [menu, setMenu] = useState(false);

    const [createCategory, setCreateCategory] = useState(false);
    const [newCategory, setNewCategory]       = useState("");

    const dispatch = useDispatch();

    const offsetValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const scaleValue = useRef(new Animated.Value(1)).current;

    const ScaleTransitionEffect = () => {
        Animated.timing(scaleValue, {
            toValue: menu ? 1 : 0.78,
            duration: 300,
            useNativeDriver: true 
        }).start();

        Animated.timing(offsetValue, {
            toValue: menu ? { x: 0, y: 0 } : { x: 220, y: 0 },
            duration: 300,
            useNativeDriver: true
        }).start()

        setMenu(!menu);
    }

    useEffect(() => {
        const handleGetCategoryList = async () => {
            const result = await fetch(url, {
                method: "post",
                headers: {
                    "content-type"  : "application/json",
                    "accept"        : "application/json"
                },
                body: JSON.stringify({
                    query: GET_CATEGORY_LIST,
                    variables: { email: "cho" }
                })
            });

            const { data: { getCategoryList } } = await result.json();
            dispatch(SET_CATEGORY_LIST(getCategoryList))
        }

        handleGetCategoryList();
    }, [])

    const handleCreateCategory = async () => {
        const result = await fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: CREATE_CATEGORY,
                variables: {
                    email       : "cho",
                    categoryName: newCategory
                }
            })
        });

        const { data: { createCategory: { categoryName } } } = await result.json();
        dispatch(CREATE_CATEGORY_REDUCER(categoryName));
    }

    return (
        <View>
            <Menu ScaleTransitionEffect={ScaleTransitionEffect} setCreateCategory={setCreateCategory} />
            <ProductList navigation={navigation} menu={menu} setMenu={setMenu} scaleValue={scaleValue} offsetValue={offsetValue} ScaleTransitionEffect={ScaleTransitionEffect} />

            {/* 카테고리 추가 모달 */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={createCategory}
            >
                <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity 
                        style={{ 
                            position: "absolute", 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0, 
                            backgroundColor: "rgba(0, 0, 0, 0.3)" 
                        }}
                        onPress={() => setCreateCategory(false)}
                    >
                    </TouchableOpacity>
                    <View
                        style={{ 
                            width: "70%", 
                            height: 250, 
                            backgroundColor: "white", 
                            borderRadius: "10",
                            shadowOffset: {
                                width: 0.22,
                                height: 0
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 0.1,
                            justifyContent: "space-evenly"
                        }}
                    >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "500" }}>추가할 카테고리를 입력해주세요.</Text>
                        <View style={{ marginHorizontal: 30 }}>
                            <Text style={{ fontWeight: "500" }}>카테고리 이름</Text>
                            <TextInput style={{ height: 35, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" }} onChangeText={setNewCategory} />
                        </View>

                        <TouchableOpacity 
                            style={{ 
                                width: "80%", 
                                height: 40, 
                                backgroundColor: "orange", 
                                borderRadius: 10,
                                alignSelf: "center",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={() => {
                                handleCreateCategory();
                                setCreateCategory(false);
                            }}
                        >
                            <Text style={{ fontWeight: "500", color: "white", fontSize: 18 }}>추가</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Main
