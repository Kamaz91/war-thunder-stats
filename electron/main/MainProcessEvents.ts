import { app, IpcMainEvent, ipcMain } from "electron";
import { BattleReport } from "../../types/report";
import addReport from "./addReportDB";
import { all, chunk, count, } from "./getReports";
import { MainProcessEvents } from "../../types/events";
import { sendToRenderer } from "./eventHelpers";
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
    ipcMain.handle("report/get", async (event, arg) => {
        if (!arg) {
            return await all();
        }
    });
    ipcMain.handle("report/get/chunk", async (event, offset: number, limit: number) => {
        console.log("(report/get/chunk)", offset, limit);
        return chunk(offset, limit);
    });
    ipcMain.handle("report/get/count", async () => {
        return await count();
    });
    ipcMain.handle("report/remove", async (event, arg) => {

    });
    ipcMain.handle("report/edit", async (event, arg) => {

    });
}