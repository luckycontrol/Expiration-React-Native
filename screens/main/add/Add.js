import React, { useState } from 'react'
import { 
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { useSelector } from "react-redux"

const Add = ({ navigation }) => {

    const selectedCategory = useSelector((state) => state.category.value);

    const [image, setImage] = useState(null);
    const [name, setName]   = useState("");

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        left: 30,
                        top: 2,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require("../../../assets/left-chevron.png")} style={{ alignSelf: "flex-start", width: 20, height: 20 }} />
                </TouchableOpacity>
                <Text style={{ alignSelf: "center", fontSize: 24, fontWeight: "500" }} >
                    {selectedCategory} 추가
                </Text>
            </View>

            <View style={{ margin: 30 }}>
                <TouchableOpacity>
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
                        <Image source={require("../../../assets/gallery.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ marginTop: 10, fontWeight: "500" }}>이미지를 선택해주세요.</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 30 }}>
                <Text style={{ fontSize: 14, fontWeight: "500" }}>이름</Text>
                <TextInput style={{ height: 30, marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#bbb" }} />
            </View>
        </SafeAreaView>
    )
}

export default Add
