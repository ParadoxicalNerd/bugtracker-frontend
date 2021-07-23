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

const usersAccessor = () => {
  const [result, executeQuery] = useQuery<{ allUsers: User[] }>({ query: UsernameQuery })
  return { ...result }
}

export default usersAccessor