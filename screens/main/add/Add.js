import React, { useState, useEffect } from 'react'
import { 
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Alert
} from 'react-native'
import DatePicker from "@react-native-community/datetimepicker"
import { useSelector, useDispatch } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import * as Haptics from "expo-haptics"
import { createProduct } from '../../../api/product/productApi'
import { productUpdate } from '../../../features/ProductUpdate/productUpdateSlice'
import url from "../../../api/url"

const Add = ({ navigation, route }) => {

    const login             = useSelector((state) => state.account.info)
    const selectedCategory  = useSelector((state) => state.category.value);
    const dispatch          = useDispatch();

    const [image, setImage] = useState(null);
    const [name, setName]   = useState("");
    const [expiration, setExpiration] = useState(new Date());

    const [showModal, setShowModal] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const dateHandler = (event, selectedDate) => {
        const date = selectedDate || expiration;

        setExpiration(date);
    }

    const checkInput = async () => {
        if (name == "") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setShowModal(true);
        } else {
            await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type"  : "application/json",
                    "Accept"        : "application/json"
                },
                body: JSON.stringify({
                    query: createProduct,
                    variables: {
                        email       : login.email,
                        name        : name,
                        type        : selectedCategory,
                        image       : image,
                        expiration  : expiration
                    }
                })
            });

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

            // 데이터를 리스트에 추가하는 작업...
            dispatch(productUpdate(true));

            navigation.goBack();
        }
    }

    useEffect(() => {
        if (route.params) {
            setImage(route.params.image);
        }
    }, [route.params])

    return (
        <SafeAreaView style={{ height: "100%", justifyContent: "space-between" }} >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled
            >
            <View style={{ margin: 30 }}>
                <View style={{ marginBottom: 30,  }} >
                    <TouchableOpacity
                        onPress={() => { navigation.goBack(); }}
                    >
                        <Image source={require("../../../assets/left-chevron.png" )} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>

                    <Text style={{ alignSelf: "center", fontSize: 22, fontWeight: "500" }}>{selectedCategory} 추가</Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            `${selectedCategory} 이미지 추가`,
                            "어떤 방식으로 이미지를 추가하실건가요?",
                            [
                                {
                                    text: "카메라로 촬영",
                                    onPress: () => {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                        navigation.navigate("Camera", {
                                            path: "Add"
                                        })
                                    }
                                },
                                {
                                    text: "앨범에서 선택",
                                    onPress: () => {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                        pickImage();
                                    }
                                },
                                {
                                    text: "취소",
                                    style: "destructive"
                                }
                            ]
                        )
                    }}
                >
                    <View
                        style={{
                            width: 300,
                            height: 300,
                            backgroundColor: "white",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.4
                        }}
                    >
                        {
                            image ? (
                                <View>
                                    <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 15 }} />
                                </View>
                            ) : (
                                <View>
                                    <Image source={require("../../../assets/gallery.png")} style={{ width: 50, height: 50, alignSelf: "center" }} />
                                    <Text style={{ marginTop: 10, fontWeight: "500" }}>이미지를 선택해주세요.</Text>
                                </View>
                            )
                        }
                    </View>
                </TouchableOpacity>

                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>이름</Text>
                    <TextInput style={{ height: 30, marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#bbb" }} value={name} onChangeText={setName}/>
                </View>

                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>유통기한</Text>

                    <DatePicker 
                        value={expiration}
                        mode="date"
                        display="default"
                        onChange={dateHandler}
                        style={{ marginTop: 15 }}
                    />
                </View>
            </View>

            <View style={{ alignItems: "center" }} >
                <TouchableOpacity
                    style={{ 
                        width: "90%",
                        height: 50,
                        backgroundColor: "orange",
                        borderRadius: 10,
                        shadowOffset: {
                            width: 2,
                            height: 0,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={checkInput}
                >
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>추가</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>

            {/* 입력 안한게 있을 경우 */}
            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
            >
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}></View>
                <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: "70%", height: 250, backgroundColor: "white", borderRadius: 15, alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ marginTop: 60, fontSize: 18, fontWeight: "500" }}>{selectedCategory} 이름을 기입해주세요!</Text>
                        <TouchableOpacity
                            onPress={() => setShowModal(false)}
                            style={{
                                marginBottom: 30, 
                                backgroundColor: "orange", 
                                width: "80%", 
                                height: 40, 
                                justifyContent: "center", 
                                alignItems: "center", 
                                borderRadius: 10,
                                shadowOffset: {
                                    width: 2,
                                    height: 0
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 2
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "500" }}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Add
