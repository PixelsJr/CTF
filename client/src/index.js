import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Admin from './pages/admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Marketplace />} />
			<Route path='Profile' element={<Profile />} />
			<Route path='Admin' element={<Admin />} />
		</Routes>
	</BrowserRouter>
);