import { IpcRendererEvent, ipcRenderer } from "electron";
import { BattleReport } from "@/types/report";
import { RendererEvents } from "@/types/events";
import { useSettings } from '@stores/settings';
import { useBattleReports } from '@stores/battleReports';
import { useNotifier } from '@stores/notifier';

var RendererEventList: Map<RendererEvents, (event: IpcRendererEvent, data: any) => any> = new Map();

export function prepareEvents() {
    var settingsStore = useSettings();
    var notifierStore = useNotifier();

    RendererEventList.set("report-add-error", (event: IpcRendererEvent, SessionID: string) => notifierStore.addNotification("error", 5000, true, "Add Error", `Session Id: ${SessionID}`));
    RendererEventList.set("report-add-success", (event: IpcRendererEvent, SessionID: string) => notifierStore.addNotification("success", 5000, false, "Add Succes", `Session Id: ${SessionID}`));
    RendererEventList.set("reports-get-success", (event: IpcRendererEvent, SessionID: string) => notifierStore.addNotification("success", 5000, false, "Reports Gatherd Success", ``));
    RendererEventList.set("reports-get-all-callback", (event: IpcRendererEvent, reports: BattleReport[]) => reportsGetAllCallback(reports));
    RendererEventList.set("get-path-response", (event: IpcRendererEvent, path: string) => {
        notifierStore.addNotification("success", 5000, false, "Config", "Data path Gathered")
        settingsStore.setConfigPath(path);
    });
    RendererEventList.set("get-path-error", (event: IpcRendererEvent, message: string) => notifierStore.addNotification("error", 5000, true, "Path Error", message));

}
export function registerEvents() {
    for (const [eventName, func] of RendererEventList) {
        console.log("Registering Event:", eventName);
        ipcRenderer.on(eventName, (event, data: any) => {
            console.log("EVENT-GET:", eventName);
            console.log("Event data:", data);
            func(event, data);
        });
    }
}

function reportsGetAllCallback(reports: BattleReport[]) {
    var reportsStore = useBattleReports();
    reports.forEach(report => {
        if (!reportsStore.hasReport(report.basicInfo.SessionID)) {
            reportsStore.addBattleReport(report);
        }
    });
}

export function getListenersList() {
    return Array.from(RendererEventList.keys());
}