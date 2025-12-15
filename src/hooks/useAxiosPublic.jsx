import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://server-iyjtl508u-lishads-projects-69221e56.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
