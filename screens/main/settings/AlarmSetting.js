import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native'
import DatePicker from "@react-native-community/datetimepicker"
import { setNotification, getUserSelectedAlarm } from "../../../api/notification/notificationApi"
import { useSelector } from 'react-redux'
import { getToken } from "../../../sqlite/sqlite"
import * as Haptics from "expo-haptics"

const AlarmSetting = ({ navigation }) => {

    const login = useSelector((state) => state.account.info);

    const [selectedAlarm, setSelectedAlarm] = useState("");
    const [alarm, setAlarm] = useState(new Date());

    function handleClickBackBtn() {
        navigation.goBack();
    }

    function dateHandler (event, selectedDate) {
        const date = selectedDate || alarm;

        setAlarm(date);
    }

    useEffect(() => {
        async function handleGetUserAlarm() {
            let getUserAlarmResult = await getUserSelectedAlarm(login.email);
            setSelectedAlarm(getUserAlarmResult);
        }

        handleGetUserAlarm();
    }, [])

    async function handleSetAlarm() {
        const email = login.email;
        const token = await getToken();

        const hour = alarm.getHours();
        const minute = alarm.getMinutes();

        const result = await setNotification(email, token[0].token, `${hour} ${minute}`);

        if (result === "OK") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.goBack();
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%", justifyContent: "space-between"}}>
            <View>
                <View style={{ marginHorizontal: 20, marginVertical: 20, alignItems: "center", justifyContent: "center" }} >
                    <TouchableOpacity style={{ position: "absolute", left: 0 }} onPress={handleClickBackBtn}>
                        <Image source={require("../../../assets/left-chevron.png")} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 22, fontWeight: "500" }}>알림 설정</Text>
                </View>

                <View style={{ padding: 20 }}>
                    <View>
                        <Text style={{ fontWeight: "400", fontSize: 22 }} >알람을 받으실 시간을 입력해주세요.</Text>
                        <Text style={{ marginTop: 10, color: "#bbb" }} >매일 지정된 시간에 알람을 드릴게요!</Text>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontSize: 20 }} >현재 설정된 시간: {selectedAlarm}</Text>
                    </View>

                    <DatePicker
                        value={alarm}
                        mode="time"
                        display="default"
                        onChange={dateHandler}
                        style={{ marginTop: 15 }}
                    />
                </View>
            </View>
            <View style={{ alignItems: "center" }} >
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
                    onPress={handleSetAlarm}
                >
                    <Text style={{ color: "white", fontWeight: "500" }} >알림 설정</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AlarmSetting
