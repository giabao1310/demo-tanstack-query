import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// dùng axios để thực hiện HTTP GET đến  endpoint API và trả về dữ liệu
const fetchData = async () => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
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

// Hook này sẽ gọi API và trả về dữ liệu
const useFetchData = () => {
    return useQuery({
        // đây là mảng chứa các giá trị (các bài post)
        // dùng để xác định query
        queryKey: ['data'],
        queryFn: fetchData
    });
}

export default useFetchData;