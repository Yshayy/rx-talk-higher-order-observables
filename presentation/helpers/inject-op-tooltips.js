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
["map", "filter", "switch", "distinctUntilChanged", "flatMap"].reduce((acc, op) => ({[op]: `http://reactivex.io/documentation/operators/images/${op}.png`, ...acc } ), {});

console.log(rxImages);

Rx.Observable.fromEvent(document.body, "mouseover")
             .distinctUntilChanged(e => e.target)
             .debounce(400)
             .filter(e => !Array.from($(e.target).parents()).some(x => x.id === "op-tooltip"))
             .flatMapLatest(e => Observable.just(e.target)
                  .filter(el => el.classList.contains("token"))
                  .map(el => el.textContent)
                  .filter(op => op && rxImages[op])
                  .flatMap(op => Observable.using(() => createToolTip("op-tooltip"), tip => {
                    const el = tip.getValue();
                    const rect = e.target.getBoundingClientRect();
                    $("<img/>").attr("src", rxImages[op])
                               .height(300)
                               .appendTo(el);

                    el.style.top = (rect.top - 320) + "px";
                    el.style.left = rect.left + "px";

                    return Observable.never();
                  })))
             .subscribe();
