import { promises } from "original-fs";
import { EventTaskManager } from "../utils/eventManager";
import { BattleReport, RaportStatus } from '@types/report';
import { IpcRequest } from '@types/IPC';

export interface IElectronAPI {
    removeAllListeners(): void;
    removeAllChannelListeners(channel: string): void;
    send: (channel: string, data: any) => void;
    report: {
        get: (filters?) => Promise<IpcRequest<BattleReport>>,
        delete: (session: string) => Promise<IpcRequest<number>>;
    }
    reportArray: {
        getChunk: (offset: number, limit: number) => Promise<IpcRequest<BattleReport[]>>,
        getPeriod: (startTime: number, endTime: number) => Promise<IpcRequest<BattleReport[]>>,
        count: () => Promise<IpcRequest<number>>
        delete: (sessionArray: string[]) => Promise<IpcRequest<>>;
    }
    utility: {
        getDataPath: () => Promise<IpcRequest<string>>
    }
    listener: {
        Raport: EventTaskManager<BattleReport>;
        RaportStatus: EventTaskManager<RaportStatus>;
    }
}

declare global {
    interface Window {
        Api: IElectronAPI;
    }
}