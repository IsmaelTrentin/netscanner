import { app, BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 656,
    width: 800,
    minWidth: 750,
    minHeight: 656,
    center: true,
    useContentSize: true,
    title: 'Net Scanner',
    autoHideMenuBar: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
/*let ip: IP = new IP('10.20.4.1');
let ports: Array<number> = [80, 3000, 8888];

let s: number = 8;
setInterval(() => {
  if (s == 0) {
    clearInterval(0);
  } else {
    s--;
    console.log(`Seconds to go: ${s}`);
  }
}, 1000);
setTimeout(async () => {
  let t1: number = (new Date()).getTime();
  for (let i: number = 0; i < 256; i++) {
    let machine: Machine = await Pinger.ping(ip, { tries: 1, timeout: 1 });
    if (machine.online) {
      for (let port of ports) {
        let open: boolean = await PortScanner.isOpen(port, ip, { tries: 1, timeout: 5 });
        if (open) {
          if (machine.openPorts) {
            machine.openPorts.push(port);
          } else {
            machine.openPorts = [port];
          }
        }
      }
    }
    console.log(`Host ${machine.hostname}[${ip.toString()}] is: ${(machine.online) ? 'ONLINE': 'OFFLINE'}`);
    if (machine.openPorts) {
      console.log(`\tOpen ports: ${machine.openPorts.toString()}`);
    }
    ip.addT(0, 1);
  }
  console.log(`Total time: ${((new Date()).getTime() - t1) / 1000} seconds`);
}, s * 1000);*/