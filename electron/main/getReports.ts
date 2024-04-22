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
        time: data.time,
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

export async function all(): Promise<BattleReport[]> {
    const reportsInfo = await getTable('reports').orderBy("date", "asc").then((val: ReportInfoDB[]) => val);
    const activity = await getTable("battle_activity").then((val: BattleActivityDB[]) => val);
    const assistance = await getTable("assistance").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const awards = await getTable("awards").then((val: AwardsDB[]) => val);
    const capture = await getTable("capture").then((val: CaptureDB[]) => val);
    const criticalDamage = await getTable("critical_damage").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const severeDamage = await getTable("severe_damage").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const damage = await getTable("damage").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const damageBases = await getTable("damage_bases").then((val: DamageBasesDB[]) => val);
    const damageToScouted = await getTable("damage_scouted").then((val: ScoutingDB[]) => val);
    const destructionAir = await getTable("destruction_air").then((val: DestructionAirDB[]) => val);
    const destructionBases = await getTable("destruction_bases").then((val: DamageBasesDB[]) => val);
    const destructionGroundAndFleets = await getTable("destruction_ground_fleets").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const destructionOfScouted = await getTable("destruction_scouted").then((val: AssistanceDamageDestructScoutDB[]) => val);
    const landings = await getTable("landings").then((val: LandingsAndTakeoffsDB[]) => val);
    const scouting = await getTable("scouting").then((val: ScoutingDB[]) => val);
    const takeoffs = await getTable("takeoffs").then((val: LandingsAndTakeoffsDB[]) => val);
    const timePlayed = await getTable("time_played").then((val: TimePlayedDB[]) => val);

    const researchedVehicles = await getTable("researched_vehicles").then((val: ReaserchedVehicleDB[]) => val);
    const researchedModifications = await getTable("researched_modifications").then((val: ReaserchedModificationDB[]) => val);
    const repairedVehicles = await getTable("repaired_vehicles").then((val: RepairedVehiclesDB[]) => val);

    var reports: BattleReport[] = [];

    for (const info of reportsInfo) {
        const repaired = repairedVehicles.filter(filtered => filtered.session_id == info.session_id);
        const researchedMods = researchedModifications.filter(filtered => filtered.session_id == info.session_id);
        const researchedVehs = researchedVehicles.filter(filtered => filtered.session_id == info.session_id);

        reports.push({
            activity: activity.filter(filtered => filtered.session_id == info.session_id).map(el => convertActivityDB(el)),
            assistance: assistance.filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            awards: awards.filter(filtered => filtered.session_id == info.session_id).map(el => convertAwardsDB(el)),
            basicInfo: convertReportDB(info, repaired, researchedMods, researchedVehs),
            capture: capture.filter(filtered => filtered.session_id == info.session_id).map(el => convertCaptureDB(el)),
            criticalDamage: criticalDamage.filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            severeDamage: severeDamage.filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            damage: damage.filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            damageBases: damageBases.filter(filtered => filtered.session_id == info.session_id).map(el => convertBombingDB(el)),
            damageToScouted: damageToScouted.filter(filtered => filtered.session_id == info.session_id).map(el => convertScouting(el)),
            destructionAir: destructionAir.filter(filtered => filtered.session_id == info.session_id).map(el => convertAirKillsDB(el)),
            destructionBases: destructionBases.filter(filtered => filtered.session_id == info.session_id).map(el => convertBombingDB(el)),
            destructionGroundAndFleets: destructionGroundAndFleets.filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            destructionOfScouted: destructionOfScouted.filter(filtered => filtered.session_id == info.session_id).map(el => convertAssistanceDamageDestructScoutDB(el)),
            landings: landings.filter(filtered => filtered.session_id == info.session_id).map(el => convertTakeoffLanding(el)),
            scouting: scouting.filter(filtered => filtered.session_id == info.session_id).map(el => convertScouting(el)),
            takeoffs: takeoffs.filter(filtered => filtered.session_id == info.session_id).map(el => convertTakeoffLanding(el)),
            timePlayed: timePlayed.filter(filtered => filtered.session_id == info.session_id).map(el => convertTimePlayedDB(el)),
        });
    }

    return reports;
} 