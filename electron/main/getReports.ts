import { Activity, Awards, BasicInfo, BattleReport, Bombing, Capture, DestructionAir, HitsAndDestroys, Scouting, TakeoffsLandings, TimePlayed } from "../../types/report";
import { database } from "./database";
import { Tables, AssistanceDamageDestructScoutDB, AwardsDB, BattleActivityDB, CaptureDB, DamageBasesDB, LandingsAndTakeoffsDB, ReaserchedModificationDB, ReaserchedVehicleDB, ReportInfoDB, ScoutingDB, TimePlayedDB, RepairedVehiclesDB, DestructionAirDB } from "../../types/database";

interface filters {

}

function getTable(table: Tables) {
    return database
        .table(table)
        .select();
}

function convertActivityDB(data: BattleActivityDB): Activity {
    return {
        credits: { base: data.credits_base, boosters: data.credits_boost },
        research: { base: data.research_base, boosters: data.research_boost },
        vehicle: data.vehicle
    }
}

function convertAssistanceDamageDestructScoutDB(data: AssistanceDamageDestructScoutDB): HitsAndDestroys {
    return {
        credits: { base: data.credits_base, boosters: data.credits_boost },
        research: { base: data.research_base, boosters: data.research_boost },
        time: data.time,
        target: data.target,
        vehicle: data.vehicle
    }
}

function convertAwardsDB(data: AwardsDB): Awards {
    return {
        credits: { base: data.credits_base, boosters: data.credits_boost },
        research: { base: data.research_base, boosters: data.research_boost },
        time: data.time,
        award: data.award
    }
}

function convertAirKillsDB(data: DestructionAirDB): DestructionAir {
    return {
        credits: { base: data.credits_base, boosters: data.credits_boost },
        research: { base: data.research_base, boosters: data.research_boost },
        finishingOff: data.finishing_off ?? "",
        time: data.time,
        target: data.target,
        vehicle: data.vehicle
    }
}


function convertCaptureDB(data: CaptureDB): Capture {
    return {
        percent: data.percent,
        credits: { base: data.credits_base, boosters: data.credits_boost },
        research: { base: data.research_base, boosters: data.research_boost },
        time: data.time,
        vehicle: data.vehicle
    }
}

function convertBombingDB(data: DamageBasesDB): Bombing {
    return {
        credits: { base: data.credits_base, boosters: data.credits_boost },
        research: { base: data.research_base, boosters: data.research_boost },
        time: data.time,
        TNT: data.tnt,
        damage: data.damage,
        vehicle: data.vehicle
    }
}

function convertScouting(data: ScoutingDB): Scouting {
    return {
        credits: { base: data.credits_base, boosters: data.credits_boost },
        time: data.time,
        target: data.target,
        vehicle: data.vehicle
    }
}

function convertTakeoffLanding(data: LandingsAndTakeoffsDB): TakeoffsLandings {
    return {
        research: { base: data.research_base, boosters: data.research_boost },
        time: data.time,
        vehicle: data.vehicle
    }
}

function convertTimePlayedDB(data: TimePlayedDB): TimePlayed {
    return {
        percent: data.percent,
        research: { base: data.research_base, boosters: data.research_boost },
        time: data.time,
        vehicle: data.vehicle
    }
}

function convertReportDB(data: ReportInfoDB, repaired: RepairedVehiclesDB[], modifications: ReaserchedModificationDB[], researched: ReaserchedVehicleDB[]): BasicInfo {
    return {
        Activity: data.activity,
        ammoCrewReplenishment: data.ammo_crew_replenishment,
        Battle: {
            map: data.map,
            mode: data.mode,
            result: data.result
        },
        damagedVehicles: repaired.map(el => el.vehicle),
        date: data.date,
        nation: data.nation,
        otherAwards: {
            credits: {
                base: data.other_awards_credits_base,
                boosters: data.other_awards_credits_boosters
            },
            research: {
                base: data.other_awards_research_base,
                boosters: data.other_awards_research_boosters
            }
        },
        skillBonus: data.skill_bonus,
        friendlyKills: data.friendly_kills,
        researchedModifications: modifications.map(el => ({ vehicle: el.vehicle, modification: el.modification, research: el.research })),
        researchedVehicles: researched.map(el => ({ vehicle: el.vehicle, research: el.research })),
        RewardForMission: data.reward_for_mission,
        RewardForWinning: data.reward_for_winning,
        SessionID: data.session_id,
        vehiclesRepair: data.vehicles_repair
    }
}

export function filtered({ from, to }: { from: number, to: number }, filters?: filters): Promise<ReportInfoDB[] | null> {
    let query = database.table("reports")
        .select()
        .whereBetween("date", [from, to]);

    return query.then(result => result)
        .catch(er => {
            console.log("GetReports erorr");
            console.log(er);
            return null;
        });
}

export async function getReport(SessionID: string) {
    return await getTable('reports').where({ session_id: SessionID }).then((val: ReportInfoDB[]) => val.length > 0);
}

export async function all(): Promise<BattleReport[]> {
    const reportsInfo = getTable('reports').orderBy("date", "asc").then((val: ReportInfoDB[]) => val);
    const activity = getTable("battle_activity").then((val: BattleActivityDB[]) => val);
    const assistance = getTable("assistance").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const awards = getTable("awards").then((val: AwardsDB[]) => val);
    const capture = getTable("capture").then((val: CaptureDB[]) => val);
    const criticalDamage = getTable("critical_damage").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const severeDamage = getTable("severe_damage").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const damage = getTable("damage").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const damageBases = getTable("damage_bases").then((val: DamageBasesDB[]) => val);
    const damageToScouted = getTable("damage_scouted").then((val: ScoutingDB[]) => val);
    const destructionAir = getTable("destruction_air").then((val: DestructionAirDB[]) => val);
    const destructionBases = getTable("destruction_bases").then((val: DamageBasesDB[]) => val);
    const destructionGroundAndFleets = getTable("destruction_ground_fleets").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const destructionOfScouted = getTable("destruction_scouted").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const landings = getTable("landings").then((val: LandingsAndTakeoffsDB[]) => val);
    const scouting = getTable("scouting").then((val: ScoutingDB[]) => val);
    const takeoffs = getTable("takeoffs").then((val: LandingsAndTakeoffsDB[]) => val);
    const timePlayed = getTable("time_played").then((val: TimePlayedDB[]) => val);
    const researchedVehicles = getTable("researched_vehicles").then((val: ReaserchedVehicleDB[]) => val);
    const researchedModifications = getTable("researched_modifications").then((val: ReaserchedModificationDB[]) => val);
    const repairedVehicles = getTable("repaired_vehicles").then((val: RepairedVehiclesDB[]) => val);

    let data = await Promise.all([reportsInfo, activity, assistance, awards, capture, criticalDamage, severeDamage, damage, damageBases, damageToScouted, destructionAir, destructionBases, destructionGroundAndFleets, destructionOfScouted, landings, scouting, takeoffs, timePlayed, researchedVehicles, researchedModifications, repairedVehicles]);

    var reports: BattleReport[] = [];

    for (const info of data[0]) {
        const repaired = data[20].filter(filtered => filtered.session_id == info.session_id);
        const researchedMods = data[19].filter(filtered => filtered.session_id == info.session_id);
        const researchedVehs = data[18].filter(filtered => filtered.session_id == info.session_id);

        reports.push({
            activity: data[1].filter(filtered => filtered.session_id == info.session_id).map(el => convertActivityDB(el)),
            assistance: data[2].filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            awards: data[3].filter(filtered => filtered.session_id == info.session_id).map(el => convertAwardsDB(el)),
            basicInfo: convertReportDB(info, repaired, researchedMods, researchedVehs),
            capture: data[4].filter(filtered => filtered.session_id == info.session_id).map(el => convertCaptureDB(el)),
            criticalDamage: data[5].filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            severeDamage: data[6].filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            damage: data[7].filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            damageBases: data[8].filter(filtered => filtered.session_id == info.session_id).map(el => convertBombingDB(el)),
            damageToScouted: data[9].filter(filtered => filtered.session_id == info.session_id).map(el => convertScouting(el)),
            destructionAir: data[10].filter(filtered => filtered.session_id == info.session_id).map(el => convertAirKillsDB(el)),
            destructionBases: data[11].filter(filtered => filtered.session_id == info.session_id).map(el => convertBombingDB(el)),
            destructionGroundAndFleets: data[12].filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            destructionOfScouted: data[13].filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            landings: data[14].filter(filtered => filtered.session_id == info.session_id).map(el => convertTakeoffLanding(el)),
            scouting: data[15].filter(filtered => filtered.session_id == info.session_id).map(el => convertScouting(el)),
            takeoffs: data[16].filter(filtered => filtered.session_id == info.session_id).map(el => convertTakeoffLanding(el)),
            timePlayed: data[17].filter(filtered => filtered.session_id == info.session_id).map(el => convertTimePlayedDB(el)),
        });
    }

    return reports;
}

export function count() {
    return getTable('reports').count<Record<string, number>>({ count: "id" }).then((val) => val[0]);
}

export async function chunk(offset: number, limit: number): Promise<BattleReport[]> {
    console.time("gatherChunk");
    const reportsInfo = await getTable('reports').offset(offset).limit(limit).orderBy("date", "asc").then((val: ReportInfoDB[]) => val);
    let reportsIDs = reportsInfo.map((el) => el.session_id);

    const activity = await getTable("battle_activity").whereIn('session_id', reportsIDs).then((val: BattleActivityDB[]) => val);
    const assistance = await getTable("assistance").whereIn('session_id', reportsIDs).then((val: AssistanceDamageDestructScoutDB[]) => val);
    const awards = await getTable("awards").whereIn('session_id', reportsIDs).then((val: AwardsDB[]) => val);
    const capture = await getTable("capture").whereIn('session_id', reportsIDs).then((val: CaptureDB[]) => val);
    const criticalDamage = await getTable("critical_damage").whereIn('session_id', reportsIDs).then((val: AssistanceDamageDestructScoutDB[]) => val);
    const severeDamage = await getTable("severe_damage").whereIn('session_id', reportsIDs).then((val: AssistanceDamageDestructScoutDB[]) => val);
    const damage = await getTable("damage").whereIn('session_id', reportsIDs).then((val: AssistanceDamageDestructScoutDB[]) => val);
    const damageBases = await getTable("damage_bases").whereIn('session_id', reportsIDs).then((val: DamageBasesDB[]) => val);
    const damageToScouted = await getTable("damage_scouted").whereIn('session_id', reportsIDs).then((val: ScoutingDB[]) => val);
    const destructionAir = await getTable("destruction_air").whereIn('session_id', reportsIDs).then((val: DestructionAirDB[]) => val);
    const destructionBases = await getTable("destruction_bases").whereIn('session_id', reportsIDs).then((val: DamageBasesDB[]) => val);
    const destructionGroundAndFleets = await getTable("destruction_ground_fleets").whereIn('session_id', reportsIDs).then((val: AssistanceDamageDestructScoutDB[]) => val);
    const destructionOfScouted = await getTable("destruction_scouted").whereIn('session_id', reportsIDs).then((val: AssistanceDamageDestructScoutDB[]) => val);
    const landings = await getTable("landings").whereIn('session_id', reportsIDs).then((val: LandingsAndTakeoffsDB[]) => val);
    const scouting = await getTable("scouting").whereIn('session_id', reportsIDs).then((val: ScoutingDB[]) => val);
    const takeoffs = await getTable("takeoffs").whereIn('session_id', reportsIDs).then((val: LandingsAndTakeoffsDB[]) => val);
    const timePlayed = await getTable("time_played").whereIn('session_id', reportsIDs).then((val: TimePlayedDB[]) => val);

    const researchedVehicles = await getTable("researched_vehicles").whereIn('session_id', reportsIDs).then((val: ReaserchedVehicleDB[]) => val);
    const researchedModifications = await getTable("researched_modifications").whereIn('session_id', reportsIDs).then((val: ReaserchedModificationDB[]) => val);
    const repairedVehicles = await getTable("repaired_vehicles").whereIn('session_id', reportsIDs).then((val: RepairedVehiclesDB[]) => val);

    var reports: BattleReport[] = [];

    console.time("Array");

    const processDataAndRemove = <T, R>(data: Array<any>, sessionId: string, convertFn?: (item: T) => R): any[] => {
        const filteredItems: T[] = [];

        // Loop through the data in reverse to safely remove items while iterating
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].session_id === sessionId) {
                const item = data.splice(i, 1)[0]; // Remove the item and get it
                filteredItems.push(item);
            }
        }

        // Map the filtered items to their converted versions
        if (convertFn)
            return filteredItems.map(convertFn);
        return filteredItems;
    };

    for (const info of reportsInfo) {
        const repaired = processDataAndRemove(repairedVehicles, info.session_id);
        const researchedMods = processDataAndRemove(researchedModifications, info.session_id);
        const researchedVehs = processDataAndRemove(researchedVehicles, info.session_id);

        reports.push({
            activity: processDataAndRemove(activity, info.session_id, convertActivityDB),
            assistance: processDataAndRemove(assistance, info.session_id, convertAssistanceDamageDestructScoutDB),
            awards: processDataAndRemove(awards, info.session_id, convertAwardsDB),
            basicInfo: convertReportDB(info, repaired, researchedMods, researchedVehs),
            capture: processDataAndRemove(capture, info.session_id, convertCaptureDB),
            criticalDamage: processDataAndRemove(criticalDamage, info.session_id, convertAssistanceDamageDestructScoutDB),
            severeDamage: processDataAndRemove(severeDamage, info.session_id, convertAssistanceDamageDestructScoutDB),
            damage: processDataAndRemove(damage, info.session_id, convertAssistanceDamageDestructScoutDB),
            damageBases: processDataAndRemove(damageBases, info.session_id, convertBombingDB),
            damageToScouted: processDataAndRemove(damageToScouted, info.session_id, convertScouting),
            destructionAir: processDataAndRemove(destructionAir, info.session_id, convertAirKillsDB),
            destructionBases: processDataAndRemove(destructionBases, info.session_id, convertBombingDB),
            destructionGroundAndFleets: processDataAndRemove(destructionGroundAndFleets, info.session_id, convertAssistanceDamageDestructScoutDB),
            destructionOfScouted: processDataAndRemove(destructionOfScouted, info.session_id, convertAssistanceDamageDestructScoutDB),
            landings: processDataAndRemove(landings, info.session_id, convertTakeoffLanding),
            scouting: processDataAndRemove(scouting, info.session_id, convertScouting),
            takeoffs: processDataAndRemove(takeoffs, info.session_id, convertTakeoffLanding),
            timePlayed: processDataAndRemove(timePlayed, info.session_id, convertTimePlayedDB),
        });
    }

    console.timeEnd("Array");
    console.timeEnd("gatherChunk");

    return reports;
}