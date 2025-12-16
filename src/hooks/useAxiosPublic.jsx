import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.PROD ? 'https://server-qes4pztp3-lishads-projects-69221e56.vercel.app' : 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
