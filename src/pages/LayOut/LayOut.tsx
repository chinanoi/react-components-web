import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './LayOut.module.scss';
import { globalState, increment, decrement } from 'Src/app/globalReducer';
import { useSelector, useDispatch } from 'react-redux';

const LayOut = () => {
    const { count } = useSelector(globalState);
    const dispatch = useDispatch();

    return (
        <div className={styles.layoutBox}>
            <div className="header">
                这是一个脚手架
            </div>
            <div className="rightBox">
                <Outlet />
            </div>
        </div>
    );
};

export default LayOut;
