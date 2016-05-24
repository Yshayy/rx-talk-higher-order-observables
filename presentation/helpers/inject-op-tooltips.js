import Rx, {Observable} from "rx";
import "rx-dom";
import $ from "jquery";

const createToolTip = (id) => {
  const $el = $("<div/>").attr("id", id).css({
    position: "fixed",
    backgroundColor: "rgba(255,255,255, 0.9)",
    borderRadius: "10px"
  }).appendTo(document.body);
  return {
    getValue() { return $el.get(0);},
    dispose() { $el.remove();}
  };
};

const rxImages =
["map", "mergeAll", "interval", "Catch", "just", "startWith", "debounce", "merge", "combineLatest", "scan", "filter", "switch", "distinctUntilChanged", "flatMap"].reduce((acc, op) => ({[op.toLowerCase()]: `http://reactivex.io/documentation/operators/images/${op}.png`, ...acc } ), {});

Rx.Observable.fromEvent(document.body, "mousemove")
             .distinctUntilChanged(e => e.target)
             .debounce(400)
             .filter(e => !Array.from($(e.target).parents()).some(x => x.id === "op-tooltip"))
             .flatMapLatest(e => Observable.just(e.target)
                  .filter(el => el.classList.contains("token"))
                  .map(el => el.textContent)
                  .map(op => op && op.toLowerCase())
                  .filter(op => op && rxImages[op])
                  .flatMap(op => Observable.using(() => createToolTip("op-tooltip"), tip => {
                    console.log("creating tooltip");
                    const el = tip.getValue();
                    //const {top} = e.target.getBoundingClientRect();
                    const $target = $(e.target);
                    const top = $target.position().top + (($target.offset().top - $target.position().top) / 2) + ($target.outerHeight() * 1.5);
                    console.log(top);
                    el.style.top = (top) + "px"; 
                    
                    $(el).appendTo(e.target);
                    
                    $("<img/>").attr("src", rxImages[op])
                               .width(400)
                               .appendTo(el);

                    return Observable.never();
                  })))
             .subscribe();
