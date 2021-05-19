import { DocumentNode, gql, useQuery } from "@apollo/client";

// DocumentNode is the query type returned
export const POSTS_QUERY = gql`
    query {
        posts(limit:5){
        title
        }
    }
`;

export interface Post {
    title: string,
    views: number,
    published: boolean,
    createdAt: Date,
    comments: Comment[]
}

export interface Comment {
    body: string,
    post: Post
}

export const usePostQuery = (query: DocumentNode) => {
    const { loading, error, data } = useQuery<{ posts: Post[] }>(query)
    return { loading, error, data }
}