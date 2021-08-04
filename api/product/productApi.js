export const createProduct = `mutation CreateProduct($email: String, $name: String, $type: String, $image: String, $expiration: String) {
    createProduct(email: $email, name: $name, type: $type, image: $image, expiration: $expiration) {
        _id
        email
        name
        type
        image
        expiration
    }
}`

export const getProducts = `query GetProducts($email: String, $type: String) {
    getProducts(email: $email, type: $type) {
        _id
        name
        type
        image
        expiration
    }
}
`

export const deleteProduct = `mutation DeleteProduct($email: String, $_id: String) {
    deleteProduct(email: $email, _id: $_id) {
        _id
    }
}
`