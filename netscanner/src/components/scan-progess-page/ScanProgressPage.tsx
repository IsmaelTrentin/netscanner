import * as React from 'react';
import { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';

import Descriptor from '../descriptor/Descriptor';
import TopNav from '../top-nav/TopNav';
import { SortOption } from './../../enums/SortOption';
import { ArrayHelper } from './../../helpers/ArrayHelper';
import { INetOptions } from './../../interfaces/INetOptions';
import { IReportOptions } from './../../interfaces/IReportOptions';
import { IScanResult } from './../../interfaces/IScanResult';
import { IP } from './../../models/IP';
import { Pinger } from './../../models/Pinger';
import { PortScanner } from './../../models/PortScanner';
import { Report } from './../../models/Report';

/**
 * The ScanProgresPage component's state.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
interface IScanProgessPageState {
  subnetsStart: IP;
  subnetsEnd: IP;
  ports: number[];
  netOpts: INetOptions;
  reportOpts: IReportOptions;
  hasStartedScan: boolean;
}

/**
 * The ScanProgresPage component's props.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
interface IScanProgessPageProps extends RouteComponentProps<{}, {}, IScanProgessPageState> {
  subnetsStart: IP;
  subnetsEnd: IP;
  ports: number[];
  netOpts: INetOptions;
  reportOpts: IReportOptions;
  hasStartedScan: boolean;
}

/**
 * The scan progress page or report page function component.
 * 
 * @param props the component's props
 */
const ScanProgessPage: React.FC<IScanProgessPageProps> = (props: IScanProgessPageProps) => {

  const location = useLocation<IScanProgessPageProps>();

  const state = location.state;

  const [scans, setScans] = useState<IScanResult[]>([]);

  const [stateMsg, setStateMsg] = useState('Scanning...');

  const [firstStart, setFirstStart] = useState(true);

  const [hasStartedScan, setHasStartedScan] = useState((location.state) ? location.state.hasStartedScan : false);

  const [scanned, setScanned] = useState(false);

  const [sortOption, setSortOption] = useState<SortOption>(SortOption.BY_IP)

  /**
   * Returns the scan results sorted by their IP
   * in an ascending order.
   * 
   * @returns the scan results sorted by their IP
   * in an ascending order.
   */
  function sortByIP(): IScanResult[] {
    let newScans: IScanResult[] = scans;
    newScans.sort((a: IScanResult, b: IScanResult) => {
      const ipA = Number(a.machine.hostname.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
      const ipB = Number(b.machine.hostname.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
      return ipA - ipB;
    });
    return newScans;
  }

  /**
   * Returns the scan results sorted by their state
   * in a first-onlines-then-offlines order. IP sorting
   * is still applied for results of the same state.
   * 
   * @returns the scan results sorted by their state
   * in a first-onlines-then-offlines order.
   */
  function sortByState(): IScanResult[] {
    sortByIP();
    let newMachines: IScanResult[] = scans;
    newMachines.sort((a: IScanResult, b: IScanResult) => {
      return (a.machine.online) ? (b.machine.online) ? 1 : -1 : 1;
    });
    return newMachines;
  }

  /**
   * Sorts the scan results based on the `sortOption`.
   * 
   * @param sortOption the sort option
   */
  function sort(sortOption: SortOption) {
    let sorted: IScanResult[] = [];
    if (sortOption == SortOption.BY_IP) {
      sorted = sortByIP();
    } else if (sortOption == SortOption.BY_STATE) {
      sorted = sortByState();
    }
    // more options...
    setScans(sorted);
  }

  /**
   * Executes a scan.
   */
  async function scan() {
    let ip: IP = new IP(state.subnetsStart.toString());
    let ipEnd: IP = new IP(state.subnetsEnd.toString());
    ipEnd.addT(0, 1);
    while (!ip.isSame(ipEnd)) {
      setStateMsg(`Sent ping to ${ip.toString()}`);
      Pinger.ping(ip, state.netOpts)
        .then(async (scanRes: IScanResult) => {
          setStateMsg(`Pinged ${scanRes.machine.ip.toString()}`);
          if (scanRes.machine.online) {
            let isOnline: boolean;
            for (let p of state.ports) {
              try {
                setStateMsg(`Scanning ${scanRes.machine.ip.toString()}:${p}`);
                await PortScanner.isOpen(p, scanRes.machine.ip, state.netOpts);
              } catch (err) {
                console.log(err);
              }
              if (isOnline) {
                scanRes.machine.openPorts.push(p);
              }
            }
          }
          let newScans: IScanResult[] = scans;
          newScans.push(scanRes);
          setScans(newScans);
          sortByIP();
          if (scanRes.machine.ip.isSame(state.subnetsEnd)) {
            let report: Report = new Report(scans, state.reportOpts);
            report.write().then(() => setStateMsg(`Wrote report to: ${report.options.filePath}`))
              .catch((err) => console.error(err));
          }
        });
      ip.addT(0, 1);
    }
  };

  const queueRescan = () => {
    setFirstStart(true);
    setHasStartedScan(true);
    setScanned(false);
    setScans([]);
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
  });

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
          {Array.from(scans).map((f, i) => {
            return (
              <div key={i} className='machine-info'>
                <div className='machine-info-content'>
                  <p>IP: <span className='machine-data'>{f.machine.ip.toString()}</span></p>
                  <p>Hostname: <span className='machine-data'>{f.machine.hostname}</span></p>
                  <p>State: <span className={(f.machine.online) ? 'machine-data online' : 'machine-data offline'}>{(f.machine.online) ? 'online' : 'offline'}</span></p>
                  <p>Open ports: <span className='machine-data'>{(f.machine.openPorts.length > 0) ? ArrayHelper.toStringNoWrap(f.machine.openPorts) : 'none'}</span></p>
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