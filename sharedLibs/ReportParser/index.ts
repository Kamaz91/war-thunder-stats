type ParseError = {
    message: string;
    line: number;
    from: number;
    to: number;
};

class ReportParser {
    public InputReport: string;
    Errors: ParseError[]

    constructor(inputReport: string) {
        this.InputReport = inputReport;
    }
    RecognizeReportType() {
        if (this.InputReport.includes("userlog/early_session_leave_plain")) {
            return { category: "ground", type: "unfinished" };
        }
        return { category: "ground", type: "Realistic" };
    }

    extractSessionID() {
        const sessionIDRegex = /Session:\s+(\S+)/;
        const sessionIDMatch = this.InputReport.match(sessionIDRegex);
        if (sessionIDMatch) {
            return sessionIDMatch[0].split(":")[1].trim();
        }
        return "";
    }

    ParseRealisticBattle(): void {
        let sessionID = this.extractSessionID();
        if (sessionID.length == 0) {
            return;
        }
    }

    setPatterns() {
        let Separated = [
            {
                Name: "DamagedVehicles",
                type: String,
                separator: ",",
                pattern: "Damaged Vehicles:"
            },
            {
                Name: "Earned",
                type: Number,
                separator: ",",
                pattern: "Earned:"
            },
            {
                Name: "Total",
                type: Number,
                separator: ",",
                pattern: "Total:"
            }
        ];
        let Simple = [
            {
                Name: "Session",
                type: String,
                pattern: "Session:"
            },
            {
                Name: "Activity",
                type: Number,
                pattern: "Activity:"
            },
            {
                Name: "Repair",
                type: Number,
                pattern: "Automatic repair of all vehicles:"
            },
            {
                Name: "CrewReplenishment",
                type: Number,
                pattern: `Automatic purchasing of ammo and "Crew Replenishment":`
            }
        ]
    }

    ProcessReport() {
        let report = this.RecognizeReportType();
        if (report.type == "ground") {

        }
    }
}