import React, { useState } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Switch,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const RemoveAccount = ({ navigation }) => {

    const [description, setDiscription] = useState("");
    const [isRemove, setIsRemove] = useState(false);

    function handleClickBackBtn() {
        navigation.goBack();
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
                <KeyboardAwareScrollView>
                    {/* 타이틀 */}
                    <View style={{ marginHorizontal: 20, marginVertical: 20, alignItems: "center", justifyContent: "center" }} >
                        <TouchableOpacity style={{ position: "absolute", left: 0 }} onPress={handleClickBackBtn} >
                            <Image source={require("../../../assets/left-chevron.png")} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>

                        <Text style={{ fontSize: 22, fontWeight: "500" }}>회원탈퇴</Text>
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: 10 }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 18, fontWeight: "400" }} >계정을 삭제하실건가요?</Text>
                            <Switch 
                                value={isRemove}
                                onValueChange={() => setIsRemove(!isRemove)}
                            />
                        </View>
                    </View>

                    {
                        isRemove && (
                            <>
                                <View style={{ marginHorizontal: 20, marginTop: 10 }} >
                                    <TextInput 
                                        placeholder={"혹시 이 앱의 부족한 점을 알려주실 수 있나요?"}
                                        multiline={true}
                                        style={{ padding: 20, borderWidth: 1, borderRadius: 10, borderColor: "#bbb", minHeight: 300 }}
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
                                        <Text style={{ color: "white", fontWeight: "500" }} >회원탈퇴</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    }
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default RemoveAccount
