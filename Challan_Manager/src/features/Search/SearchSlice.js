import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    radio : 'vehicle',
    vehicleNo: '',
    chassisNo: '',
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setRadio: (state, {payload}) => {
            state.radio = payload;
        },
        setVehicleNo: (state, {payload}) => {
            state.vehicleNo = payload;
        },
        setChassisNo: (state, {payload}) => {
            state.chassisNo = payload;
        }
    }
});


export const { setRadio, setVehicleNo,setChassisNo } = searchSlice.actions;
export const getRadio = (state) => state.search.radio;
export const getVehicleNo = (state) => state.search.vehicleNo;
export const getChassisNo = (state) => state.search.chassisNo;

export default searchSlice.reducer;