// Import React
import React, {Component} from "react";
import Runner from "./helpers/Runner";
import ConsoleOutput from "./helpers/outputs/Console";
import DomOutput from "./helpers/outputs/Dom";
import Rx, {Observable, Subject} from "rx";
import { createComponent, createEventHandler } from "rx-recompose";
import ReactDOM from "react-dom";
import "rx-dom";
require("./helpers/inject-op-tooltips");
require("./index.css");

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  background: "#555a5f",
  primary: "#555a5f",
  secondary: "white",
  rx: "#dddddd"
});

const RxImports = {Rx, Observable, Subject};
const ReactImports = {React, ReactDOM, Component};
const RecomposeImports = { createComponent, createEventHandler };
const stockSources = require("raw!../assets/stocks/stocks.js.asset").split("###");
const translateImports = {
  ...RxImports,
  translateAsync: (text) => Observable.fromPromise(
   () => fetch(getTranslationUrl(text))
        .then((res) => res.json())
        .then((res) => res.outputs[0].output)),
  appendLine: (el, line) => el.textContent = line + "\n" + el.textContent
};
const stocksImports = {
  ...RxImports,
  ...ReactImports,
  calculateDiff(oldStock, newStock) {
    return (oldStock && oldStock.price) && Math.round( (
    (newStock.price - oldStock.price) / newStock.price) * 10000) * 0.01;
  },
  fetchStockData(symbol) {
    const url = "http://cors.io/?u=" + encodeURIComponent(`http://finance.google.com/finance/info?client=ig&q=${symbol}`);
    const extractPrice = (txt) => parseFloat(JSON.parse(txt.substr(3))[0].l.replace(/,/g, ""));
    return Observable.fromPromise(() =>
      fetch(url)
      .then(res => res.text())
      .then(txt => ({symbol, price:extractPrice(txt)}))
    );
  }
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="background" >
            <Heading size={1} fit caps lineHeight={1} textColor="rx">
              Reactive UI
            </Heading>
            <Heading size={1} fit caps textColor="rx">
               With Rx and react
            </Heading>
            <Link href="https://github.com/FormidableLabs/spectacle">
              <Text bold caps textColor="tertiary">View on Github</Text>
            </Link>
            <Text textColor="secondary" textSize="1.5em" margin="20px 0px 0px" bold>yshay@soluto.com</Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Agenda
            </Heading>
            <List>
              <ListItem>Introduction to Rx</ListItem>
              <ListItem>Building React UI</ListItem>
              <Appear><ListItem>All the code is available online</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Rx in Soluto
            </Heading>
            <List>
              <Appear><ListItem>Used everywhere web/mobile/backend/tools</ListItem></Appear>
              <Appear><ListItem>Helped us solve complex problems elegantly</ListItem></Appear>
              <Appear><ListItem>Changed our thinking approach to solving problems</ListItem></Appear>
              <Appear><ListItem>Improved our overall adoption of FP concepts</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={4} caps fit textColor="secondary" textFont="primary">
              Let's start with Rx!
            </Heading>
          </Slide>
          <Slide>
          <Heading size={4} caps textColor="secondary" textFont="primary">
              What?
          </Heading>
          <iframe src="http://reactivex.io/" style={{width: "100%", height: 600}} />
          </Slide>
          <Slide>
          <Heading size={4} caps textColor="secondary" textFont="primary">
              What?
          </Heading>
          <List>
            <ListItem>"An API for asynchronous programming with observable streams" (reactivex.io)</ListItem>
            <Appear><ListItem>??</ListItem></Appear>
            <Appear><ListItem>"Rx is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming"
            (reactivex.io)
            </ListItem></Appear>
            <Appear><ListItem>????</ListItem></Appear>
            </List>
          </Slide>
          <Slide>
            <Heading fit caps textColor="secondary" textFont="primary">
                Rx is all about collections!
            </Heading>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary" notes="<ul><li>talk about that</li><li>and that</li></ul>">
              <div>
              <Heading size={6} textColor="secondary">Array - Collection over space (memory based)</Heading>
              <Runner code={require("raw!../assets/simple-collections/array.js.asset").split("###")} maxLines={8} >
              <ConsoleOutput/>
              </Runner>
              </div>
            <Appear>
              <div>
              <Heading size={6} textColor="secondary">Observable - Collection over time (event based)</Heading>
              <Runner maxLines={8} code={require("raw!../assets/simple-collections/rx.js.asset").split("###")}
                imports={{Observable}}
              >
              <ConsoleOutput/>
              </Runner>
              </div>
            </Appear>
          </Slide>
          <Slide transition={["slide"]} bgDarken={0.75}>
            <Text size={1} textColor="secondary" >
                If we look on Event streams as collections...
             </Text>
             <Appear>
             <Text textColor="secondary">
                We can use all our collection tools and knowledge to process events which lead us to...
             </Text>
             </Appear>
             <Appear>
             <Text caps fit textColor="secondary">
                Functional Programming!
             </Text>
             </Appear>
          </Slide>
          <Slide transition={["slide"]} bgDarken={0.75}>
            <Text size={2} textColor="secondary" >
                And that's the essence of RX and reactive programming/frp.
             </Text>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading size={4} textColor="secondary" caps>Translate Example</Heading>
            <Runner maxLines={15} code={require("raw!../assets/translate/translate.js.asset").split("###")}
              imports={{translateImports,
                getInputElement:({elems:{translateExampleInput}}) => translateExampleInput,
                getViewElement:({elems:{translateExampleOutput}}) => translateExampleOutput
              }} >
              <DomOutput>
                  <input type="text" id="translateExampleInput" ></input>
                  <pre style={{maxHeight: 200, overflow: "auto"}} id="translateExampleOutput"></pre>
              </DomOutput>
           </Runner>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps>Rx timeline</Heading>
            <List>
              <ListItem>2007 - Rx is born based on dualizing Iterable/Iterator interfaces</ListItem>
              <Appear><ListItem>2009 - Rx.Net Released </ListItem></Appear>
              <Appear><ListItem>2010 - RxJs</ListItem></Appear>
              <Appear><ListItem>2010 - IObserable & IObserver are standardized in .net 4</ListItem></Appear>
              <Appear><ListItem>2012 - Rx get open-sourced</ListItem></Appear>
            </List>
          </Slide>
          <Slide bgColor="primary" transitionDuration={0} >
            <Heading size={2} caps>Rx timeline </Heading>
            <List>
              <ListItem>2012 - Work started on RxJava</ListItem>
              <Appear><ListItem>2014 - RxJava First Release</ListItem></Appear>
              <Appear><ListItem>2015 - Reactive Streams for Java 9</ListItem></Appear>
              <Appear><ListItem>2015 - Obserable in ECMAScript (stage 1)</ListItem></Appear>
              <Appear><ListItem>2015 - RxJS is rebuilt from scratch (rxjs-5)</ListItem></Appear>
            </List>
          </Slide>
          <Slide bgColor="primary" transitionDuration={0} >
            <Heading size={2} caps>Rx timeline </Heading>
            <List>
              <ListItem>Ports in many languages from ruby to c++</ListItem>
              <Appear><ListItem>Ports in many platforms</ListItem></Appear>
              <Appear><ListItem>Many clones/heavily inspired libs especially in js world</ListItem></Appear>
              <Appear><ListItem>bacon.js, kefir.js, highland.js, most.js, xtream.js</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading size={2} caps>Rx timeline</Heading>
            <List>
              <ListItem>Rx is a bit trending now but it's hardly new</ListItem>
              <Appear><ListItem>Expect Observables to be everywhere in js future</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Rx ecosystem in React</Heading>
            <List>
              <Appear><ListItem>Many libs and approaches</ListItem></Appear>
              <Appear><ListItem>rx-recompose - build HOC with rx</ListItem></Appear>
              <Appear><ListItem>react-cycle - mvi</ListItem></Appear>
              <Appear><ListItem>react-combinators - use observables as props</ListItem></Appear>
              <Appear><ListItem>flux implementations</ListItem></Appear>
              <Appear><ListItem>Redux middleware</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading size={5} textColor="secondary" caps>React Example - Clock</Heading>
            <Runner maxLines={20} code={require("raw!../assets/react/clock.js.asset").split("###")}
              imports={{...RxImports, ...ReactImports,
                getAppContainer: ({elems: {reactClockAppContainer}}) => reactClockAppContainer
              }} >
              <DomOutput>
                  <div id="reactClockAppContainer" ></div>
              </DomOutput>
           </Runner>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading size={5} textColor="secondary" caps>React Example - Counter</Heading>
            <Runner maxLines={20} code={require("raw!../assets/react/counter.js.asset").split("###")}
              imports={{...RxImports, ...ReactImports, ...RecomposeImports,
                getAppContainer: ({elems: {reactCounterAppContainer}}) => reactCounterAppContainer
              }} >
              <DomOutput>
                  <div id="reactCounterAppContainer" ></div>
              </DomOutput>
           </Runner>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading size={5} textColor="secondary" caps>React Example - Stocks</Heading>
            <Runner maxLines={20} code={[stockSources[stockSources.length - 1], ...stockSources]}
              imports={{...stocksImports,
                getAppContainer: ({elems: {reactStocksAppContainer}}) => reactStocksAppContainer
              }} >
              <DomOutput>
                  <div id="reactStocksAppContainer" ></div>
              </DomOutput>
           </Runner>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Text textSize="3.5rem" textColor="secondary">Rx can be used everywhere, but it really shines in</Text>
            <List>
              <Appear><ListItem>Things that related to time</ListItem></Appear>
              <Appear><ListItem>Realtime UI for live data</ListItem></Appear>
              <Appear><ListItem>Complex user intents - drag&drop, long presses, gestures...</ListItem></Appear>
              <Appear><ListItem>Complex async processing</ListItem></Appear>
              <Appear><ListItem>Abstraction</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading>But beware...</Heading>
            <List>
              <Appear><ListItem>Rx has a steep learning curve</ListItem></Appear>
              <Appear><ListItem>Rx can sometime be too smart for it's own good</ListItem></Appear>
              <Appear><ListItem>Rx require a lot of commitment for a library</ListItem></Appear>
              <Appear><ListItem>Don't settle with ugly Rx solutions</ListItem></Appear>
              <Appear><ListItem>Don't forget to dispose your subscriptions</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading>Soluto</Heading>
            <List>
              <Appear><ListItem>Help people enjoy technology</ListItem></Appear>
              <Appear><ListItem>Support, education, empowerment, insights, security</ListItem></Appear>
              <Appear><ListItem>Run on multple platforms and devices</ListItem></Appear>
              <Appear><ListItem>Scale of hundreds of millions</ListItem></Appear>
              <Appear><ListItem>Organizing the first rx-israel meetup soon</ListItem></Appear>
              <Appear><ListItem>And of course, We're hiring...</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Questions</Heading>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Appendix</Heading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

