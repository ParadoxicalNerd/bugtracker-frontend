import { useQuery } from "urql"
import { User } from "../models/User";

const UsernameQuery = `
query usenames {
    allUsers{
      name
    }
  }
  `

export default () => {
  const [result, reexecuteQuery] = useQuery<{ allUsers: User[] }>({ query: UsernameQuery })
  return { ...result }
}