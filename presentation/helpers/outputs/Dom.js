import React from "react";
import {Observable} from "rx";
import { createComponent, createEventHandler } from "rx-recompose";
import R from "ramda";
import {renderToString} from "react-dom/server";
import "./dom.css";

const render = (runner, children) => {
  const str = renderToString(<div>{children}</div>);
  const onComponentLoad = (e) => {
    if (!e) {return;}
    let elems = R.fromPairs(Array.from(e.querySelectorAll("*")).filter(el => !!(el.id)).map(el => ([el.id, el])));
    runner({elems});
  };
  return (<div key={new Date()} className="domoutput"
    dangerouslySetInnerHTML= {{__html: str}}
    ref={onComponentLoad}
          />);
};

export default createComponent((props$) => (props$.map(({runner, children}) =>
  render(runner, children)))
  );
