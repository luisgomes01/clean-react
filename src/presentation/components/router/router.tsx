import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={factory.makeLogin} />
        <Route path='/signup' Component={factory.makeSignup} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
