import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOut from './pages/LayOut';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut />,
        children: [
            {
                path: "",
                element: <LayOut />
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
