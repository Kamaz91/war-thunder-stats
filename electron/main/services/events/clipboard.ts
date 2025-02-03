import { ipcMain } from "electron";
import { toggleClipboard } from "../clipboard/index";
import { Clipboard } from "../../../../types/eventsList";

async function response(callback: () => Promise<any>) {
    return await callback()
        .then(((el) => {
            return {
                status: true,
                request: el
            }
        }))
        .catch(((el) => {
            return {
                status: false,
                request: null
            }
        }));
}
export default () => {
    ipcMain.handle(Clipboard.Toggle, async (event) => {
        console.log(Clipboard.Toggle + " Handled");
        return await response(async () => toggleClipboard());
    });

    ipcMain.handle(Clipboard.SetState, async (event, data: boolean) => {
        console.log(Clipboard.SetState + " Handled");
        return await response(async () => toggleClipboard());
    });
}