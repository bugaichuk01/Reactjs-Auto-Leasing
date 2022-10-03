import React, {useState} from 'react';
import {Input} from "./components/input/Input";
import {MAX_LEASING, MAX_PAYMENT, MAX_PRICE, MIN_LEASING, MIN_PAYMENT, MIN_PRICE} from "./constants/range";
import styles from './App.module.scss';
import ClipLoader from "react-spinners/ClipLoader";

function App() {
    const [loading, setLoading] = useState<boolean>(false);

    const [price, setPrice] = useState<number>(3300000);
    const [payment, setPayment] = useState<number>(13);
    const [leasing, setLeasing] = useState<number>(60);

    function checkRange(value: number, min: number, max: number) {
        if (value < min) return min;
        else if (value > max) return max;
        else return value
    }

    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
           setLoading(false);
        }, 2000);
    }

    const checkedPrice = checkRange(price, MIN_PRICE, MAX_PRICE);
    const checkedPayment = checkRange(payment, MIN_PAYMENT, MAX_PAYMENT);
    const checkedLeasing = checkRange(leasing, MIN_LEASING, MAX_LEASING);

    const initialPayment = Math.round(Number(checkedPrice) * Number(checkedPayment) / 100)

    const monthPay = Math.ceil((checkedPrice - initialPayment) * ((3.5 / 100 * Math.pow((1 + 0.035), checkedLeasing)) / (Math.pow((1 + 3.5 / 100), checkedLeasing) - 1)));
    const amountPay = Math.ceil(initialPayment + checkedLeasing * monthPay)

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Рассчитайте стоимость автомобиля в лизинг</h1>
                <div className={styles.inputs}>
                    <Input
                        loading={loading}
                        title={'Стоимость автомобиля'}
                        value={price}
                        max={MAX_PRICE}
                        min={MIN_PRICE}
                        onChange={(value) => setPrice(value)}
                        desc={'₽'}
                    />
                    <Input
                        loading={loading}
                        title={'Первоначальный взнос'}
                        value={payment}
                        initial={initialPayment}
                        max={MAX_PAYMENT}
                        min={MIN_PAYMENT}
                        onChange={(value) => setPayment(value)}
                        desc={`${payment}%`}
                    />
                    <Input
                        loading={loading}
                        title={'Срок лизинга'}
                        value={leasing}
                        max={MAX_LEASING}
                        min={MIN_LEASING}
                        onChange={(value) => setLeasing(value)}
                        desc={'мес.'}
                    />
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottom_item}>
                        <span>Сумма договора</span>
                        <p>{amountPay} ₽</p>
                    </div>
                    <div className={styles.bottom_item}>
                        <span>Ежемесячный платеж</span>
                        <p>{monthPay} ₽</p>
                    </div>
                    <div>
                        <button disabled={loading} onClick={handleLoading}>
                            {loading ? <ClipLoader color={`#fff`} loading={loading} size={35} /> : 'Оставить заявку'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
