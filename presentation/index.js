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


const getTranslationUrl = (text) => `https://api-platform.systran.net/translation/text/translate?input=${text}&source=en&target=it&withSource=false&withAnnotations=false&backTranslation=false&encoding=utf-8&key=53db3c6e-55f4-4f0f-971c-ea17891d5d16`;

const appendLine = (el, line) => el.textContent = line + "\n" + el.textContent;

const translateAsync = (text) => Observable.fromPromise(
   () => fetch(getTranslationUrl(text))
        .then((res) => res.json())
        .then((res) => res.outputs[0].output));

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
  secondary: "white"
});

const RxImports = {Rx, Observable, Subject};
const ReactImports = {React, ReactDOM, Component};
const RecomposeImports = { createComponent, createEventHandler };
const stockSources = require("raw!../assets/stocks/stocks.js.asset").split("###");
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
            <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Reactive UI
            </Heading>
            <Heading size={1} fit caps textColor="secondary">
               With Rx and react
            </Heading>
            <Link href="https://github.com/FormidableLabs/spectacle">
              <Text bold caps textColor="tertiary">View on Github</Text>
            </Link>
            <Text textSize="1.5em" margin="20px 0px 0px" bold>Yshay Yaacobi @ Soluto</Text>
            <Text textSize="1.5em" margin="20px 0px 0px" bold>yshayy@gmail.com</Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Agenda
            </Heading>
            <List>
              <ListItem>Introduction to Rx</ListItem>
              <ListItem>Building a sample app</ListItem>
              <Text>All the code is available online</Text>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              About Soluto
            </Heading>
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
              <Runner code={require("raw!../assets/simple-collections/array.js.asset").split("###")} maxLines={7} >
              <ConsoleOutput/>
              </Runner>
              </div>
            <Appear>
              <div>
              <Heading size={6} textColor="secondary">Observable - Collection over time (event based)</Heading>
              <Runner maxLines={7} code={require("raw!../assets/simple-collections/rx.js.asset").split("###")}
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
              imports={{Rx, Observable,
                getTranslationUrl,
                translateAsync,
                appendLine,
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
            <Heading caps fit>Rx timeline</Heading>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Rx ecosystem in React</Heading>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading size={5} textColor="secondary" caps>React Example - Clock</Heading>
            <Runner maxLines={20} code={require("raw!../assets/react/clock.js.asset").split("###")}
              imports={{React, Observable, ReactDOM,
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
              imports={{...RxImports,...ReactImports,...RecomposeImports,
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
        </Deck>
      </Spectacle>
    );
  }
}

