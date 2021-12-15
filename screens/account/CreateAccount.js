import React, { useState } from 'react'
import { Input, Pressable } from "native-base"

import { 
    Alert, 
    SafeAreaView, 
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
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
        <SafeAreaView style={{ width: "100%", height: "100%", justifyContent: "space-between"}}>
            <KeyboardAwareScrollView >
                <TouchableOpacity style={{ marginHorizontal: 20, marginVertical: 15 }} onPress={() => navigation.goBack()} >
                    <Image style={{ width: 20, height: 20 }} source={require("../../assets/left-chevron.png")} />
                </TouchableOpacity>

                <Text style={{ margin: 20, fontSize: 32, fontWeight: "bold" }} >회원가입</Text>

                <View style={{ margin: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>이메일</Text>
                    <Input height={55} rounded="xl" mt="3" p="2" bg="gray.200" shadow={0.5} borderColor="gray.200" fontSize="md"
                        onChangeText={setEmail} 
                        autoCapitalize="none" 
                    />
                </View>

                <View style={{ margin: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>이름 / 닉네임</Text>
                    <Input height={55} rounded="xl" mt="3" p="2" bg="gray.200" shadow={0.5} borderColor="gray.200" fontSize="md"
                        onChangeText={setName} 
                        autoCapitalize="none" 
                    />
                </View>

                <View style={{ margin: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>비2밀번호</Text>
                    <Input height={55} rounded="xl" mt="3" p="2" bg="gray.200" shadow={0.5} borderColor="gray.200" fontSize="md"
                        onChangeText={setPassword} 
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                </View>

                <Pressable m="5" justifyContent="center" alignItems="center" h={55} bg="black" rounded="xl" shadow="1"
                    onPress={CreateAccount}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>회원가입</Text>
                </Pressable>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
    
}

export default CreateAccount
