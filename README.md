phosphor-queue
==============

[![Build Status](https://travis-ci.org/phosphorjs/phosphor-queue.svg)](https://travis-ci.org/phosphorjs/phosphor-queue?branch=master)
[![Coverage Status](https://coveralls.io/repos/phosphorjs/phosphor-queue/badge.svg?branch=master&service=github)](https://coveralls.io/github/phosphorjs/phosphor-queue?branch=master)

The `phosphor-queue` module implements a generic *first in, first out* (FIFO)
queue data structure. It provides the usual methods `push()` and `pop()` plus
some others to query the status of the queue, remove arbitrary elements,
filter out items, map a function, and to convert the queue into an array.


<a name='install'></a>Package Install
-------------------------------------

**Prerequisites**
- [node](http://nodejs.org/)

```bash
npm install --save phosphor-queue
```


Source Build
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)

```bash
git clone https://github.com/phosphorjs/phosphor-queue.git
cd phosphor-queue
npm install
```

**Rebuild**
```bash
npm run clean
npm run build
```


Run Tests
---------

Follow the source build instructions first.

```bash
npm test
```


Build Docs
----------

Follow the source build instructions first.

```bash
npm run docs
```

Navigate to `docs/index.html`.


Supported Runtimes
------------------

The runtime versions which are currently *known to work* are listed below.
Earlier versions may also work, but come with no guarantees.

- Node 0.12.7+
- IE 11+
- Firefox 32+
- Chrome 38+


Bundle for the Browser
----------------------

Follow the package install instructions first.

Any bundler that understands how to `require()` files with .js and .css
extensions can be used with this package.


Usage Examples
--------------

**Note:** This module is fully compatible with Node/Babel/ES6/ES5. Simply
omit the type declarations when using a language other than TypeScript.

To test the `phosphor-queue` module in a node interactive shell after the
[installation](#install), open a terminal in your current working directory and
run:

```
node
```

Then import the module into Node with the following command:

```node
queue = require('phosphor-queue')
```

This imports the `Queue()` constructor to create new queue. Once you create a
new queue it's straightforward to check some basic properties: the front and
back elements, the queue size and whether or not it is empty:

```node
let q = new queue.Queue([0, 1, 2, 3]);

> q.front
0
> q.back;
3
> q.size;
4
> q.empty;
false
> 
```

The `pop()` method removes the front item and `push()` inserts a new back
item:

```node
> q.pop();
0
> q.pop();
1
> q.pop();
2
> q.pop();
3
> q.size;
0
> q.empty;
true
> q.toArray();
[]

> q.push(42);
> q.push(43);
> q.push(44);
> q.push(44);
> q.push(45);
> q.toArray();
[ 42, 43, 44, 44, 45 ]
```

It is also possible to delete specific items from the queue. The `remove()`
method deletes the first occurrence of its argument, `removeAll()` deletes all
the occurrences and `clear()` completely empties the queue:

```node
> q.remove(42);
true
> q.remove(19);
false
> q.removeAll(44);
2
> q.removeAll(19);
0
> q.toArray();
[ 43, 45 ]

> q.clear();
> q.size
0
```

The `Queue` object also provides methods to check whether the elements in the
queue pass a boolean-valued predicate function. These methods are: `some()` to
check if at least one item passes the function, `every()` to test if all the
elements pass the function, and `filter()` to retrieve an array with those
values that passed the function.

```node
> q.push(42);
> q.push(43);
> q.push(44);
> q.push(45);
> q.toArray();
[ 42, 43, 44, 45 ]

> q.some(v => v > 40);
true
> q.some(v => v < 44);
true

> q.every(v => v > 40);
true
> q.every(v => v < 44);
false

> q.filter(v => v < 40);
[]
> q.filter(v => v > 44);
[ 45 ]
```

Two additional methods of the queue that provide extra flexibility are `map()`
for  mapping a function across the elements and `forEach()` which allows
executing a callback for each value.

```node
> q.map(v => v * 2);
[ 84, 86, 88, 90 ]
> q.forEach((v, i) => {
... console.log(v, i);
... });
42 0
43 1
44 2
45 3
```


API
---

[API Docs](http://phosphorjs.github.io/phosphor-queue/api/classes/queue.html)
