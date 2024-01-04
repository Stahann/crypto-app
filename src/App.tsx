import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

import './App.css'
import { router } from './navigation/router'

function App() {
    return <RouterProvider router={router} />
}

export default App
