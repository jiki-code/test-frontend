import React from 'react';
import {Toaster, toast} from 'sonner';
import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';


function App() {
  return (
    <>
    <Toaster richColors />
      <BrowserRouter>
        <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<HomePage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App