import { IpcRendererEvent } from "electron";
import { useNotifier } from "@stores/notifier";
import { useSettings } from '@stores/settings';

export default (event: IpcRendererEvent, path: string) => {
    var notifierStore = useNotifier();
    var settingsStore = useSettings();

    notifierStore.addNotification("success", 5000, false, "Config", "Data path Gathered");
    settingsStore.setConfigPath(path);
}