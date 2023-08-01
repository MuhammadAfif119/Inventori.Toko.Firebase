import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupCard from '../component/SignUp';
import SimpleCard from '../component/Homepage';
import Sidebar from '../component/Sidebar';
import CardAll from '../component/card/CardAll';
import Card2 from '../component/card/Card2';
import Detail  from '../component/Detail';
import Card3 from '../component/card/Card3';
import Card4 from '../component/card/Card4';


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SimpleCard />} /> 
      <Route path='/sign-up' element={<SignupCard />} />
      <Route path='/dasboard' element={<Sidebar />} />
      <Route path='/catalog' element={<CardAll />} />
      <Route path='/order' element={<Card2 />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/invoice' element={<Card3 />} />
      <Route path='/our-team' element={<Card4 />} />
    </Routes>
  );
};

export default Router;