import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
// import Home from './pages/Home';
import './styles/index.scss';

import Button from './components/Button';
import AutoComplete from './components/AutoComplate';

if (module && module.hot) {
    module.hot.accept();
}

const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
    'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name => ({ value: name }));
};


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <Home /> */}
            <AutoComplete fetchSuggestions={handleFetch} />
            <Button>1111</Button>
        </Provider>
    </React.StrictMode>
);
