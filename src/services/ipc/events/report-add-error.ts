import { IpcRendererEvent } from "electron";
import { useNotifier } from "@stores/notifier";
import IPC from "@services/ipc";

let notifierStore = useNotifier();

IPC.registerEvent("report-add-error", (event: IpcRendererEvent, SessionID: string) => notifierStore.addNotification("error", 5000, true, "Add Error", `Session Id: ${SessionID}`));
