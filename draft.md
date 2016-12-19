# Opening
The mysteries of
Observables Of Observables
by yshay@soluto.com
# Why
- Higher order Observables are common and powrful
- FlatMap is not enough
- "There's an operator for that!"  
# About me
- Tech lead at soluto
- Enthusiastic Rx user for ~4 years
- Coding, System Architecture, Programming languages, API design
# Agenda
- Intro
- Flattening Operators
# Intro
- Subscribe that Subscribe
- Why it's bad?
# flatMap
- Solve it, but how?
- Signature
# flatMap
- Two operations, map and merge
- Signatures
# flatMap
- Higher-order observables
- Different ways to map and flat
# merge - behavior
# merge - properties
- Multiple concurrent streams
- Ordering is lost
# merge - example
- Chat
- Parallel async operations* (a lot of network requests)
# merge with concurreny limiting
# concat - behavior
# concat - properties
- Single active stream
- Ordering preserved
- A bit like unbounded queue
# concat example
- Queue
# switch - behavior
# switch - properties
- Single active streams
- Ordering preserved
- Older streams are irrelevant and therfor cancelled
- Old items are dropped
# switch - example
- autocomplete
# exhaust - behavior
# exhaust - properties
- Single active streams
- Ordering preserved
- new streams are not created
# exhaust - example
- profiler
# other worth mentioning
- combineAll - Apply combineLatest on all observables after 
- forkJoin - A bit like promise.all
- race - A bit like amb/promise.race
# creating Higher order Observables
- map
- groupBy
- window
# Closing notes
- Higher order Observables are everywhere
- Flattening Observables is must for using Observables everywhere.
- Flattening Observables comes with different flavours
- Think about the right one the next time you use flatMap.