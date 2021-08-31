import React, { useState } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native'
import DatePicker from "@react-native-community/datetimepicker"

const AlarmSetting = ({ navigation }) => {

    const [alarm, setAlarm] = useState(new Date());

    function handleClickBackBtn() {
        navigation.goBack();
    }

    const dateHandler = (event, selectedDate) => {
        const date = selectedDate || expiration;

        setAlarm(date);
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
                >
                    <Text style={{ color: "white", fontWeight: "500" }} >알림 설정</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AlarmSetting
