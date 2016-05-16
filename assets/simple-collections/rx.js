const itemsOverTime = Observable.interval(1000); // [1....2....3....4....5...*...];
itemsOverTime.forEach( x => output.log(x));
