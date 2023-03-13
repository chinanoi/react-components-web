import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOut from './pages/LayOut';
import Home from './pages/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut />,
        children: [
            {
                path: "",
                element: <Home />
            }
        ],
    }
]);

function App() {

    return (
        <RouterProvider router={router} />
    );
}

export default App;
