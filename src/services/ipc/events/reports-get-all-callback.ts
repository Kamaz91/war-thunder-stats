import { IpcRendererEvent } from "electron";
import { BattleReport } from "@/types/report";
import { useBattleReports } from '@stores/battleReports';

export default (event: IpcRendererEvent, reports: BattleReport[]) => {
    reportsGetAllCallback(reports)
}

function reportsGetAllCallback(reports: BattleReport[]) {
    var reportsStore = useBattleReports();
    reports.forEach(report => {
        if (!reportsStore.hasReport(report.basicInfo.SessionID)) {
            reportsStore.addBattleReport(report);
        }
    });
}