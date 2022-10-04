import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    value: number;
    onChange: (e: number) => void;
    min: number;
    max: number;
    desc: string;
    initial?: number;
    title: string;
    loading: boolean
}

export const Input: React.FC<InputProps> = ({value, onChange, min, max, desc, initial, title, loading}) => {
    const handleBlur = () => {
        if (value < min) onChange(min);
        else if (value > max) onChange(max);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value))
    }

    return (
        <div className={styles.container} style={loading ? {opacity: '0.4'} : {}}>
            <div className={styles.title}>{title}</div>
            <div className={styles.wrapper}>
                <input
                    disabled={loading}
                    className={styles.input}
                    type="text"
                    value={initial ? initial : value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className={initial ? styles.initial : styles.desc}>{desc}</div>
                {initial ? <span className={styles.box}/> : null}
                <input
                    disabled={loading}
                    className={styles.range}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
