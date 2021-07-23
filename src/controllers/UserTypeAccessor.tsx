import { useQuery } from "urql";
import { User } from "../models";

const USER_TYPE_QUERY = `
query UserType ($userID:ID) {
    user(id:$userID){
      type
    }
}
`;

const useUserTypeAccessor = (userID: string) => {
    const [result, executeQuery] = useQuery<{ user: User }>({
        query: USER_TYPE_QUERY,
        variables: { userID },
    });
    return result;
};
