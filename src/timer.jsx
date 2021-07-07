import './Timer.css';
import React, { useEffect, useState, useRef } from 'react';
import { interval, Observable, Subject, NEVER, BehaviorSubject, observable } from 'rxjs';
import { takeWhile, takeUntil, switchMap, repeatWhen, startWith, map, scan, skipWhile, share } from 'rxjs/operators';
import formatsTime from './secondToForm';

// const wait$ = new Subject();
// const observable$ = interval(1000).pipe(
//   // startWith(10),
//   map(value => value + 1),
//   takeUntil(wait$),
// );

const wait$ = new Subject();
const reset$ = new Subject();

function Timer({ subscr }) {
  console.log('body is render');
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);
  
  const { sub, setSub } = subscr;
  
  const observable$ = interval(1000).pipe(
    map(value => value + time),
    takeUntil(wait$),
    // repeatWhen(reset$)
  );

  const handleStart = () => {
    setRun((prew) => !prew);
    if (!run) {
      setSub(observable$.subscribe(setTime));
    } else {
      sub.unsubscribe();
      setTime(0);
    }
    
  };
  
  const handleWait = () => {
    wait$.next('wait');
    setRun((prew) => !prew);
  }

  const handleReset = () => {
    sub.unsubscribe();
    setTime(0);
    setSub(observable$.pipe(
      repeatWhen(reset$),
    ).subscribe(setTime));
    setRun((prew) => !prew);
    reset$.next('reset')
  }

  return (
    <div className="App">
      <div className="display">
        <span>{formatsTime(time)}</span>
      </div>
      <button className="start" onClick={handleStart}>Start / Stop</button>
      <button className="wait" onClick={handleWait}>Wait</button>
      <button className="reset" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
