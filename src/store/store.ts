import {combineReducers, configureStore} from '@reduxjs/toolkit'
import calculationsReducer from './reducers/calculations.slice';

const rootReducer = combineReducers({
    calculations: calculationsReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>