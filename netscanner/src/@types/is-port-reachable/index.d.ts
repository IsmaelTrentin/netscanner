declare module 'is-port-reachable' {

  export interface IPROptions {

    host?: string,

    timeout?: number
  }

  export function isPortReachable(port: number, options?: IPROptions): Promise<boolean>;
}