import React from 'react';
import styles from './LayOut.module.scss';
import Button from '../../components/Button';

const LayOut = () => {

    return (
        <div className={styles.layoutBox}>
            <Button buttonType="primary">111</Button>
            <Button buttonType="danger">111</Button>
            <Button buttonType="default">111</Button>
            <Button disabled>111</Button>
            <Button size="lg">111</Button>
            <Button size="sm">111</Button>
        </div>
    );
};

export default LayOut;
