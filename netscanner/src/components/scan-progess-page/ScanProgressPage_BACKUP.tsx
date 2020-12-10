import * as React from 'react';
import { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import Descriptor from '../descriptor/Descriptor';
import TopNav from '../top-nav/TopNav';
import { SortOption } from '../../enums/SortOption';
import { ArrayHelper } from '../../helpers/ArrayHelper';
import { IMachine } from '../../interfaces/IMachine';
import { INetOptions } from '../../interfaces/INetOptions';
import { IReportOptions } from '../../interfaces/IReportOptions';
import { IP } from '../../models/IP';
import { Pinger } from '../../models/Pinger';
import { PortScanner } from '../../models/PortScanner';


interface IScanProgessPageState {
  subnetsStart: IP;
  subnetsEnd: IP;
  ports: number[];
  netOpts: INetOptions;
  reportOpts: IReportOptions;
  hasStartedScan: boolean;
}

interface IScanProgessPageProps extends RouteComponentProps<{}, {}, IScanProgessPageState> {
  subnetsStart: IP;
  subnetsEnd: IP;
  ports: number[];
  netOpts: INetOptions;
  reportOpts: IReportOptions;
  hasStartedScan: boolean;
}

const ScanProgessPage: React.FC<IScanProgessPageProps> = (props: IScanProgessPageProps) => {

  const location = useLocation<IScanProgessPageProps>();

  const state = location.state;

  const [machines, setMachines] = useState<IMachine[]>([]);

  const [stateMsg, setStateMsg] = useState('Scanning...');

  const [firstStart, setFirstStart] = useState(true);

  const [hasStartedScan, setHasStartedScan] = useState((location.state) ? location.state.hasStartedScan : false);

  const [scanned, setScanned] = useState(false);

  const [sortOption, setSortOption] = useState<SortOption>(SortOption.BY_IP)

  function sortByIP(): IMachine[] {
    let newMachines: IMachine[] = machines;
    newMachines.sort((a: IMachine, b: IMachine) => {
      const ipA = Number(a.hostname.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
      const ipB = Number(b.hostname.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
      return ipA - ipB;
    });
    return newMachines;
  }

  function sortByState(): IMachine[] {
    sortByIP();
    let newMachines: IMachine[] = machines;
    newMachines.sort((a: IMachine, b: IMachine) => {
      return (a.online) ? (b.online) ? 1 : -1 : 1;
    });
    return newMachines;
  }

  function sort(sortOption: SortOption) {
    let sorted: IMachine[] = [];
    if (sortOption == SortOption.BY_IP) {
      sorted = sortByIP();
    } else if (sortOption == SortOption.BY_STATE) {
      sorted = sortByState();
    }
    // more options...
    setMachines(sorted);
  }

  async function scan() {
    let ip: IP = new IP(state.subnetsStart.toString());
    let ipEnd: IP = new IP(state.subnetsEnd.toString());
    ipEnd.addT(0, 1);
    //let runningPings: Promise<IMachine>[] = [];
    while (!ip.isSame(ipEnd)) {
      setStateMsg(`Sent ping to ${ip.toString()}`);
      Pinger.ping(ip, state.netOpts)
        .then(async (m: IMachine) => {
          setStateMsg(`Pinged ${m.ip.toString()}`);
          if (m.online) {
            let isOnline: boolean;
            for (let p of state.ports) {
              try {
                setStateMsg(`Scanning ${m.ip.toString()}:${p}`);
                await PortScanner.isOpen(p, m.ip, state.netOpts);
              } catch (err) {
                console.log(err);
              }
              if (isOnline) {
                m.openPorts.push(p);
              }
            }
          }
          let newMachines: IMachine[] = machines;
          newMachines.push(m);
          setMachines(newMachines);
          sortByIP();
          if (m.ip.isSame(state.subnetsEnd)) {
            console.log('a');
            // let writer: ReportWriter = new ReportWriter(state.reportOpts);
            // writer.write(state.machines);
          }
        });
      ip.addT(0, 1);
    }
    //setStateMsg('Awaiting responses...');
    // let results: IMachine[] = await Promise.all(runningPings);
    // setMachines(results);
    // sort(SortOption.BY_IP);
    // setStateMsg('Finished');
  };

  const queueRescan = () => {
    setFirstStart(true);
    setHasStartedScan(true);
    setScanned(false);
    setMachines([]);
  }

  useEffect(() => {
    if (firstStart && hasStartedScan && !scanned) {
      setFirstStart(false);
      // Small delay to fully load the page so that in case 
      // of a big scan it does not remain stuck on the scan page.
      setTimeout(() => {
        scan();
        setScanned(true);
        clearTimeout();
      }, 75);
    }
    sort(sortOption);
  },);

  if (hasStartedScan) {
    return (
      <div className="app-content">
        <TopNav />
        <Descriptor text={stateMsg} />
        <div className="sort-btns-wrapper">
          <input className="simple-btn sort-btn" type="button" value="Sort by state" onClick={() => setSortOption(SortOption.BY_IP)} />
          <input className="simple-btn sort-btn" type="button" value="Sort by IP" onClick={() => setSortOption(SortOption.BY_STATE)} />
          <input className="simple-btn sort-btn" type="button" value="Rescan" onClick={() => queueRescan()} />
        </div>
        <div className="machines-wrapper">
          {Array.from(machines).map((f, i) => {
            return (
              <div key={i} className='machine-info'>
                <div className='machine-info-content'>
                  <p>IP: <span className='machine-data'>{f.ip.toString()}</span></p>
                  <p>Hostname: <span className='machine-data'>{f.hostname}</span></p>
                  <p>State: <span className={(f.online) ? 'machine-data online' : 'machine-data offline'}>{(f.online) ? 'online' : 'offline'}</span></p>
                  <p>Open ports: <span className='machine-data'>{(f.openPorts.length > 0) ? ArrayHelper.toStringNoWrap(f.openPorts) : 'none'}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="app-content">
        <TopNav />
        <Descriptor text={'No scan started!'} />
        <div className="goback-btn">
          <div className="simple-btn goback-btn-link-wrapper">
            <Link to="/" className="goback-btn-link">Go Back</Link>
          </div>
        </div>
      </div>
    );
  }

}

export default hot(module)(ScanProgessPage);