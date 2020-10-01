# Ricerche

## Node.js e Multithreading

[Guide](https://itnext.io/going-multithread-with-node-js-492258ba32cf)

- `fs-extra` = `fs` ma con `Promise`
- modulo `worker_threads`
    - classe `Worker`
- Nuovo `Worker` per ogni **thread**
- Payload a `Worker` 

```javascript
let wrkr = new Worker('workerFileName', {
    workerData: {}
});

wrkr.on('eventName', callback);
```

Alcuni eventi:

- `message` -> data
- `error` -> e
- `exit` -> code

Nel file principale si instanziano i worker mentre in un altro file si definisce come esso lavora. Si puo' usare anche lo stesso file, basta distinguerlo dalla main thread con `isMainThread`.

Esempio `worker.js`

```javascript
// Get data
let thedata = workerData;
// Manipulate data
thedata = { message: 'Hello world' };
// Resend manipulated data
parentPort.postMessage(data);
```

---

## Node.js ping

[npm page](https://www.npmjs.com/package/ping)

Codice di esempio:

```javascript
let ping = require('ping');
// Can also be x.x.x.x
let host = 'google.com'; 

ping.sys.probe(host, alive => {
    let msg = (alive) ? 'is': 'is not';
    console.log(`${host} ${msg} alive.`);
});
```

Codice di esempio con `Promise`:

```javascript
let ping = require('ping');
let host = '8.8.8.8'; 

ping.promise.probe(host)
    .then(alive => {
        let msg = (alive) ? 'is': 'is not';
        console.log(`${host} ${msg} alive.`);
    })
    .catch(err => console.error(err));
);
```

Inclusa configurazione:

```javascript
let cfg = {
    timeout: 10; // seconds,
    min_reply: 1 
    // ...
};
```

## Node.js port scan

[npm page](https://www.npmjs.com/package/is-port-reachable)

Codice di esempio:

```javascript
const ipr = require('is-port-reachable');
let opts = {
    host: 'google.com',
    timeout: 25 // ms
}
console.log(await ipr(80, opts));
```

## Node.js GUI

[Electron](https://www.electronjs.org/)

Supports Typescript