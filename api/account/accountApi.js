import { gql } from "@apollo/client"

export const CHECK_DUPLICATE = ({ email }) => gql`
    query {
        checkDuplicate(email: ${email}) {
            email
        }
    }
`;