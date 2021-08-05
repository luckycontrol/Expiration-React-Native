import React, { useState } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native'
import DatePicker from "@react-native-community/datetimepicker"
import * as ImagePicker from "expo-image-picker"
import * as Haptics from "expo-haptics"
import { updateProduct as UPDATE_PRODUCT } from '../../../api/product/productApi'
import { productUpdate } from '../../../features/ProductUpdate/productUpdateSlice'
import { useDispatch } from "react-redux"
import url from '../../../api/url'

const Edit = ({ route, navigation }) => {

    const { item } = route.params;

    const [name, setName]               = useState(item.name);
    const [expiration, setExpiration]   = useState(new Date(item.expiration));
    const [image, setImage]             = useState(item.image);

    const dispatch = useDispatch();

    const dateHandler = (event, selectedDate) => {
        const date = selectedDate || expiration;

        setExpiration(date);
    }

    const handleUpdateProduct = async () => {

        await fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: UPDATE_PRODUCT,
                variables: {
                    _id         : item._id,
                    email       : "cho",
                    name        : name,
                    type        : item.type,
                    image       : image,
                    expiration  : expiration
                }
            })
        });

        dispatch(productUpdate(true));
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ height: "100%", justifyContent: "space-between" }} >
            <View style={{ margin: 30 }}>
                <View style={{ marginBottom: 30 }} >
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image source={require("../../../assets/left-chevron.png" )} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>

                    <Text style={{ alignSelf: "center", fontSize: 22, fontWeight: "500" }}>{item.type} 수정</Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        
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
        </SafeAreaView>
    )
}

export default Edit
