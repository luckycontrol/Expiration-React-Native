import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    Alert
} from 'react-native'
import DatePicker from "@react-native-community/datetimepicker"
import * as ImagePicker from "expo-image-picker"
import * as Haptics from "expo-haptics"
import { productAPI } from '../../../api'
import { productUpdate } from '../../../features/ProductUpdate/productUpdateSlice'
import { useSelector, useDispatch } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const Edit = ({ route, navigation }) => {

    const login = useSelector((state) => state.account.info)

    const { item } = route.params;

    const [name, setName]               = useState(item.name);
    const [expiration, setExpiration]   = useState(new Date(item.expiration));
    const [image, setImage]             = useState(item.image);

    const dispatch = useDispatch();

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

    const handleUpdateProduct = async () => {

        await productAPI.updateProduct(item, login.email, name, image, expiration)

        dispatch(productUpdate(true));
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        navigation.goBack();
    }

    useEffect(() => {
        if (route.params.image) {
            setImage(route.params.image);
        }

    }, [route.params])

    return (
        <SafeAreaView style={{ height: "100%", justifyContent: "space-between" }} >
            <KeyboardAwareScrollView>
                <View style={{ margin: 30 }}>
                    <View style={{ marginBottom: 30 }} >
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Image source={require("../../../assets/left-chevron.png" )} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>

                        <Text style={{ alignSelf: "center", fontSize: 22, fontWeight: "500" }}>{item.type} 수정</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                `${item.type} 이미지 수정`,
                                "어떤 방식으로 이미지를 수정하실건가요?",
                                [
                                    {
                                        text: "카메라로 촬영",
                                        onPress: () => {
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                            navigation.navigate("Camera", {
                                                path: "Edit",
                                                item: item
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
                        onPress={handleUpdateProduct}
                    >
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>수정 완료</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Edit
