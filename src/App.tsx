import { createBrowserRouter, RouterProvider, Link } from  'react-router-dom';
import { Layout, Typography, Space } from 'antd'

import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { router } from './navigation/router';



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
