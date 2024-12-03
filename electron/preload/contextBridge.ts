import { contextBridge, ipcRenderer } from 'electron';
import { EventTaskManager } from "../../utils/eventManager";
import { BattleReport, RaportStatus } from '../../types/report';

var ReceiveManager: EventTaskManager<{ x: String }> = new EventTaskManager("test");
var RaportManager: EventTaskManager<BattleReport> = new EventTaskManager("report/added");
var RaportStatusManager: EventTaskManager<RaportStatus> = new EventTaskManager("report/added/status");

contextBridge.exposeInMainWorld('Api', {
    removeAllListeners: () => {
        ipcRenderer.eventNames().forEach((channel) => ipcRenderer.removeAllListeners(channel.toString()))
    },
    removeAllChannelListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
    send: (channel: string, data: any) => {
        ipcRenderer.send(channel, data);
    },
    report: {
        get: async (filters?) => ipcRenderer.invoke("report/get", filters),
        getChunk: async (offset: number, limit: number) => ipcRenderer.invoke("report/get/chunk", offset, limit),
        count: async () => ipcRenderer.invoke("report/get/count"),
    },
    listener: {
        test: {
            addTask: (channel: string, callback: (event, args: { x: string }) => void) => {
                console.log("Test task added");
                return ReceiveManager.addTask(channel, callback);
            }
        },
        Raport: {
            addTask: (key: string, callback: (event: any, data: BattleReport) => void) => {
                return RaportManager.addTask(key, callback);

            },
            removeTask: (name: string) => {
                return RaportManager.removeTask(name);
            },
            getTasks: () => {
                return RaportManager.getTasks();
            }
        },
        RaportStatus: {
            addTask: (key: string, callback: (event: any, data: RaportStatus) => void) => {
                return RaportStatusManager.addTask(key, callback);
            },
            removeTask: (name: string) => {
                return RaportStatusManager.removeTask(name);
            },
            getTasks: () => {
                return RaportStatusManager.getTasks();
            }
        },
    }
});