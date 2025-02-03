import { ipcMain } from "electron";
import addreport from "../../addReportDB";
import { getReport } from "../../getReports";
import { BattleReport } from "../../../../types/report";
import { Report } from "../../../../types/eventsList";

async function response(callback: () => Promise<any>) {
    return await callback()
        .then(((el) => {
            return {
                status: true,
                request: el
            }
        }))
        .catch(((erorr) => {
            console.error(erorr);
            return {
                status: false,
                request: null
            }
        }));
}

export default () => {
    ipcMain.handle(Report.Add, async (event, data: BattleReport) => {
        console.log(Report.Add + " Handle");
        return await response(() => addreport(data))
    });

    ipcMain.handle(Report.Get, async (event, data: string) => {
        console.log(Report.Get + " Handle");
        return await response(() => getReport(data))
    });

    ipcMain.handle(Report.Edit, async (event, data: string) => {
        console.log(Report.Edit + " Handle");
    });

    ipcMain.handle(Report.Delete, (event, data: string) => {
        console.log(Report.Delete + " Handle");
    });
}