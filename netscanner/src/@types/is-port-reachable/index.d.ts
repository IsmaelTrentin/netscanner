declare module 'is-port-reachable' {

  export interface IPROptions {

    host?: string,

    timeout?: number
  }

  export default function (port: number, options?: IPROptions): Promise<boolean>;
}