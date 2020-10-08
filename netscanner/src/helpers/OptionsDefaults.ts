import { ReportOptions } from './../interfaces/ReportOptions';
import { NetOptions } from './../interfaces/NetOptions';

export class OptionsDefaults {

  public static netOptionsDefaults(): NetOptions {
    return {
      timeout: 5000,
      tries: 5,
      size: 16,
      maxHops: -1
    };
  }

  public static reportOptionsDefaults(): ReportOptions {
    return {
      hostnames: true,
      hideOffline: true,
      pingTime: true,
      portScanTime: false,
      totalTime: true
    };
  }
}