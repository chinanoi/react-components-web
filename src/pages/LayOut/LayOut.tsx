import React from 'react';
import './LayOut.scss';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import MenuItem from 'Src/components/Menu/MenuItem';

const LayOut = () => {

    return (
        <div className="layoutBox">
            <Button buttonType="primary">111</Button>
            <Button buttonType="danger">111</Button>
            <Button buttonType="default">111</Button>
            <Button disabled>111</Button>
            <Button size="lg">111</Button>
            <Button size="sm">111</Button>
            <Menu mode="horizontal">
                <MenuItem>
                    1111
                </MenuItem>
                <MenuItem>
                    1111
                </MenuItem>
                <MenuItem>
                    1111
                </MenuItem>
            </Menu>
            <Menu mode="vertical">
                <MenuItem>
                    1111
                </MenuItem>
                <MenuItem>
                    1111
                </MenuItem>
                <MenuItem>
                    1111
                </MenuItem>
            </Menu>
        </div>
    );
};

export default LayOut;
