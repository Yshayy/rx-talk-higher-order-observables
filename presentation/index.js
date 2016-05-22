// Import React
import React from "react";
import Runner from "./helpers/Runner";
import ConsoleOutput from "./helpers/outputs/Console";
import DomOutput from "./helpers/outputs/Dom";
import Rx, {Observable} from "rx";
import "rx-dom";
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

const createToolTip = () => {
  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.backgroundColor = "rgba(255,255,255, 0.9)";
  el.style.borderRadius = "10px";
  document.body.appendChild(el);
  return {
    getValue() { return el;},
    dispose() { document.body.removeChild(el);}
  };
};


Rx.Observable.fromEvent(document.body, "mouseover")
             .distinctUntilChanged(e=> e.target)
             .debounce(200)
             .flatMapLatest(e => Observable.just(e.target)
                  .filter(el=> el.classList.contains("token"))
                  .map(el => el.textContent)
                  .filter(op => op && !!(Rx.Observable.prototype[op]))
                  .flatMap(op => Observable.using(() => createToolTip(), tip => {
                    const el = tip.getValue();
                    const rect = e.target.getBoundingClientRect();
                    const img = document.createElement("img");
                    img.src = "http://reactivex.io/documentation/operators/images/" + op + ".png";
                    img.style.height = "300px";
                    el.appendChild(img);
                    
                    el.style.top = (rect.top - 350) + "px";
                    el.style.left = rect.left + "px";
                    
                    return Observable.never();
                  })))
             .subscribe();

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
            <List>
              <Appear><ListItem>What?</ListItem></Appear>
              <Appear><ListItem>When?</ListItem></Appear>
              <Appear><ListItem>Why?</ListItem></Appear>
              <Appear><ListItem>How?</ListItem></Appear>
              <Appear><ListItem>...</ListItem></Appear>
              <Appear><ListItem>...</ListItem></Appear>
              <Appear><ListItem>Profit!</ListItem></Appear>
            </List>
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
            <Heading size={4} caps textColor="secondary" textFont="primary">
                What?
            </Heading>
            <Text>Rx is all about collections!</Text>
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
            <Text size={1} >
                If we look on Event streams as collections...
             </Text>
             <Appear>
             <Text>
                We can use all our collection tools and knowledge to process events which lead us to...
             </Text>
             </Appear>
             <Appear>
             <Text caps fit>
                Functional Programming!
             </Text>
             </Appear>
          </Slide>
          <Slide transition={["slide"]} bgDarken={0.75}>
            <Text size={3} caps >
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
                getInputElement:(context) => context.elems.translateExampleInput,
                getViewElement:(context) => context.elems.translateExampleOutput
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
        </Deck>
      </Spectacle>
    );
  }
}

