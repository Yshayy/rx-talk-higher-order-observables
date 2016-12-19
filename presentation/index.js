// Import React
import React, {Component} from "react";
import Runner from "./helpers/Runner";
import ConsoleOutput from "./helpers/outputs/Console";
import DomOutput from "./helpers/outputs/Dom";
import Rx, {Observable, Subject} from "rx";
import { createComponent, createEventHandler } from "rx-recompose";
import ReactDOM from "react-dom";
import "rx-dom";
require("./index.css");
Observable.prototype.exhaust = Observable.prototype.switchFirst;
Observable.prototype.exhaustMap = Observable.prototype.flatMapFirst;

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
  voldermort : require("../assets/higher/merge/voldermort.png").replace("/", ""),
  vader : require("../assets/higher/merge/vader.png").replace("/", ""),
  drevil : require("../assets/higher/merge/drevil.png").replace("/", "")
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
            <Link href="https://github.com/Yshayy/rx-talk-higher-order-observables">
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
              <Appear><ListItem>Flattening operators</ListItem></Appear>
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
              <Appear><ListItem>Not disposable</ListItem></Appear>
              <Appear><ListItem>Diffcult to pass around</ListItem></Appear>
              </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} textColor="secondary" textFont="primary">
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
            <Heading size={2} textColor="secondary" textFont="primary">
              flatMap
            </Heading>
            <List>
              <ListItem>Common concept (Monad.bind)</ListItem>
              <ListItem>Appears in other types - optionals, tasks, lists</ListItem>
              <ListItem>Used for chaining</ListItem>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} textColor="secondary" textFont="primary">
              flatMap (Rx)
            </Heading>
            <List>
            <Appear><ListItem>Two operations</ListItem></Appear>
            <Appear><ListItem>Map</ListItem></Appear>
            <Appear><ListItem>Merge</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} textColor="secondary" textFont="primary">
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
            <Heading size={2} textColor="secondary" textFont="primary">
              flatMap
            </Heading>
            <List>
            <ListItem>Merge is just one strategy to flat an observable</ListItem>
            <Appear><ListItem>Rx has dedicated operators for handling Higher-order observables</ListItem></Appear>
            <Appear><ListItem>Higher-order observable - observable of observable</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Flattening operators - Let's start
            </Heading>
          </Slide>
          <Slide>
            <Image src="http://reactivex.io/rxjs/img/mergeAll.png" width={600} />
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Merge
            </Heading>
            <Heading size={6} textColor="secondary">mergeAll/flatMap/mergeMap/selectMany</Heading>
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
              Merge - Example
            </Heading>
            <Heading size={6} textColor="secondary">Chat</Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/merge/chat.js.asset").split("###")}
              imports={{...RxImports,
                    getActiveVillains() {
                      return Observable.of("drevil",
                          "vader",
                          "voldermort");
                    },
                    listen(name) {
                      if (name === "drevil") {
                        return Observable.defer(() => Observable.of(
                                   Observable.just({name, says: "One million dollars"}).delay(1000),
                                   Observable.just({name, says: "\"Lazer\""}).delay(500),
                                   Observable.just({name, says: "One hundred billion dollars"}).delay(2000),
                                   Observable.empty().delay(2000)
                                )).concatAll().repeat(3);
                      }
                      if (name === "vader") {
                        return Observable.defer(() => Observable.of(
                                   Observable.just({name, says: "I find your lack of faith disturbing"}).delay(1500),
                                   Observable.just({name, says: "I am your father"}).delay(400),
                                   Observable.empty().delay(4000)
                                )).concatAll().repeat(3);
                      }
                      if (name === "voldermort") {
                        return Observable.defer(() => Observable.of(
                                   Observable.just({name, says: "Harry Potter"}).delay(3500),
                                   Observable.just({name, says: "AVADA KEDAVRA!"}).delay(1500),
                                )).concatAll().repeat(3);
                      }
                      return Observable.empty();
                    },
                    appendLine(chatView, {name, says}) {
                      chatView.innerHTML += `<div><img src="${images[name]}" /> : ${says}</div>`;
                    }
              }} >
              <DomOutput>
                    <div style={{marginTop: 40, overflowY:"auto"}} id="chatView"></div>
              </DomOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Merge with concurrency limiting
            </Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/merge/download.js.asset").split("###")}
              imports={{...RxImports,
                  getListOfSitesToDownload() {
                    return Observable.defer(() => Observable.range(1, 10));
                  },
                  download(context, site) {
                    return Observable.defer(() => {
                      context.log("Downloading site:" + site);
                      const size = Math.ceil(Math.random() * 4096) + 1000;
                      const downloaded = {length: size * 100};
                      return Observable.of(downloaded).delay(size).tap(() => context.log("Completed site:" + site));
                    });
                  }
              }} >
              <ConsoleOutput>
              </ConsoleOutput>
            </Runner>
          </Slide>

          <Slide>
            <Image src="http://reactivex.io/rxjs/img/concatAll.png" width={600} />
          </Slide>

          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Concat
            </Heading>
            <Heading size={4} textColor="secondary">Same as merge(1)</Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Concat
            </Heading>
            <Heading size={4} textColor="secondary">concatAll, concatMap</Heading>
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
            <Appear><ListItem>A bit like unbounded queue</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Concat - Example
            </Heading>
            <Heading size={4} textColor="secondary">Funds transfer</Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/concat/bank.js.asset").split("###")}
              imports={{...RxImports,
              transfer(amount, context) {
                context.amount -= parseInt(amount);
                return Observable.just(context.amount).delay(2000);
              },
              enrich(x) {
                return Observable.just(x).delay(Math.random() * 5000 + 1000);
              }
            }} >
              <DomOutput>
                  <div>
                  <input id="amountInput" style={{width:60}} value="5" /><button id="transferButton">transfer</button>
                  </div>
                  <div id="balanceView">1000</div>
              </DomOutput>
            </Runner>
          </Slide>

          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
              <Heading size={2}>Questions so far?</Heading>
          </Slide>

          <Slide>
            <Image src="http://reactivex.io/rxjs/img/switch.png" width={600} />
          </Slide>

          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Switch
            </Heading>
            <Heading size={6} textColor="secondary">switchMap, flatMapLatest, selectSwitch</Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/switch/counter.js.asset").split("###")}
              imports={{...RxImports}} >
              <DomOutput>
                  <button id="startButton" >Start</button>
                  <div id="counterView"></div>
              </DomOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Switch
            </Heading>
            <List>
            <ListItem>Only one active stream</ListItem>
            <Appear><ListItem>Ordering is perserved</ListItem></Appear>
            <Appear><ListItem>Older streams are irrelevant and therfore cancelled</ListItem></Appear>
            <Appear><ListItem>** Items are dropped</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Switch - Example
            </Heading>
            <Heading size={4} textColor="secondary">Autosuggest</Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/switch/Autosuggest.js.asset").split("###")}
              imports={{...RxImports,
              getMovies(q) {
                if (q.length === 0) return Observable.empty();
                return Observable.defer(()=>{
                   return fetch("http://api.themoviedb.org/3/search/movie?api_key=9eae05e667b4d5d9fbb75d27622347fe&query=" + q).then(x=>x.json());
                }).map(x=>x.results.map(m=>m.title)); 
              },
              displayTitles(titles, resultsView) {
                return resultsView.innerHTML = titles.map(m=>`<div>${m}</div>`).join("");
              }
            }} >
              <DomOutput>
                  <input id="searchInput" placeholder="Enter movie title..." />
                  <div id="resultsView"></div>
              </DomOutput>
            </Runner>
          </Slide>

          <Slide>
            <Image src="http://reactivex.io/rxjs/img/exhaust.png" width={600} />
          </Slide>

          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Exhaust
            </Heading>
            <Heading size={6} textColor="secondary">exhaust, flatMapFirst, switchFirst</Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/exhaust/counter.js.asset").split("###")}
              imports={{...RxImports}} >
              <DomOutput>
                  <button id="startButton" >Start</button>
                  <div id="counterView"></div>
              </DomOutput>
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Exhaust
            </Heading>
            <List>
            <ListItem>Only one active stream</ListItem>
            <Appear><ListItem>Ordering is perserved</ListItem></Appear>
            <Appear><ListItem>New streams are not created until active one finish</ListItem></Appear>
            <Appear><ListItem>** Items are dropped</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Exhaust - Example
            </Heading>
            <Heading size={4} textColor="secondary">Screen share</Heading>
            <Runner maxLines={15} code={require("raw!../assets/higher/exhaust/screenshare.js.asset").split("###")}
              imports={{...RxImports,
              screenCapture(){
                 return Observable.just(1).expand((i)=> Observable.just(i+1).delay(20));
              },
              sendScreen(screen, context) {
                  return Observable.defer(()=> {
                    context.log("start sending screen");
                    const delay = (Math.ceil(Math.random() * 1000) + 300);
                    return Observable.just(screen).delay(delay);
                  });
              }
            }} >
              <ConsoleOutput />
            </Runner>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="secondary" textFont="primary">
              Operators summary
            </Heading>
            <List>
              <ListItem>Merge - Concurrent, unordered, all items</ListItem>
              <ListItem>Concat - 1 active stream, ordered, all items</ListItem>
              <ListItem>Switch - 1 active stream, ordered, drop old streams</ListItem>
              <ListItem>Exhaust - 1 active stream, ordered, ignore new streams</ListItem>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
          <Heading size={2}>Other worth mentioning</Heading>
          <List>
            <ListItem>combineAll - combileLatest on all inner observables</ListItem>
            <Appear><ListItem>concatEager - concurrent but items emitted in order</ListItem></Appear>
            <Appear><ListItem>forkJoin - a bit like promise.all()</ListItem></Appear>
            <Appear><ListItem>race/amb - a bit like promise.race()</ListItem></Appear>
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
            <Appear><ListItem>Flattening Observables comes with different flavours</ListItem></Appear>
            <Appear><ListItem>Think about the right one the next time you use flatMap</ListItem></Appear>
          </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="background" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={1}>Questions</Heading>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Appendix</Heading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

