import React from "react";
import {Observable} from "rx";
import { createComponent, createEventHandler } from "rx-recompose";

const doOnSubscribe = (o, action) => Observable.create((sub) => {
  const subscription = o.subscribe(sub);
  action();
  return subscription;
});

const createConsoleObservable = (runner) => {
  const { handler: log, stream: logs$ } = createEventHandler();
  const context = {log,
      info: log,
      error: log,
      warning: log};

  return doOnSubscribe(logs$, () => {
    try {
      runner(context);
    } catch (ex) {
      log("error:" + ex);
    }});
};

export default createComponent((props$) => (props$.flatMapLatest(({runner}) =>
  createConsoleObservable(runner)
  .map((x) => [x])
  .scan((a, b) => [...a, ...b])
  .startWith([])
  )
  .startWith([])
  .map((logs) => (<pre style={{fontSize: "1.1rem"}}>{logs.join("\n")}</pre>))
));

