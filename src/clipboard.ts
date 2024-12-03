// import { clipboard } from "electron";
// import { parseReport } from "@/sharedLibs/reportParser";
// import { useBattleReports } from '@stores/battleReports'
// import { useNotifier } from '@stores/notifier';
// import { BattleReport } from "@/types/report";
// import { sendToMainProcess } from "@/sharedLibs/helpers/eventHelpers";

// var lastClipboard = "";
// var clipboardInterval = null;

// export function registerClipboardInterval() {
//     clipboardInterval = setInterval(readClipboard, 200);
// }

// function readClipboard() {
//     let newClipboard = clipboard.readText();
//     if (lastClipboard !== newClipboard && newClipboard.length > 0) {
//         lastClipboard = newClipboard;
//         processClipboard(newClipboard);
//     }
// }

// function processClipboard(inputText: string) {
//     let BattleReportsStore = useBattleReports();
//     let Notifier = useNotifier();
//     let date = new Date();
//     //if (date.getDay() !== this.date.getDay() && date.getMonth() !== this.date.getMonth() && date.getFullYear() !== this.date.getFullYear()) {
//     //    date = this.date;
//     //}
//     console.log(date);

//     const extracted = parseReport(inputText, date.getTime());

//     if (extracted == null) {
//         console.log("Cant Parse report");
//         return;
//     }

//     if (extracted.basicInfo.SessionID == '' || extracted.basicInfo.Battle.result == '') {
//         return;
//     }

//     if (!BattleReportsStore.hasReport(extracted.basicInfo.SessionID)) {
//         console.log(extracted);
//         sendReportToDB(extracted);
//         BattleReportsStore.addBattleReport(extracted);
//     } else {
//         Notifier.addNotification("warning", 5000, false, "Report already exist", "Session Id:" + extracted.basicInfo.SessionID);
//         console.log("Battle raport already exists:", extracted.basicInfo.SessionID);
//     }
// }

// function sendReportToDB(report: BattleReport) {
//     sendToMainProcess({ name: "report-add", data: report });
// }