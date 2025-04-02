import { useCallback } from "react";
import { getHomeLists, getSummaryLists } from "../services/apiService";
import { useAppDispatch } from "../store/store";
import { setMonth } from "../store/reducer/common.reducer";
import { toast } from "react-toastify";
import { useContext } from "react";
import { LoaderContext } from "../services/LoaderContext";

export const useFetchSummary = () => {
    const dispatch = useAppDispatch();
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("LoaderContext must be used within a LoaderProvider");
    }

    const { showLoader, hideLoader } = context;

    const fetchSummary = useCallback(async () => {
        const storedFilters = sessionStorage.getItem(btoa("filters"));
        const decodedFilters = storedFilters ? JSON.parse(atob(storedFilters)) : {};
        try {
            showLoader();
            const apiResponse = await getSummaryLists({ filters: decodedFilters });
            if (apiResponse.code === 200) {
                dispatch(setMonth(apiResponse.response?.month as string));
                return apiResponse.response;
            }
        } catch (error) {
            toast.warning("Failed to fetch data.");
        } finally {
            hideLoader();
        }
    }, [dispatch, showLoader, hideLoader]);

    return { fetchSummary };
};

export const useSnapShot = () => {
    const dispatch = useAppDispatch();
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("LoaderContext must be used within a LoaderProvider");
    }

    const { showLoader, hideLoader } = context;

    const fetchSnapShot = useCallback(async () => {
        const storedFilters = sessionStorage.getItem(btoa("filters"));
        const decodedFilters = storedFilters ? JSON.parse(atob(storedFilters)) : {};
        try {
            showLoader();
            const apiResponse = await getHomeLists({ filters: decodedFilters }, "first_page");
            if (apiResponse.code === 200) {
                dispatch(setMonth(apiResponse.response?.month as string));
                return apiResponse.response;
            }
        } catch (error) {
            toast.warning("Failed to fetch data.");
        } finally {
            hideLoader();
        }
    }, [dispatch, showLoader, hideLoader]);

    return { fetchSnapShot };
};

export const useAvailableInfo = () => {
    const dispatch = useAppDispatch();
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("LoaderContext must be used within a LoaderProvider");
    }

    const { showLoader, hideLoader } = context;

    const fetchAvailableInfo = useCallback(async () => {
        const storedFilters = sessionStorage.getItem(btoa("filters"));
        const decodedFilters = storedFilters ? JSON.parse(atob(storedFilters)) : {};
        try {
            showLoader();
            const apiResponse = await getHomeLists({ filters: decodedFilters }, "second_page");
            if (apiResponse.code === 200) {
                dispatch(setMonth(apiResponse.response?.month as string));
                return apiResponse.response;
            }
        } catch (error) {
            toast.warning("Failed to fetch data.");
        } finally {
            hideLoader();
        }
    }, [dispatch, showLoader, hideLoader]);

    return { fetchAvailableInfo };
};


export const useFetchData = () => {
    const dispatch = useAppDispatch();
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("LoaderContext must be used within a LoaderProvider");
    }

    const { showLoader, hideLoader } = context;

    const fetchData = useCallback(async (componentId: "summary" | "snapshot" | "availableInfo") => {
        const storedFilters = sessionStorage.getItem(btoa("filters"));
        const decodedFilters = storedFilters ? JSON.parse(atob(storedFilters)) : {};

        try {
            showLoader();
            let apiResponse;

            switch (componentId) {
                case "summary":
                    apiResponse = await getSummaryLists({ filters: decodedFilters });
                    break;
                case "snapshot":
                    apiResponse = await getHomeLists({ filters: decodedFilters }, "first_page");
                    break;
                case "availableInfo":
                    apiResponse = await getHomeLists({ filters: decodedFilters }, "second_page");
                    break;
                default:
                    throw new Error("Invalid componentId provided");
            }

            if (apiResponse?.code === 200) {
                dispatch(setMonth(apiResponse.response?.month as string));
                return apiResponse.response;
            }
        } catch (error) {
            toast.warning("Failed to fetch data.");
        } finally {
            hideLoader();
        }
    }, [dispatch, showLoader, hideLoader]);

    return { fetchData };
};