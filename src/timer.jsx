import './Timer.css';
import React, { useState } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import formatsTime from './secondToForm';

const wait$ = new Subject();
const observable$ = interval(1000).pipe(
  map(value => value + 1),
  takeUntil(wait$),
);

function Timer({ subscr }) {
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);
  const [clickDate, setClickDate] = useState(0);
  
  const { sub, setSub } = subscr;
  

  const handleStart = () => {
    setRun((prew) => !prew);
    if (!run) {
      setSub(observable$.pipe(map(v => v + time)).subscribe(setTime));
    } else {
      sub.unsubscribe();
      setTime(0);
    }
  };
  
  const handleWait = () => {
    setClickDate(new Date());
    console.log(clickDate);
    wait$.next('wait');
    setRun((prew) => !prew);
  }

  const handleReset = () => {
    setRun(true);
    sub.unsubscribe();
    setTime(0);
    setSub(observable$.subscribe(setTime));
  }

  return (
    <div className="App">
      <div className="display">
        <span>{formatsTime(time)}</span>
      </div>
      <button className="start" onClick={handleStart}>Start / Stop</button>
      <button className="wait" onClick={handleWait}>Wait</button>
      <button className="reset" onClick={handleReset} disabled={!time}>Reset</button>
    </div>
  );
}

export default Timer;
