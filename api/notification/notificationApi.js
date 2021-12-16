// 알람을 설정하는 함수
export async function setNotification(email, token, date) {
	let url = "http://192.168.1.2:3000/setNotification"
	const setAlarmResult = await fetch(url, {
		method: "post",
		headers: {
			"content-type": "application/json",
			"accept": "application/json"
		},
		body: JSON.stringify({
			email: email,
			token: token,
			date: date
		})
	})

	const { result } = await setAlarmResult.json()

	return result
}

// 사용자가 지정한 알람 시간을 가져오는 함수
export async function getUserSelectedAlarm(email) {
	const url = "http://192.168.1.2:3000/getUserSelectedAlarm"

	const getUserAlarmResult = await fetch(url, {
		method: "post",
		headers: {
			"content-type": "application/json",
			"accpet": "application/json"
		},
		body: JSON.stringify({
			email: email
		})
	})

	const { result, date } = await getUserAlarmResult.json()
	let [hour, minute] = date.split(" ")

	return `${hour}시 ${minute}분`
}