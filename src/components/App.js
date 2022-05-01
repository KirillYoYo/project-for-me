import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Nodes from './Nodes/Nodes'

export const App = () => {
    return (
        <Router>
            <Link to="/about">L</Link>
            <Routes>
                <Nodes />
                <Route path="*" element={<div>No content</div>}></Route>
            </Routes>
        </Router>
    )
}
