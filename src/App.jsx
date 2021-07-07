import React, { useState } from 'react';
import Timer from './timer.jsx';

const App = () => {
  const [sub, setSub] = useState();
  return (<Timer subscr={{sub, setSub}}/>);
};

export default App;
