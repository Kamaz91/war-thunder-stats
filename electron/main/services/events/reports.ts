import { ipcMain } from "electron";
import { all, chunk, count } from "../../getReports";
import { Reports } from "../../../../types/eventsList";

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
    ipcMain.handle(Reports.GetAll, async (event) => {
        console.log(Reports.GetAll + " Handle");
        return await response(() => all());
    });

    ipcMain.handle(Reports.GetChunk, (event, offset: number, limit: number) => {
        console.log(Reports.GetChunk + " Handle");
        return response(() => chunk(offset, limit));
    });

    ipcMain.handle(Reports.GetCount, (event) => {
        console.log(Reports.GetCount + " Handle");
        return response(() => count());
    });

    ipcMain.handle(Reports.GetToday, (event, data: number) => {
        console.log(Reports.GetToday + " Handle");
    });

    ipcMain.handle(Reports.GetDay, (event, data: number) => {
        console.log(Reports.GetDay + " Handle");
    });

    ipcMain.handle(Reports.GetPeriod, (event, data: { startTime: number, endTime: number }) => {
        console.log(Reports.GetPeriod + " Handle");
    });

    ipcMain.handle(Reports.Delete, (event, data: string[]) => {
        console.log(Reports.Delete + " Handle");
    });
}