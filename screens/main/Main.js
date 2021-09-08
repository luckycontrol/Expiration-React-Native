import React, { useState, useRef, useEffect } from 'react'
import {
    View, 
    Text, 
    Animated, 
    Modal, 
    TextInput, 
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import ProductList from './list/ProductList'
import Menu from './menu/Menu'
import { 
    createCategory  as CREATE_CATEGORY_REDUCER,
    setCategoryList as SET_CATEGORY_LIST,
    setCategory     as SET_CATEGORY
} from '../../features/Category/categorySlice'
import { 
    createCategory as CREATE_CATEGORY, 
    getCategoryList as GET_CATEGORY_LIST 
} from "../../api/category/categoryApi"
import { useSelector, useDispatch } from 'react-redux'
import url from '../../api/url'
import * as Notifications from "expo-notifications"
import db, { createTokenTable, saveToken, getToken } from "../../sqlite/sqlite"
import * as TaskManager from "expo-task-manager"
import { BACKGROUND_FETCH_TASK } from "../../features/BackgroundTask/BackgroundTaskManager"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    })
})

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

    const login = useSelector((state) => state.account.info);

    const getTokenResult = await getToken();
    const token = getTokenResult[0].token;
    const url = "http://192.168.1.3:3000/expoServer"

    const notificationResult = await fetch(url, {
        method: "post",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            email: login.email,
            token: token
        })
    });

    const { result } = await notificationResult.json();

    console.log(result);
})

const Main = ({ navigation }) => {

    const login = useSelector((state) => state.account.info);
    const category = useSelector((state) => state.category.categoryList);

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
                    variables: { email: login.email }
                })
            });

            const { data: { getCategoryList } } = await result.json();
            dispatch(SET_CATEGORY_LIST(getCategoryList));
            dispatch(SET_CATEGORY(getCategoryList[0].categoryName));
        }

        const handleNotification = async () => {
            const { status } = await Notifications.getPermissionsAsync();

            if (status !== "granted") { return }

            let token = (await Notifications.getExpoPushTokenAsync()).data;

            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C"
                });
            }

            createTokenTable(db);
            saveToken(db, token);
        }

        handleGetCategoryList();
        handleNotification();
    }, [])

    const handleCreateCategory = async () => {
        if (newCategory === "") {
            Alert.alert(
                "카테고리 이름을 입력해주세요!",
                "",
                [
                    {
                        text: "알겠어요"
                    }
                ]
            )

            return;
        }

        const result = await fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: CREATE_CATEGORY,
                variables: {
                    email       : login.email,
                    categoryName: newCategory
                }
            })
        });

        const { data: { createCategory: { categoryName } } } = await result.json();
        dispatch(CREATE_CATEGORY_REDUCER(categoryName));
        setCreateCategory(false);
    }

    return (
        <View>
            <Menu navigation={navigation} ScaleTransitionEffect={ScaleTransitionEffect} setCreateCategory={setCreateCategory} />
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
