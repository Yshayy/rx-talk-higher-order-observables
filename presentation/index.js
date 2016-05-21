// Import React
import React from "react";
import ConsoleRunner from "./helpers/ConsoleRunner";
import {Observable} from "rx";
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
              <Heading size={6} textColor="secondary">Array - Collection (pull, memory based)</Heading>
              <ConsoleRunner code={require("raw!../assets/simple-collections/array.js.asset").split("###")} maxLines={7} />
              </div>
            <Appear>
              <div>
              <Heading size={6} textColor="secondary">Observable - Collection (push, time/event based)</Heading>
              <ConsoleRunner maxLines={7} code={require("raw!../assets/simple-collections/rx.js.asset").split("###")}
                imports={{Observable}}
              />
              </div>
            </Appear>
          </Slide>
          <Slide transition={["slide"]}  bgDarken={0.75}>
            <Text size={1} >
                If we look on Events as collections...
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
                Make no mistake, Rx observables relate to functional programming as much as reactive programming.
             </Text>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Flexible Layouts</Heading>
            <Layout>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Left
                </Heading>
              </Fill>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Right
                </Heading>
              </Fill>
            </Layout>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
