import './App.css';
// import useURLLoader from './hooks/useURLLoader';
import React, { useRef, useState, useEffect, useTransition, Suspense } from 'react';
import DogShow from './components/DogShow/DogShow';
import Todo from './components/Todo/Todo';


interface IShowResult {
    message: string;
    status: string;
}

interface IThemeProps {
    [key: string]: { color: string; background: string; };
}

const theme: IThemeProps = {
    light: {
        color: '#000',
        background: 'red'
    },
    dark: {
        color: '#fff',
        background: '#000'
    }
};

export const ThemeContext = React.createContext(theme.light);


function App() {

    const didMountRef = useRef(false);
    const domRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState('');
    const [searchDate, setSearchDate] = useState<number[]>([]);
    const [show, setShow] = useState(true);
    const [isPending, startTransition] = useTransition();
    // const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show]);
    // const dogResult = data as IShowResult;

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        startTransition(() => {
            const arr = Array.from({ length: 10000 }, (_, i) => new Date().getTime() + i);
            setSearchDate(arr);
        });
    };

    useEffect(() => {
        if (didMountRef.current) {
            console.log('this is update ');
        } else {
            didMountRef.current = true;
        }
    });
    return (
        <div className="App">
            <Suspense fallback={<h1>loading image ...</h1>}>
                <DogShow />
            </Suspense>
            <Suspense fallback={<h1>loading todo ...</h1>}>
                <Todo />
            </Suspense>
            <input type="text" onChange={updateInput} />
            {isPending && <h1>⏳</h1>}
            {searchDate.map((item) => (
                <option key={item}>{item}</option>
            ))}
            <ThemeContext.Provider value={theme.light}>
                <input type="text" ref={domRef} />
                <button onClick={() => { setShow(!show); }}>refresh dog image</button>
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
