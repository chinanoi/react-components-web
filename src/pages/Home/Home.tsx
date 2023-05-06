import React from 'react';
import './Home.scss';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import MenuItem from 'Src/components/Menu/MenuItem';
import Icon from '../../components/Icon';

const Home = () => {

    return (
        <div className="layoutBox">
            {/* <Icon icon="faCoffee" theme="danger" /> */}
            <Icon icon="arrow-down" theme="primary" fontSize="28px" />
            <Icon icon="arrow-down" theme="danger" fontSize="28px" />
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

export default Home;
