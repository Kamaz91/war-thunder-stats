import { IpcRendererEvent } from "electron";
import { useNotifier } from "@stores/notifier";

export default (event: IpcRendererEvent, message: string) => {
    let notifierStore = useNotifier();
    notifierStore.addNotification("error", 5000, true, "Path Error", message);
}