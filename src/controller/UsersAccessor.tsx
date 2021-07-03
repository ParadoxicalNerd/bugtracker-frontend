import { useQuery } from "urql"
import { User } from "../models";

const UsernameQuery = `
query usenames {
  allUsers{
    id
    name
    email
    type
  }
}
  `

const useUsernameAccessor = () => {
  const [result, reexecuteQuery] = useQuery<{ allUsers: User[] }>({ query: UsernameQuery })
  return { ...result }
}

export default useUsernameAccessor