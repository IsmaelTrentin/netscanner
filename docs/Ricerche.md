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