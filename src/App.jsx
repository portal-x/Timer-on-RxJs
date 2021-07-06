import './App.css';
import React, { useEffect, useState } from 'react';
import { interval, Observable, Subject, NEVER, BehaviorSubject, observable } from 'rxjs';
import { takeWhile, takeUntil, switchMap, repeatWhen, startWith, map } from 'rxjs/operators';
import formatsTime from './secondToForm';

const action$ = new Subject();
const reset$ = new Subject();
const wait$ = new Subject();
const observable$ = interval(1000).pipe(
  map(formatsTime),
  takeUntil(wait$),
);

function App() {
  console.log('app is render');
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    console.log('mount');
    const sub = observable$.subscribe(setTime);
    return () => {
      console.log('unmount');
      return sub.unsubscribe()
    };
  }, []);

  // const stopPlay$ = new Subject();
  // const observable$ = interval(1000).pipe(
  //   takeUntil(stopPlay$),
  //   map(formatsTime),
  //   );

  const handleStart = () => {
    setRun((prew) => !prew);
    action$.next('start');
      // const sub = observable$.subscribe(setTime);
  };
  
  const handleWait = () => {
    wait$.next('wait');
  }

  return (
    <div className="App">
      <div className="display">
        {time ? <span>{time}</span> : <span>click on start</span>}
      </div>
      <button className="start" onClick={handleStart}>Start / Stop</button>
      <button className="wait" onClick={handleWait}>Wait</button>
      <button className="reset" onClick={() => reset$.next('reset')}>Reset</button>
    </div>
  );
}

export default App;
