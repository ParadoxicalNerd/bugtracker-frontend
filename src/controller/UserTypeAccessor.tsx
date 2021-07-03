import { useQuery } from "urql"
import { User } from "../models";

const USER_TYPE_QUERY = `
query UserType ($ID:ID) {
    user(id:$ID){
      type
    }
}
`

const useUserTypeAccessor = (userID: string) => {
  const [result, reexecuteQuery] = useQuery<{ user: User }>({ query: USER_TYPE_QUERY, variables: { ID: userID } })
  return result
}