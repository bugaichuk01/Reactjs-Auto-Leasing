import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MAX_LEASING, MAX_PAYMENT, MAX_PRICE, MIN_LEASING, MIN_PAYMENT, MIN_PRICE} from "../../constants/range";
import {checkRange} from "../../_utils/checkRange";

interface ICalcState {
    price: number,
    payment: number,
    leasing: number,
    loading: boolean
}

const initialState: ICalcState = {
    price: 3300000,
    payment: 13,
    leasing: 60,
    loading: false
};

export const calculationsSlice = createSlice({
    name: 'calculations',
    initialState,
    reducers: {
        setPrice(state, action: PayloadAction<number>) {
            state.price = checkRange(action.payload, MIN_PRICE, MAX_PRICE);
        },
        setPayment(state, action: PayloadAction<number>) {
            state.payment = checkRange(action.payload, MIN_PAYMENT, MAX_PAYMENT);
        },
        setLeasing(state, action: PayloadAction<number>) {
            state.leasing = checkRange(action.payload, MIN_LEASING, MAX_LEASING);
        },
        setLoading(state) {
            state.loading = true;
            setTimeout(() => {
                state.loading = false;
            }, 2000);
        }
    }
});

export const {setPrice, setPayment, setLeasing, setLoading} = calculationsSlice.actions;

export default calculationsSlice.reducer;