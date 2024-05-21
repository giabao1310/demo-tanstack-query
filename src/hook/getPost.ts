import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const getPost = async ({ pageParam = 1 }) => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _page: pageParam,
                _limit: 10
            }
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error: ', error.message);
        } else {
            console.error('Unexpected error: ', error);
        }
        throw error;
    }
}

const useGetPost = () => {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPost,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return undefined;
            return pages.length + 1;
        },
        initialPageParam: 1
    });
}

const usePostsSelector = () => {
    return useQueryClient().getQueryData(['posts']);
}

export default useGetPost;