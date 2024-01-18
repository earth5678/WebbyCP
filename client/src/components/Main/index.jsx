import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./styles.module.css";
import Layout from '../pages/Layout';
import User from '../UserManage/UserManage'
import Dashboard from '../Dashboard/Dashboard';
import Food from '../Food/Food';
import Tracking from '../Tracking/Tracking';
import Forbidden from '../Food/Forbidden';
import Chat from '../Chat/DashChat';

export default function Main () {
  return (
    <div className="App">
      <div className="AppGlass">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="food" element={<Food />} />
            <Route path="user" element={<User />} />
            <Route path="forbidden" element={<Forbidden />} />
            <Route path="tracking/" element={<Tracking />} />
            <Route path="chat/*" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
