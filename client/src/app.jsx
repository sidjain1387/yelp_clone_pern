import React from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Restaurantdetail from './routes/Restaurantdetail';
import UpdatePage from './routes/UpdatePage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

function App() {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Fragment>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/restaurant/:id" element={<Restaurantdetail />} />
                            <Route exact path="/restaurant/:id/update" element={<UpdatePage />} />
                        </Routes>
                    </Fragment>
                </Router>
            </div>
        </RestaurantsContextProvider>
    );
}

export default App;