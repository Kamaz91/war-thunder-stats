import { MainProcessEventData, RendererEventData } from "../../types/events"
import { ipcRenderer, IpcMainEvent } from "electron"

export function sendToRenderer(event: IpcMainEvent, EventData: RendererEventData) {
    console.log("EVENT-SEND:", EventData.name);
    event.sender.send(EventData.name, EventData.data);
}

export function sendToMainProcess(EventData: MainProcessEventData) {
    console.log("EVENT-SEND:", EventData.name);
    ipcRenderer.send(EventData.name, EventData.data);
}