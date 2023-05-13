export interface ItrafficInfo {
  lastUsedTraffic: string;
  todayUsedTraffic: string;
  unUsedTraffic: string;
}

export interface IisCheck {
  msg: string;
  ret: number;
  traffic?: string;
  trafficInfo?: ItrafficInfo;
  unflowtraffic?: number;
}

export interface IisCheck {
  doCheckIn: () => Promise<IisCheck>;
  doGetData: () => Promise<ItrafficInfo>;
}

declare global {
  interface Window {
    request: IisCheck;
  }
}
