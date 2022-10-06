import React from 'react';
import styles from './App.module.scss';
import Calculations from "./components/calculations/Calculations";
import Results from "./components/results/Results";

function App() {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Рассчитайте стоимость автомобиля в лизинг</h1>
                <Calculations />
                <Results />
            </div>
        </div>
    );
}

export default App;
