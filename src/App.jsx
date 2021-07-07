import React, { useState } from 'react';
import Timer from './Timer.jsx';

const App = () => {
  const [sub, setSub] = useState();
  return (
    <div>
      <Timer subscr={{ sub, setSub }} />
      <footer>
        Юрий Ткачук
        <p>
          <a href="mailto:papirus.borzna@gmail.com">papirus.borzna@gmail.com</a>
          &nbsp;
          <a href="https://github.com/portal-x/itop">GitHub</a>
          &nbsp;
          <a href="https://t.me/Yurii_Tkachuk">Telegram</a>
        </p>
        <span>380976066430</span>
      </footer>
    </div>
  );
};

export default App;
