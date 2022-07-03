import React from 'react';
import fetchData from '../../utils/fetchData';

const data = fetchData('https://dog.ceo/api/breeds/image/random');

const DogShow: React.FC = () => {
    const dogData = data.read();
    return (
        <div>
            <img style={{ width: '100px', height: '100px' }} src={dogData.message} alt="" />
        </div>
    );
};

export default DogShow;
