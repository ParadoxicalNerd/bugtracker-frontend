import { useQuery } from "urql"
import { User } from "../models/User";

const UsernameQuery = `
query usenames {
  allUsers{
    id
    name
    email
    ofType
  }
}
  `

const useUsernameAccessor = () => {
  const [result, reexecuteQuery] = useQuery<{ allUsers: User[] }>({ query: UsernameQuery })
  return { ...result }
}

export default useUsernameAccessor