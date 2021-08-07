import React, { useState } from 'react'
import { 
    Alert, 
    Pressable,
    SafeAreaView, 
    Text, 
    TextInput, 
    View,
    TouchableOpacity,
    Image,
} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import tw from "tailwind-react-native-classnames"
import url from '../../api/url'
import { 
    CHECK_DUPLICATE,
    CREATE_ACCOUNT
} from '../../api/account/accountApi'
import { createCategory as CREATE_CATEGORY } from '../../api/category/categoryApi'
import * as Haptics from "expo-haptics"


const CreateAccount = ({ navigation }) => {

    const [email, setEmail]         = useState("");
    const [name, setName]           = useState("");
    const [password, setPassword]   = useState("");

    const ResultAlert = (message) => {
        Alert.alert(
            "회원가입에 문제가 생겼어요!",
            `${message}`,
            [
                {
                    text: "알겠어요"
                },
            ]
        )
    }

    async function CreateAccount() {
        if (email === "" || name === "" || password === "") {
            ResultAlert("입력안하신게 있어요. 모두 채워주세요.");
            return;
        }

        // 중복체크
        if (await handleCheckDuplicate() !== null) {
            ResultAlert("입력하신 이메일이 이미 사용되고 있어요.");
            return;
        }

        // 회원가입
        if (await FinalCreateAccount() === null) {
            ResultAlert("회원가입에 실패했습니다. 다시 시도해주세요.");
            return;

        } else {
            await handleCreateCategory();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.goBack();
        }
    }

    async function handleCheckDuplicate() {
        const result = await fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: CHECK_DUPLICATE,
                variables: {
                    email: email
                }
            })
        });

        const { data: { checkDuplicate } } = await result.json();
        if (checkDuplicate === null) { return null }
        else { return checkDuplicate.email }
    }

    async function FinalCreateAccount() {
        const result = await fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: CREATE_ACCOUNT,
                variables: {
                    email: email,
                    name: name,
                    password: password,
                    createdAt: new Date(Date.now())
                }
            })
        });

        const { data: { createAccount } } = await result.json();
        if (createAccount === null) { return null }
        else { return createAccount.email }
    }

    async function handleCreateCategory() {
        await fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: CREATE_CATEGORY,
                variables: {
                    email: email,
                    categoryName: "음식"
                }
            })
        });

        await fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: CREATE_CATEGORY,
                variables: {
                    email: email,
                    categoryName: "생활용품"
                }
            })
        });
    }

    return (
        <SafeAreaView style={tw`w-full h-full justify-between`}>
            <KeyboardAwareScrollView >
                <TouchableOpacity style={tw`mx-5 my-3`} onPress={() => navigation.goBack()} >
                    <Image style={{ width: 20, height: 20 }} source={require("../../assets/left-chevron.png")} />
                </TouchableOpacity>

                <Text style={tw`m-5 text-3xl font-bold`}>회원가입</Text>

                <View style={tw`m-5`}>
                    <Text style={tw`text-base text-base font-medium`}>이메일</Text>
                    <TextInput style={tw`h-14 rounded-xl mt-3 p-2 bg-gray-200 border border-gray-200 shadow-sm`} onChangeText={setEmail} />
                </View>

                <View style={tw`m-5`}>
                    <Text style={tw`text-base text-base font-medium`}>이름 / 닉네임</Text>
                    <TextInput style={tw`h-14 rounded-xl mt-3 p-2 bg-gray-200 border border-gray-200 shadow-sm`} onChangeText={setName} />
                </View>

                <View style={tw`m-5`}>
                    <Text style={tw`text-base text-base font-medium`}>비밀번호</Text>
                    <TextInput
                        style={tw`h-14 rounded-xl mt-3 p-2 bg-gray-200 border border-gray-200 shadow-sm`}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                </View>

            <Pressable 
                style={tw`mx-5 flex justify-center items-center h-14 bg-black rounded-xl shadow-md my-20`}
                onPress={CreateAccount}
            >
                <Text style={tw`text-white text-xl font-medium`}>회원가입</Text>
            </Pressable>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
    
}

export default CreateAccount
