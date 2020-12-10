import DateHelper from "./DateHelper";
import path from 'path';
import { app } from "electron";

export const DEFAULT_TIMEOUT: number = 5;
export const DEFAULT_TRIES: number = 5;
export const DEFAULT_SIZE: number = 16;
export const DEFAULT_MAX_HOPS: number = -1;
export const DEFAULT_SHOW_HOSTNAMES: boolean = true;
export const DEFAULT_HIDE_OFFLINE: boolean = true;
export const DEFAULT_SHOW_PING_TIME: boolean = true;
export const DEFAULT_SHOW_TOTAL_TIME: boolean = true;
export const DEFAULT_REPORT_FILE_NAME: string = DateHelper.createFileName('csv');
export const DEFAULT_REPORT_FILE_PATH: string = 'scan_reports';