import axios from "axios"
import url from "../url"

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

export const updateProduct = `mutation UpdateProduct($_id: String, $email: String, $name: String, $type: String, $expiration: String, $image: String) {
    updateProduct(_id: $_id, email: $email, name: $name, type: $type, expiration: $expiration, image: $image) {
        _id
        name
        type
        expiration
        image
    }
}
`

export const deleteProduct = `mutation DeleteProduct($email: String, $_id: String) {
    deleteProduct(email: $email, _id: $_id) {
        _id
    }
}
`

export const deleteManyProducts = `mutation DeleteManyProducts($email: String, $categoryName: String) {
    deleteManyProducts(email: $email, categoryName: $categoryName) {
        _id
    }
}
`

class ProductAPI {
    async createProduct(email, name, selectedCategory, image, expiration) {
        await axios.post(url, {
            query: createProduct,
            variables: {
                email       : email,
                name        : name,
                type        : selectedCategory, 
                image       : image, 
                expiration  : expiration
            }
        })
    }

    async getProducts(login, selectedCategory) {
        const result = await axios.post(url, {
            query       :   getProducts,
            variables: {
                email   :   login.email,
                type    :   selectedCategory
            }
        })
        
        return result
    }

    async updateProduct(item, email, name, image, expiration) {
        await axios.post(url, {
            query       :   updateProduct,
            variables: {
                _id         :   item._id,
                email       :   email,
                name        :   name,
                type        :   item.type, 
                image       :   image,
                expiration  :   expiration
            }
        })
    }

    async deleteProduct(login, productId) {
        const result = await axios.post(url, {
            query       :   deleteProduct,
            variables: {
                email   :   login.email,
                _id     :   productId
            }
        })

        return result
    }

    async deleteManyProducts(email, categoryName) {
        await axios.post(url, {
            query: deleteManyProducts,
            variables: {
                email       : email,
                categoryName: categoryName
            }
        })
    }
}

export const productAPI = new ProductAPI()