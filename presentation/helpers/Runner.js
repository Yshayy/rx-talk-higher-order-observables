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

const {combineLatest} = Observable;

const objToKeyValueArrays = (o) => R.pipe(R.toPairs,
                                       R.reduce((acc, [key, value]) => ({keys: [...acc.keys, key], values: [...acc.values, value]})
                                                                  , {keys: [], values: []}))(o);


const buildLayout = (maxLines) => (codeView, runButtonView, outputView) => (
  <div style={{position: "relative", backgroundColor: "#2d2d2d", margin: 10 }}>
  <Layout>
      <Fill>
      {codeView}
      </Fill>
      <Fit>
      <div style={{color: "white", height: maxLines * 30, borderLeft: "1px dashed white", paddingLeft: 10, fontSize: 14, textAlign: "left", width: 300 }} >
      <div>Output</div>
      {outputView}
      </div>
      </Fit>
  </Layout>
  <div style={{position: "absolute", top: 10, right: 10}} >{runButtonView}</div>
  </div>
);

const lockKeys = {
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

const createComponentView = ({ children, imports = {}, code, maxLines = 10}) => {
  code = (R.isArrayLike(code) ? code : [code]).map((x) => x.trim());
  const {handler: toggleRunner, stream: runnerToggles$ } = createEventHandler();
  const {code$, view$: codeView$} = createEditor(code);
  const runnerState = runnerToggles$.scan((acc) => !acc).startWith(false);
  const runButtonView$ = runnerState.map((state) => <button style={{backgroundColor: "#2d2d2d"}} onClick={toggleRunner}>{state ? "Pause" : "Run"}</button>);
  const output = children;
  const {keys: variables, values: refs} = objToKeyValueArrays(imports);
  const createrRunner = (currentCode) => (output) => Function("context", ...variables, Babel.transform(currentCode, {
    presets: [ "es2015", "react", "stage-0"]
  }).code)(output, ...refs);
  const output$ = code$.pausable(runnerState).map((c) => {
    return React.cloneElement(output, {
      runner: createrRunner(c)
    });
  }).startWith((<div/>));

  return combineLatest(codeView$, runButtonView$, output$, buildLayout(maxLines));
};

export default pure(createComponent((props$) => {
  return props$
          .flatMap(createComponentView);
}));
