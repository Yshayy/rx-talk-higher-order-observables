import React from "react";
import { createComponent, createEventHandler } from "rx-recompose";
import { pure } from "recompose";
import R from "ramda";
import {Observable} from "rx";
import * as Babel from "babel-standalone";
import {
  Fit,
  Fill,
  Layout,
  CodePane
} from "spectacle";

const {just, combineLatest} = Observable;

const objToKeyValueArrays = (o) => R.pipe(R.toPairs,
                                       R.reduce((acc, [key, value]) => ({keys: [...acc.keys, key], values: [...acc.values, value]})
                                                                  , {keys: [], values: []}))(o);

const doOnSubscribe = (o, action) => Observable.create((sub) => {
  const subscription = o.subscribe(sub);
  action();
  return subscription;
});

const createConsoleObservable = ({imports, code}) => {
  const {keys: variables, values: refs} = objToKeyValueArrays(imports);
  const { handler: log, stream: logs$ } = createEventHandler();
  const run = () => Function("output", ...variables, Babel.transform(code, {
    presets: [ "es2015", "react", "stage-0"]
  }).code)(
    {
      log,
      info: log,
      error: log,
      warning: log}, ...refs);
  return doOnSubscribe(logs$, () => {
    try {
      run();
    } catch (ex) {
      log("error:" + ex);
    }});
};

const buildLayout = (maxLines) => (codeView, runButtonView, logsView) => (
  <div style={{position: "relative", backgroundColor: "#2d2d2d", margin: 10 }}>
  <Layout>
      <Fill>
      {codeView}
      </Fill>
      <Fit>
      <div style={{color: "white", height: maxLines * 30, borderLeft: "1px dashed white", paddingLeft: 10, fontSize: 14, textAlign: "left", width: 300 }} >
      <div>Console</div>
      {logsView}
      </div>
      </Fit>
  </Layout>
  <div style={{position: "absolute", top: 10, right: 10}} >{runButtonView}</div>
  </div>
);

let lockKeys = {
  onKeyUp(e) {e.stopPropagation();},
  onKeyPress(e) {e.stopPropagation();},
  onKeyDown(e) {e.stopPropagation();}
};

const createEditor = (code) => {
  const {handler: updateCode, stream: codeUpdates$ } = createEventHandler();
  const {handler: refresh, stream: refreshActions$ } = createEventHandler();
  const code$ = codeUpdates$.startWith(code[0]);
  let currentRef = null;
  const view$ = refreshActions$.map((x, i) => i).startWith(null)
                .withLatestFrom(code$,
                 (key, currentCode) =>
                 (
                   <div>
                   <div style={{ textAlign: "left", wordBreak: "break-all"}}>{code.map((c, i) => <button key={i} style={{marginLeft: 10, backgroundColor: "#2d2d2d", fontSize: 12 }}
                    onClick={ (e) => {updateCode(c); refresh();}} >{i + 1}</button>)}</div>
                   <div key={key} contentEditable ref={ (e) => {
                     if (!e) { return; }
                     currentRef = e;
                   }
  } {...lockKeys} onInput={ (e) => updateCode(currentRef.textContent)} onBlur={refresh} >
  <CodePane textSize="1.15rem" lang="jsx" source={currentCode} /></div></div>));
  return {
    code$,
    view$
  };
};

const createComponentView = ({ imports = {}, code, maxLines = 10}) => {
  code = (R.isArrayLike(code) ? code : [code]).map((x) => x.trim());
  const {handler: toggleRunner, stream: runnerToggles$ } = createEventHandler();
  const {code$, view$: codeView$} = createEditor(code);
  const runnerState = runnerToggles$.scan((acc) => !acc).startWith(false);
  const runView$ = runnerState.map((state) => <button style={{backgroundColor: "#2d2d2d"}} onClick={toggleRunner}>{state ? "Pause" : "Run"}</button>);
  const logsView$ = code$.pausable(runnerState).flatMapLatest((c) =>
                                createConsoleObservable({ imports, code: c})
                                .map((x) => [x])
                                .scan((a, b) => [...a, ...b])
                                .startWith([])
                                )
                                .startWith([])
                                .map((logs) => (
                                  <pre style={{fontSize: "1.1rem"}}>{logs.join("\n")}</pre>));

  return combineLatest(codeView$, runView$, logsView$, buildLayout(maxLines));
};

export default pure(createComponent((props$) => {
  return props$
          .flatMap(createComponentView);
}));
