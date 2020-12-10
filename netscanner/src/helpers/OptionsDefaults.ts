import { IReportOptions } from '../interfaces/IReportOptions';
import { INetOptions } from '../interfaces/INetOptions';
import * as Constants from './Constants';

export class OptionsDefaults {

  public static readonly NET_OPTIONS_DEFAULT: INetOptions = {
    timeout: Constants.DEFAULT_TIMEOUT,
    tries: Constants.DEFAULT_TRIES,
    size: Constants.DEFAULT_SIZE,
    maxHops: Constants.DEFAULT_MAX_HOPS
  }

  public static readonly REPORT_OPTIONS_DEFAULT: IReportOptions = {
    fileName: Constants.DEFAULT_REPORT_FILE_NAME,
    filePath: Constants.DEFAULT_REPORT_FILE_PATH,
    hostnames: Constants.DEFAULT_SHOW_HOSTNAMES,
    hideOffline: Constants.DEFAULT_HIDE_OFFLINE,
    pingTime: Constants.DEFAULT_SHOW_PING_TIME,
    totalTime: Constants.DEFAULT_SHOW_TOTAL_TIME
  }
}