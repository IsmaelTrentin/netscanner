import DateHelper from './DateHelper';

/**
 * The default timeout in ms.
 */
export const DEFAULT_TIMEOUT: number = 5;

/**
 * The default number of tries.
 */
export const DEFAULT_TRIES: number = 5;

/**
 * The default packed size in bytes.
 */
export const DEFAULT_SIZE: number = 16;

/**
 * The default number of max hops.
 */
export const DEFAULT_MAX_HOPS: number = -1;

/**
 * Default value for showing hostanames.
 */
export const DEFAULT_SHOW_HOSTNAMES: boolean = true;

/**
 * Default value for showing only onlines machines.
 */
export const DEFAULT_HIDE_OFFLINE: boolean = true;

/**
 * Default value to show ping time in ms.
 */
export const DEFAULT_SHOW_PING_TIME: boolean = true;

/**
 * Default value to show the total time of the scan in seconds.
 */
export const DEFAULT_SHOW_TOTAL_TIME: boolean = true;

/**
 * The Default file name. The format is `scanreport_DD_MM_YYYY_hh_mm_seconds.csv`. 
 */
export const DEFAULT_REPORT_FILE_NAME: string = DateHelper.createFileName('csv');

/**
 * The default file path relative to the software folder.
 */
export const DEFAULT_REPORT_FILE_PATH: string = 'scan_reports';