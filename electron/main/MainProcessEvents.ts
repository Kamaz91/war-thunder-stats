import { app, IpcMainEvent, ipcMain } from "electron";
import { BattleReport } from "@types/report";
import addReport from "./addReportDB";
import { all } from "./getReports";
import { MainProcessEvents } from "../../types/events";
import { sendToRenderer } from "../../sharedLibs/helpers/eventHelpers";
import os from "os";
import path from "path";
import { filters } from "../../types/database";
import { Settings } from "./settings";

const MainProcessEventList: Map<MainProcessEvents, (event: IpcMainEvent, data: any) => void> = new Map();

MainProcessEventList.set("report-add", (event: IpcMainEvent, report: BattleReport) => {
    console.log("Report Id:", report.basicInfo.SessionID);
    addReport(report)
        .then(() => sendToRenderer(event, { name: "report-add-success", data: report.basicInfo.SessionID }))
        .catch(e => sendToRenderer(event, { name: "report-add-error", data: report.basicInfo.SessionID }));
});

MainProcessEventList.set("reports-get-all", async (event: IpcMainEvent) => {
    let reports = await all();
    sendToRenderer(event, { name: "reports-get-all-callback", data: reports });
});

MainProcessEventList.set("reports-get", async (event: IpcMainEvent, data: { filters: filters, to: number, from: number }) => {
    let reports = await all();
    sendToRenderer(event, { name: "reports-get-all-callback", data: reports });
});

MainProcessEventList.set("get-path", async (event: IpcMainEvent) => {
    var path = Settings.getAppDataPath();
    if (Settings.getAppDataPath() == undefined) {
        let error = 'appData or .config Path not found.';
        console.error(error);
        sendToRenderer(event, { name: "get-path-error", data: error });
        return;
    }

    sendToRenderer(event, { name: "get-path-response", data: path });
});

/*MainProcessEventList.set("get-datasets", async (event: IpcMainEvent) => {
});*/

export function register() {
    MainProcessEventList.forEach((func, eventName) => {
        console.log("Registering Event:", eventName);
        ipcMain.on(eventName, (event, data: any) => {
            console.log("EVENT-GET:", eventName);
            console.log("Event data:", data);
            func(event, data);
        });
    });
}