export const CREATE_ACCOUNT = `mutation CreateAccount($email: String, $name: String, $password: String, $createdAt: String) {
    createAccount(email: $email, name: $name, password: $password, createdAt: $createdAt) {
        _id
        email
        name
    }
}
`

export const LOGIN = `query Login($email: String, $password: String) {
    login(email: $email, password: $password) {
        email
        name
    }
}
`

export const CHECK_DUPLICATE = `query CheckDuplicate($email: String) {
    checkDuplicate(email: $email) {
        email
    }
}
`