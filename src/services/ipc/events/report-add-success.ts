import { IpcRendererEvent } from "electron";
import { useNotifier } from "@stores/notifier";

export default (event: IpcRendererEvent, SessionID: string) => {
    let notifierStore = useNotifier();
    notifierStore.addNotification("success", 5000, false, "Add Succes", `Session Id: ${SessionID}`)
}