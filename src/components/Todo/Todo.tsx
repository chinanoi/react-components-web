import React from 'react';
import fetchData from '../../utils/fetchData';

const data = fetchData('https://jsonplaceholder.typicode.com/todos/1');

const Todo: React.FC = () => {
    const todoData = data.read();
    return (
        <div>
            <h1>{todoData.title}</h1>
        </div>
    );
};

export default Todo;
