import { Signup } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={makeLogin} />
        <Route path='/signup' Component={Signup} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
