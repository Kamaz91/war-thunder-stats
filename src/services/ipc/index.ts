import { IpcRendererEvent, ipcRenderer } from "electron";
import { RendererEvents } from "@/types/events";

type EventAction = (event: IpcRendererEvent, data: any) => void;

class IpcEvents {
    public EventList: Map<RendererEvents, (event: IpcRendererEvent, data: any) => any> = new Map();

    constructor() {

    }
    registerEvent(event: RendererEvents, action: EventAction) {
        this.EventList.set(event, action);
    }
    getListenersList() {
        return Array.from(this.EventList.keys());
    }
    removeAllListeners() {
        let listeners = this.getListenersList();
        listeners.forEach(element => {
            console.warn("Listener:", element, "removed");
            ipcRenderer.removeAllListeners(element);
        });
    }
}

export default new IpcEvents();