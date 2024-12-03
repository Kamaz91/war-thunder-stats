import { ipcMain } from "electron/main";

ipcMain.emit("test", "testing");

ipcMain.handle("reports/add", (event, data: number) => {
    console.log("reports/add Handle");
    data + data
});

ipcMain.handle("clipboard/toggle", (event, data: number) => {
    console.log("clipboard/toggle");
    return false;
})