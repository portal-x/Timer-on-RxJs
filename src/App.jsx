import './App.css';
import React, { useState } from 'react';
import { interval, Observable, Subject, NEVER, BehaviorSubject } from 'rxjs';
import { takeWhile, takeUntil, switchMap, repeatWhen, startWith } from 'rxjs/operators';
import formatsTime from './secondToForm';

function App() {
  console.log('app is render');
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);

  const stopPlay$ = new Subject();
  // stopPlay$.subscribe(v => console.log('sub:', v));
  const observable$ = interval(1000).pipe(takeUntil(stopPlay$));

  const handleStart = () => {
    setRun((prew) => !prew);
      observable$.subscribe((v) => setTime(formatsTime(v)));
      // if (run) {
      //   console.log('unsubscribe');
      //   stopPlay$.next();
      // }
  };

  const handleWait = () => {
    stopPlay$.next(true);
    console.log('unsubscribe');
  }

  return (
    <div className="App">
      <div className="display">
        {time ? <span>{time}</span> : <span>click on start</span>}
      </div>
      <button className="start" onClick={handleStart}>Start / Stop</button>
      <button className="wait" onClick={handleWait}>Wait</button>
      <button className="reset">Reset</button>
    </div>
  );
}

export default App;
