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