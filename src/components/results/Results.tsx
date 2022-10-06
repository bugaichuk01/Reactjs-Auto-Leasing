import React from 'react';
import styles from "./Results.module.scss";
import ClipLoader from "react-spinners/ClipLoader";
import {useActions, useTypedSelector} from "../../_hooks/redux";
import {setLoading} from '../../store/reducers/calculations.slice';

function Results() {
    const {price, payment, leasing, loading} = useTypedSelector(state => state.calculations)
    const dispatch = useActions();

    const initialPayment = Math.round(Number(price) * Number(payment) / 100)

    const monthPay = Math.ceil((price - initialPayment) * ((3.5 / 100 * Math.pow((1 + 0.035), leasing)) / (Math.pow((1 + 3.5 / 100), leasing) - 1)));
    const amountPay = Math.ceil(initialPayment + leasing * monthPay)

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <span>Сумма договора</span>
                <p>{amountPay} ₽</p>
            </div>
            <div className={styles.item}>
                <span>Ежемесячный платеж</span>
                <p>{monthPay} ₽</p>
            </div>
            <div>
                <button disabled={loading} onClick={() => dispatch(setLoading)}>
                    {loading ? <ClipLoader color={`#fff`} loading={loading} size={35} /> : 'Оставить заявку'}
                </button>
            </div>
        </div>
    );
}

export default Results;