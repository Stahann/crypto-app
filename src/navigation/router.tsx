import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '../layouts/Root'
import HomePage from '../pages/HomePage'
import Exchanges from '../pages/Exchanges'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'exchanges', element: <Exchanges /> },
            //   { path: 'products/:productId', element: <ProductDetailPage />  }
        ],
    },
])
