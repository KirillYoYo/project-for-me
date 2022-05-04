import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RectBg from './RectBg'

export const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Link to="/rects">rects</Link>
                }></Route>
                <Route path="/rects" element={<RectBg />}></Route>
                <Route path="*" element={<div>No content</div>}></Route>
            </Routes>
        </Router>
    )
}
