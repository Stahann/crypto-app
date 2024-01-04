import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '../layouts/RootLayout'
import HomePage from '../pages/HomePage'
import Exchanges from '../pages/Exchanges'
import Cryptocurrencies from '../pages/Cryptocurrencies'
import CryptoDetails from '../pages/CryptoDetails'
import News from '../pages/News'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'exchanges', element: <Exchanges /> },
            { path: 'cryptocurrencies', element: <Cryptocurrencies /> },
            { path: 'cryptocurrencies/:coinId', element: <CryptoDetails /> },
            { path: 'news', element: <News /> },
        ],
    },
])
