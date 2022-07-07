import { useSelector } from "react-redux";

export const useUser = () => {
    return useSelector((state) => state.user);
};

export const useMode = () => {
    return useSelector((state) => state.mode);
};
