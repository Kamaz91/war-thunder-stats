export interface ExtractedData {
    text: string;
    data: BasicInfo
}

export interface Earned {
    base: number;
    boosters: number;
}

export interface Ernable {
    credits: Earned;
    research: Earned;
}


export interface BasicReportInfo {
    time: number;
    credits: Earned;
    research: Earned;
}

export interface BasicInfo {
    researchedVehicles: { vehicle: string; research: number }[];
    researchedModifications: { vehicle: string; modification: string; research: number }[];
    SessionID: string;
    Activity: number;
    friendlyKills: number;
    skillBonus: number;
    vehiclesRepair: number;
    ammoCrewReplenishment: number;
    damagedVehicles: string[];
    otherAwards: Ernable;
    RewardForWinning: number;
    RewardForMission: number;
    nation: string;
    date: number;
    Battle: {
        result: string;
        mode: string;
        map: string;
    }
}

export interface Awards extends BasicReportInfo {
    award: string;
}

export interface Activity extends Ernable {
    vehicle: string;
}

export interface HitsAndDestroys extends BasicReportInfo {
    vehicle: string;
    target: string;
}

export interface DestructionAir extends BasicReportInfo {
    vehicle: string;
    finishingOff: string;
    target: string;
}

export interface Bombing extends BasicReportInfo {
    vehicle: string;
    TNT: number;
    damage: number;
}

export interface TakeoffsLandings extends Omit<BasicReportInfo, "credits"> {
    vehicle: string;
}

export interface TimePlayed extends Omit<BasicReportInfo, "credits"> {
    vehicle: string;
    percent: number;
}

export interface Capture extends BasicReportInfo {
    vehicle: string;
    percent: number;
}

export interface Scouting extends Omit<BasicReportInfo, "research"> {
    vehicle: string;
    target: string;
}

export interface BattleReport {
    basicInfo: BasicInfo;
    activity: Activity[];
    assistance: HitsAndDestroys[];
    awards: Awards[];
    capture: Capture[];
    criticalDamage: HitsAndDestroys[];
    severeDamage: HitsAndDestroys[];
    destructionAir: DestructionAir[];
    destructionGroundAndFleets: HitsAndDestroys[];
    damage: HitsAndDestroys[];
    scouting: Scouting[];
    damageToScouted: Scouting[];
    destructionOfScouted: HitsAndDestroys[];
    timePlayed: TimePlayed[];
    landings: TakeoffsLandings[];
    takeoffs: TakeoffsLandings[];
    destructionBases: Bombing[];
    damageBases: Bombing[];
}