import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.PROD ? 'https://server-clpyjzjg2-lishads-projects-69221e56.vercel.app' : 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
