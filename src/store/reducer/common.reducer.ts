import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
    beds: string;
    baths: string;
    listingPrice: {
        min: string;
        max: string;
    };
    homeType: {
        single_family: boolean;
        condo: boolean;
        townhouse: boolean;
        multi_family: boolean;
    };
    lotSize: {
        min: string;
        max: string;
    };
    livingArea: {
        min: string;
        max: string;
    };
    month: string;
    cityZip: string;
    exactMatch: boolean;
};

type CommonState = {
    filter: FilterState;
};

const defaultState: CommonState = {
    filter: {
        beds: "Any",
        baths: "Any",
        listingPrice: {
            min: "",
            max: ""
        },
        homeType: {
            single_family: false,
            condo: false,
            townhouse: false,
            multi_family: false
        },
        lotSize: {
            min: "",
            max: ""
        },
        livingArea: {
            min: "",
            max: ""
        },
        month: "",
        cityZip: "",
        exactMatch: false
    }
};

const saveToSessionStorage = (state: CommonState) => {
    sessionStorage.setItem(
        btoa("filters"),
        btoa(JSON.stringify(state.filter))
    );
};

// Load initial state from sessionStorage
const loadFromSessionStorage = (): CommonState => {
    const storedFilters = sessionStorage.getItem(btoa("filters"));
    return storedFilters
        ? { filter: JSON.parse(atob(storedFilters)) }
        : {
              filter: {
                  beds: "Any",
                  baths: "Any",
                  listingPrice: { min: "", max: "" },
                  homeType: {
                      single_family: false,
                      condo: false,
                      townhouse: false,
                      multi_family: false,
                  },
                  lotSize: { min: "", max: "" },
                  livingArea: { min: "", max: "" },
                  month: "",
                  cityZip: "",
                  exactMatch: false,
              },
          };
};

// Initialize state
const initialState: CommonState = loadFromSessionStorage();

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setBeds: (state, action: PayloadAction<string>) => {
            state.filter.beds = action.payload;
            saveToSessionStorage(state);
        },
        setBaths: (state, action: PayloadAction<string>) => {
            state.filter.baths = action.payload;
            saveToSessionStorage(state);
        },
        setListingPriceMin: (
            state,
            action: PayloadAction<string>
        ) => {
            state.filter.listingPrice.min = action.payload;
            saveToSessionStorage(state);
        },
        setListingPriceMax: (
            state,
            action: PayloadAction<string>
        ) => {
            state.filter.listingPrice.max = action.payload;
            saveToSessionStorage(state);
        },
        setHomeType: (
            state,
            action: PayloadAction<{
                single_family: boolean;
                condo: boolean;
                townhouse: boolean;
                multi_family: boolean;
            }>
        ) => {
            state.filter.homeType = action.payload;
            saveToSessionStorage(state);
        },
        setLotSizeMin: (
            state,
            action: PayloadAction<string>
        ) => {
            state.filter.lotSize.min = action.payload;
            saveToSessionStorage(state);
        },
        setLotSizeMax: (
            state,
            action: PayloadAction<string>
        ) => {
            state.filter.lotSize.max = action.payload;
            saveToSessionStorage(state);
        },
        setLivingAreaMin: (
            state,
            action: PayloadAction<string>
        ) => {
            state.filter.livingArea.min = action.payload;
            saveToSessionStorage(state);
        },
        setLivingAreaMax: (
            state,
            action: PayloadAction<string>
        ) => {
            state.filter.livingArea.max = action.payload;
            saveToSessionStorage(state);
        },
        setMonth: (state, action: PayloadAction<string>) => {
            state.filter.month = action.payload;
            saveToSessionStorage(state);
        },
        setCityZip: (state, action: PayloadAction<string>) => {
            state.filter.cityZip = action.payload;
            saveToSessionStorage(state);
        },
        setExactMatch: (state, action: PayloadAction<boolean>) => {
            state.filter.exactMatch = action.payload;
            saveToSessionStorage(state);
        },
        resetFilters: (state) => {
            state.filter = { ...defaultState.filter };
            sessionStorage.removeItem(btoa("filters"));
        }
    }
});

// Export actions
export const {
    setBeds,
    setBaths,
    setListingPriceMin,
    setListingPriceMax,
    setHomeType,
    setLotSizeMin,
    setLotSizeMax,
    setLivingAreaMin,
    setLivingAreaMax,
    setMonth,
    setCityZip,
    setExactMatch,
    resetFilters
} = commonSlice.actions;

// Export reducer
export default commonSlice.reducer;
