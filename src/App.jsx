import React, { useEffect, useState, useRef } from 'react';
import Timer from './timer.jsx';

const App = () => {
  console.log('app is render...');
  const [sub, setSub] = useState();
  return (<Timer subscr={{sub, setSub}}/>);
};

export default App;
