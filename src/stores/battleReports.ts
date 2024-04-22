import { defineStore } from 'pinia'
import { extractReportSummary } from '@/sharedLibs/reportParser';
import { BattleReport } from '@/types/report';

type filter = "today" | "yesterday" | "week" | "30days" | "all";

interface State {
    reports: BattleReport[];
    filteredReports: BattleReport[];
    filters: string[];
    filter: filter;
    date: {
        from: number;
        to: number;
    }
}

export const useBattleReports = defineStore('BattleReports', {
    state: (): State => ({
        reports: [],
        filteredReports: [],
        filters: [],
        filter: "today",
        date: {
            from: new Date().setHours(0, 0, 0, 0),
            to: new Date().setHours(23, 59, 59, 9999)
        }
    }),
    getters: {
        summary: (state) => {
            var wins = 0, battles = 0, killsAir = 0, killsGroundNavy = 0, credits = 0, research = 0, spawns = 0, deaths = 0;

            state.filteredReports.forEach((report) => {
                let ex = extractReportSummary(report);
                wins += ex.win ? 1 : 0;
                battles += 1;
                killsAir += ex.killsAir;
                killsGroundNavy += ex.killsGroundNavy;
                credits += ex.credits;
                research += ex.research;
                deaths += ex.deaths;
                spawns += ex.spawns;
            });

            return { wins, battles, killsAir, killsGroundNavy, credits, research, deaths, spawns };
        }
    },
    actions: {
        addBattleReport(report: BattleReport) {
            // unshift reports last is first
            this.reports.unshift(report);
            this.filteredReports = this.filterReports(this.date);
            return true;
        },
        toggleFilter(filter: filter) {
            this.filter = filter;

            var from = new Date();
            from.setHours(0, 0, 0, 0);
            var to = new Date();
            to.setHours(0, 0, 0, 0);

            switch (filter) {
                case 'today':
                    to.setDate(to.getDate() + 1);
                    this.setDate(from.getTime(), to.getTime());
                    break;
                case 'yesterday':
                    from.setDate(from.getDate() - 1);
                    this.setDate(from.getTime(), to.getTime());
                    break;
                case 'week':
                    to.setDate(to.getDate() + 1);
                    from.setDate(from.getDate() - 7);
                    this.setDate(from.getTime(), to.getTime());
                    break;
                case '30days':
                    to.setDate(to.getDate() + 1);
                    from.setDate(from.getDate() - 30);
                    this.setDate(from.getTime(), to.getTime());
                    break;
                case 'all':
                    this.filteredReports = this.reports;
                    return;
            }
            this.filteredReports = this.filterReports(this.date);
        },
        filterReports(date: { from: number, to: number }) {
            return this.reports.filter((report) => report.basicInfo.date >= date.from && report.basicInfo.date <= date.to - 1);
        },
        setDate(from: number, to: number) {
            this.date = { from: from, to: to };
        },
        getReport(session: string) {
            let index = this.reports.findIndex((el) => el.basicInfo.SessionID == session);
            if (index == -1) {
                return null;
            }
            return this.reports[index];
        },
        hasReport(session: string) {
            if (this.reports.findIndex((el) => el.basicInfo.SessionID == session) == -1) {
                return false;
            }
            return true;
        },
        deleteBattleReport(sesssion: string) {
            const index = this.reports.findIndex((el => el.basicInfo.SessionID == sesssion));
            //TODO add remove from DB
            if (index > -1) {
                this.reports.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    },
})