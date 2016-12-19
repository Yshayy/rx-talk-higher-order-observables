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
  city: require("../assets/city.jpg")
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

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="background" >
            <Heading size={1} fit caps lineHeight={1} textColor="rx">
              The mysteries of
            </Heading>
            <Heading size={1} fit caps textColor="rx">
               Observables of Observables
            </Heading>
            <Link href="https://github.com/Yshayy/rx-react-meetup">
              <Text bold caps textColor="tertiary">View on Github</Text>
            </Link>
            <Text textColor="secondary" textSize="1.5em" margin="20px 0px 0px" bold>yshay@soluto.com</Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              About me
            </Heading>
            <List>
              <ListItem>Tech lead at Soluto</ListItem>
              <Appear><ListItem>Enthusiastic Rx user for ~4 years</ListItem></Appear>
              <Appear><ListItem>Coding, System Architecture, Programming languages, API design</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Why
            </Heading>
            <List>
              <ListItem>Observables of observable can be diffcult to grasp</ListItem>
              <Appear><ListItem>Flattening an observable is a common operation</ListItem></Appear>
              <Appear><ListItem>Flatmap is not enough</ListItem></Appear>
              <Appear><ListItem>💡 There's an operator for that</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Agenda
            </Heading>
            <List>
              <ListItem>Intro</ListItem>
              <ListItem>Flattening operators</ListItem>
              <Appear><ListItem>All the code is available online</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Example - Counter
            </Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/intro/subscriber.js.asset").split("###")}
              imports={{...RxImports}} >
              <DomOutput>
                  <button id="startButton" >Start</button>
                  <div id="counterView"></div>
              </DomOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Why it's bad
            </Heading>
            <List>
              <ListItem>Callback hell</ListItem>
              <ListItem>Not disposable</ListItem>
              </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Again with flatMap
            </Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/intro/flatmap.js.asset").split("###")}
              imports={{...RxImports}} >
              <DomOutput>
                  <button id="startButton" >Start</button>
                  <div id="counterView"></div>
              </DomOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              flatMap
            </Heading>
            <List>
            <Appear><ListItem>Common concept (bind)</ListItem></Appear>
            <Appear><ListItem>Appears in other types - optionals, tasks, lists</ListItem></Appear>
            <Appear>
            <pre >
                 {`Observable<T>{\nflatMap<U>(f: (t:T) => Observable<U>):Observable<U>\n}
                 `}
            </pre>
            </Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              flatMap
            </Heading>
            <List>
            <Appear><ListItem>Two operations</ListItem></Appear>
            <Appear><ListItem>Map</ListItem></Appear>
            <Appear><ListItem>Merge</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              flatMap
            </Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/intro/mergemap.js.asset").split("###")}
              imports={{...RxImports}} >
              <DomOutput>
                  <button id="startButton" >Start</button>
                  <div id="counterView"></div>
              </DomOutput>
            </Runner>
            </Slide>
         <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              flatMap
            </Heading>
            <List>
            <ListItem>Merge is just one strategy to flat an observable</ListItem>
            <Appear><ListItem>Rx got dedicated operators for handling Higher-order observable</ListItem></Appear>
            <Appear><ListItem>Higher-order observable - observable of observable</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Flattening operators - Lets's start
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Merge
            </Heading>
            <Heading size={4}>mergeAll, flatMap, mergeMap</Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/merge/counter.js.asset").split("###")}
              imports={{...RxImports}} >
              <DomOutput>
                  <button id="startButton" >Start</button>
                  <div id="counterView"></div>
              </DomOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Merge
            </Heading>
            <List>
            <ListItem>Multiple concurrent streams</ListItem>
            <Appear><ListItem>Ordering is lost</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Merge
            </Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/merge/chat.js.asset").split("###")}
              imports={{...RxImports}} >
              <DomOutput>
                  <div id="chatView"></div>
              </DomOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Merge with concurrency limiting
            </Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/merge/download.js.asset").split("###")}
              imports={{...RxImports}} >
              <ConsoleOutput>
              </ConsoleOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Concat
            </Heading>
            <Heading size={4}>Same as merge(1)</Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Concat
            </Heading>
            <Heading size={4}>concatAll, concatMap</Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/concat/counter.js.asset").split("###")}
              imports={{...RxImports}} >
              <DomOutput>
                  <button id="startButton" >Start</button>
                  <div id="counterView"></div>
              </DomOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Concat
            </Heading>
            <List>
            <ListItem>Only one active stream</ListItem>
            <Appear><ListItem>Ordering is perserved</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
          <Heading size={2}>Other worth mentioning</Heading>
          <List>
            <ListItem>combineAll</ListItem>
            <Appear><ListItem>forkJoin</ListItem></Appear>
            <Appear><ListItem>race</ListItem></Appear>
          </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
          <Heading size={2}>Creating Higher order observables</Heading>
          <List>
            <ListItem>map</ListItem>
            <Appear><ListItem>groupBy</ListItem></Appear>
            <Appear><ListItem>window</ListItem></Appear>
          </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
          <Heading size={2}>Summary</Heading>
          <List>
            <ListItem>Higher order Observables are everywhere</ListItem>
            <Appear><ListItem>Flattening Observables is must for using Observables everywhere</ListItem></Appear>
            <Appear><ListItem>Flattening Observables comes with different flavours</ListItem></Appear>
            <Appear><ListItem>Think about the right one the next time you use flatMap</ListItem></Appear>
          </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={1}>Questions</Heading>
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
          <Slide transition={["slide"]} bgDarken={0.75}>
            <Heading caps size={2} textColor="secondary" >
                Definitions
             </Heading>
             <List>
             <ListItem>Event stream == Observable</ListItem>
             <ListItem>Operator - function that return observable from other observable like map, filter, etc...</ListItem>
             </List>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading size={4} textColor="secondary" caps>Translate Example</Heading>
            <Runner maxLines={15} code={require("raw!../assets/translate/translate.js.asset").split("###")}
              imports={{
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
              <Appear><ListItem>2014 - RxJava 1.0</ListItem></Appear>
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
            <Heading size={5} textColor="secondary" caps>Scan operator</Heading>
            <Runner imports={{Observable}} code={require("raw!../assets/scan/scan.js.asset").split("###")} maxLines={8} >
              <ConsoleOutput/>
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
              <Appear><ListItem>Don't give up on Promises</ListItem></Appear>
              <Appear><ListItem>Don't settle with ugly Rx solutions</ListItem></Appear>
              <Appear><ListItem>Don't forget to dispose your subscriptions</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading>Soluto</Heading>
            <List>
              <Appear><ListItem>Help people enjoy technology</ListItem></Appear>
              <Appear><ListItem>Support, knowledge, education, empowerment, insights, security</ListItem></Appear>
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

