import React, { useState } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native'

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const AddNewFeature = ({ navigation }) => {

    const [description, setDiscription] = useState("");

    function handleClickBackBtn() {
        navigation.goBack();
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ height: "100%", backgroundColor: "white"}} >
                <KeyboardAwareScrollView>
                    {/* 타이틀 */}
                    <View>
                        <View style={{ marginHorizontal: 20, marginVertical: 20, alignItems: "center", justifyContent: "center" }} >
                            <TouchableOpacity style={{ position: "absolute", left: 0 }} onPress={handleClickBackBtn} >
                                <Image source={require("../../../assets/left-chevron.png")} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 22, fontWeight: "500" }}>건의사항</Text>
                        </View>
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                            <TextInput 
                                placeholder={"원하시는 기능이 있으신가요? 자유롭게 적어주세요."}
                                multiline={true}
                                style={{ paddingHorizontal: 10, borderWidth: 1, borderRadius: 10, borderColor: "#bbb", height: 400 }}
                                value={description}
                                onChangeText={setDiscription}
                            />
                        </View>

                        <View style={{ alignItems: "center", marginTop: 150 }} >
                            <TouchableOpacity style={{ 
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
                            >
                                <Text style={{ color: "white", fontWeight: "500" }} >건의사항 전송</Text>
                            </TouchableOpacity>
                    </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default AddNewFeature
