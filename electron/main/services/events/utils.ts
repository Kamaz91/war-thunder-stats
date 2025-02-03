import { ipcMain } from "electron";
import { Utility } from "../../../../types/eventsList";
import { Settings } from "../../settings";

export default () => {
    ipcMain.handle(Utility.GetPath, async (event, data: string) => {
        console.log(Utility.GetPath + " Handle");
        var path = Settings.getAppDataPath();
        if (Settings.getAppDataPath() == undefined) {
            let error = 'appData or .config Path not found.';
            console.error(error);
            return {
                status: false,
                request: error
            }
        }
        return {
            status: true,
            request: path
        }
    });
}