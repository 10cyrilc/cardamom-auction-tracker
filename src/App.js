import React from 'react';

import {Nav, Foot} from "./component/Bars"
import Price from "./component/Price";

function App() {

  return (
    <div className="bodyContent">
      <Nav />
      <Price />
      <Foot />
    </div>
  )
}

export default App
