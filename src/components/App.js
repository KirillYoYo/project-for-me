import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Nodes from './Nodes/Nodes'

export const App = () => {
    return (
        <Router>
            <Nodes />
            <Routes>
                <Route path="*" element={<div>No content</div>}></Route>
            </Routes>
        </Router>
    )
}
