import React from 'react';
import styles from "./Calculations.module.scss";
import {Input} from "../input/Input";
import {MAX_LEASING, MAX_PAYMENT, MAX_PRICE, MIN_LEASING, MIN_PAYMENT, MIN_PRICE} from "../../constants/range";
import {useActions, useTypedSelector} from "../../_hooks/redux";
import {setPrice, setPayment, setLeasing} from '../../store/reducers/calculations.slice';

function Calculations() {
    const {price, payment, leasing, loading} = useTypedSelector(state => state.calculations)
    const dispatch = useActions();

    const initialPayment = Math.round(Number(price) * Number(payment) / 100)

    return (
        <div className={styles.inputs}>
            <Input
                loading={loading}
                title={'Стоимость автомобиля'}
                value={price}
                max={MAX_PRICE}
                min={MIN_PRICE}
                onChange={(value) => dispatch(setPrice(value))}
                desc={'₽'}
            />
            <Input
                loading={loading}
                title={'Первоначальный взнос'}
                value={payment}
                initial={initialPayment}
                max={MAX_PAYMENT}
                min={MIN_PAYMENT}
                onChange={(value) => dispatch(setPayment(value))}
                desc={`${payment}%`}
            />
            <Input
                loading={loading}
                title={'Срок лизинга'}
                value={leasing}
                max={MAX_LEASING}
                min={MIN_LEASING}
                onChange={(value) => dispatch(setLeasing(value))}
                desc={'мес.'}
            />
        </div>
    );
}

export default Calculations;