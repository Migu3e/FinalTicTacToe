import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NameProvider } from './NameSave';
import './tra.css';
import Register from './Register/Register';
import Login from './Login/Login';
import MenuPage from './Menu/Menu';
import OneVOne from './1v1/1v1';
import Scoreboard from './Scoreboard/Scorebourd';
import OneVPC from './1vPC/1vPC';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/menu",
        element: <MenuPage />,
    },
    {
        path: "/scoreboard",
        element: <Scoreboard />,
    },
    {
        path: "/1v1",
        element: <OneVOne />,
    },
    {
        path: "/1vpc",
        element: <OneVPC />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <NameProvider>
            <RouterProvider router={router} />
        </NameProvider>
    </React.StrictMode>
);