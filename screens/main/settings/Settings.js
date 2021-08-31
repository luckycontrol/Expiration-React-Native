import React from 'react'
import {
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native'
import * as Haptics from "expo-haptics"

const listData = [
    {
        page: "AlarmSetting",
        title: "매일 몇 시에 알람을 받으실건가요?",
    },
    {
        page: "ChangePassword",
        title: "비밀번호 변경"
    },
    {
        page: "AddNewFeature",
        title: "이 기능을 추가해주세요!"
    },
    {
        page: "RemoveAccount",
        title: "회원탈퇴"
    },
]

const Settings = ({ navigation }) => {

    function handleClickBackBtn() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ backgroundColor: "white" }} >
            {/* 타이틀 */}
            <View style={{ marginHorizontal: 20, marginVertical: 20, alignItems: "center", justifyContent: "center" }} >
                <TouchableOpacity style={{ position: "absolute", left: 0 }} onPress={handleClickBackBtn} >
                    <Image source={require("../../../assets/left-chevron.png")} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>

                <Text style={{ fontSize: 22, fontWeight: "500" }}>설정</Text>
            </View>
            <FlatList 
                data={listData}
                renderItem={item => SettingItem(navigation, item)}
                keyExtractor={item => item.title}
                style={{ height: "100%" }}
            />
        </SafeAreaView>
    )
}

const SettingItem = (navigation, { item }) => {

    function handleClickNavigation() {
        navigation.push(item.page);
    }

    return (
        <>
            <TouchableOpacity 
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 25,
                }}

                onPress={handleClickNavigation}
            >
                <Text style={{ fontWeight: "400", fontSize: 16 }} >{item.title}</Text>

                <Image source={require("../../../assets/right-chevron.png")} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 25, height: 1, backgroundColor: "rgba(0, 0, 0, 0.02)" }}></View>
        </>
    )
}

export default Settings
