import { IReportOptions } from '../interfaces/IReportOptions';
import { INetOptions } from '../interfaces/INetOptions';
import * as Constants from './Constants';

export class OptionsDefaults {

  public static netOptionsDefaults(): INetOptions {
    return {
      timeout: Constants.DEFAULT_TIMEOUT,
      tries: Constants.DEFAULT_TRIES,
      size: Constants.DEFAULT_SIZE,
      maxHops: Constants.DEFAULT_MAX_HOPS
    };
  }

  public static reportOptionsDefaults(): IReportOptions {
    return {
      hostnames: Constants.DEFAULT_SHOW_HOSTNAMES,
      hideOffline: Constants.DEFAULT_HIDE_OFFLINE,
      pingTime: Constants.DEFAULT_SHOW_PING_TIME,
      portScanTime: Constants.DEFAULT_SHOW_PORT_SCAN_TIME,
      totalTime: Constants.DEFAULT_SHOW_TOTAL_TIME
    };
  }
}