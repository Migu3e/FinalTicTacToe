import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NameProvider } from '../services/stores/NameSave.tsx';
import '../tra.css';
import Register from '../pages/Register/Register.tsx';
import Login from '../pages/Login/Login.tsx';
import MenuPage from '../pages/Menu/Menu.tsx';
import OneVOne from '../pages/1v1game/1v1.tsx';
import OneVOneMenu from '../pages/1v1menu/OneVSOneMenu.tsx';  // Add this import
import Table from './Scoreboard/ScorebourdTable.tsx';
import OneVPC from '../pages/1v1game/1v1.tsx';

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
        element: <Table />,
    },
    {
        path: "/1v1menu",  // Add this new route
        element: <OneVOneMenu />,
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