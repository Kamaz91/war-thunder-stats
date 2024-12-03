import { promises } from "original-fs";
import { EventTaskManager } from "../utils/eventManager";
import { BattleReport, RaportStatus } from '@types/report';

export interface IElectronAPI {
    removeAllListeners(): void;
    removeAllChannelListeners(channel: string): void;
    send: (channel: string, data: any) => void;
    report: {
        get: (filters?) => Promise<BattleReport[]>
        getChunk: (offset: number, limit: number) => Promise<BattleReport[]>,
        count: () => Promise<{ count: number }>
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