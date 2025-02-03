import { clipboard } from "electron";
import { setInterval, clearInterval } from "node:timers";
import { parseReport } from "../reportParser"
import { getReport } from "../../getReports";
import addReport from "../../addReportDB";

import { Settings } from '../../settings';
import fs from "fs/promises";
import path from "path";

var clipboardContent = "";
var clipboardInterval = null;
var isEnabled = true;

export function registerClipboardInterval(webcontents: Electron.WebContents) {
    clipboardInterval = setInterval(() => {
        let newContents = clipboard.readText();
        if (isNewData(newContents) && isEnabled) {
            processClipboard(webcontents, newContents);
        }
    }, 200);
}

function isNewData(newContents) {
    if (clipboardContent !== newContents && newContents.length > 0) {
        clipboardContent = newContents;
        return true;
    }
    return false;
}

async function processClipboard(webcontents: Electron.WebContents, inputText: string) {
    let date = new Date();
    //if (date.getDay() !== this.date.getDay() && date.getMonth() !== this.date.getMonth() && date.getFullYear() !== this.date.getFullYear()) {
    //    date = this.date;
    //}
    const extracted = parseReport(inputText, date.getTime());

    if (extracted == null) {
        console.log("Cant Parse report");
        saveReport(inputText, new Date().getTime());
        webcontents.send("report/added/status", { status: "error", data: "", message: "Cant Parse report" });
        return;
    }

    if (extracted.basicInfo.SessionID.length == 0 || extracted.basicInfo.Battle.result.length == 0) {
        console.log("Battle raport is not valid");
        webcontents.send("report/added/status", { status: "warning", data: "", message: "Battle raport is not valid" });
        return;
    }

    if (!await getReport(extracted.basicInfo.SessionID)) {
        console.log(extracted);
        saveReport(inputText, extracted.basicInfo.SessionID);
        addReport(extracted)
            .then(() => webcontents.send("report/added", extracted))
            .catch(e => webcontents.send("report/added/status", { status: "error", data: extracted.basicInfo.SessionID, message: "Error while adding to database" }));

    } else {
        console.log("Battle raport already exists:", extracted.basicInfo.SessionID);
        webcontents.send("report/added/status", { status: "warning", data: "Session: " + extracted.basicInfo.SessionID, message: "Battle raport already exists" });
    }
}

async function saveReport(report: string, session_id) {
    const appdata = Settings.getAppDataPath();
    const dir = path.resolve(appdata + "/Reports");
    const fileName = path.resolve(dir, session_id + ".report");

    await fs.mkdir(dir, { recursive: true })
        .then(() => console.log("Dir make success"))
        .catch(er => console.log(er))

    await fs.writeFile(fileName, report, 'utf8')
        .then(() => console.log("Report write success"))
        .catch(er => console.log(er))
    console.log(appdata, dir, fileName);
}

export function toggleClipboard() {
    isEnabled = !isEnabled;
    return isEnabled;
}