import axios from "axios"
import { login } from "../../features/Account/accountSlice"
import url from "../url"

export const getCategoryList = `query GetCategoryList($email: String) {
    getCategoryList(email: $email) {
        categoryName
    }
}
`

export const createCategory = `mutation CreateCategory($email: String, $categoryName: String) {
    createCategory(email: $email, categoryName: $categoryName) {
        categoryName
    }
}
`

export const deleteCategory = `mutation DeleteCategory($email: String, $categoryName: String) {
    deleteCategory(email: $email, categoryName: $categoryName) {
        _id
    }
}
`

class CategoryAPI {

    async getCategoryList(email) {
        const result = await axios.post(url, {
            query: getCategoryList,
            variables: {
                email: email
            }
        })

        return result
    }

    async createCateogry(email, categoryName) {
        const result = await axios.post(url, {
            query: createCategory,
            variables: {
                email       : email,
                categoryName: categoryName
            }
        })

        return result
    }

    async deleteCategory(email, categoryName) {
        const result = await axios.post(url, {
            query: deleteCategory,
            variables: {
                email       : email,
                categoryName: categoryName
            }
        })

        return result
    }
}

export const categoryAPI = new CategoryAPI()