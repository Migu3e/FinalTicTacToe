import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NameProvider } from '../services/stores/NameSave.tsx';
import '../tra.css';
import Register from '../View/Register/Register.tsx';
import Login from '../View/Login/Login.tsx';
import MenuPage from '../View/Menu/Menu.tsx';
import OneVOne from '../View/1v1game/1v1.tsx';
import OneVOneMenu from '../View/1v1menu/OneVSOneMenu.tsx';  // Add this import
import Table from './Scoreboard/ScorebourdTable.tsx';
import OneVPC from '../View/1v1game/1v1.tsx';

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