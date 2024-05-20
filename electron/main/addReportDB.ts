import { BattleReport } from "../../types/report";
import { AssistanceDamageDestructScoutDB, AwardsDB, BattleActivityDB, CaptureDB, DamageBasesDB, LandingsAndTakeoffsDB, ReaserchedModificationDB, ReaserchedVehicleDB, ReportInfoDB, ScoutingDB, TimePlayedDB } from "../../types/database";
import { database } from "./database";

function addReportInfo(data: Omit<ReportInfoDB, "created_at" | "id">) {
    Object.assign(data, { created_at: new Date().getTime() });
    return database.table('reports')
        .insert(data)
        .then(row => row)
        .catch(er => {
            console.log("addReportInfo erorr");
            console.log(er);
            return null;
        });
}
function addAssistanceDamageDestructScoutDB(type: "assistance" | "severe_damage" | "critical_damage" | "damage" | "destruction_air" | "destruction_scouted" | "destruction_ground_fleets", array: Omit<AssistanceDamageDestructScoutDB, 'created_at'>[]) {
    let insert: AssistanceDamageDestructScoutDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table(type)
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addAssistanceDamageDestructScoutDB erorr");
            console.log(er);
            return null;
        });
}
function addAwards(array: Omit<AwardsDB, 'created_at'>[]) {
    let insert: AwardsDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table('awards')
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addAwards erorr");
            console.log(er);
            return null;
        });
}
function addReaserchedModifications(array: Omit<ReaserchedModificationDB, 'created_at'>[]) {
    let insert: ReaserchedModificationDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table('researched_modifications')
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addReaserchedModifications erorr");
            console.log(er);
            return null;
        });
}
function addReaserchedVehicles(array: Omit<ReaserchedVehicleDB, 'created_at'>[]) {
    let insert: ReaserchedVehicleDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table('researched_vehicles')
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addReaserchedVehicles erorr");
            console.log(er);
            return null;
        });
}
function addActivity(array: Omit<BattleActivityDB, 'created_at'>[]) {
    let insert: BattleActivityDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table('battle_activity')
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addActivity erorr");
            console.log(er);
            return null;
        });
}
function addCapture(array: Omit<CaptureDB, 'created_at'>[]) {
    let insert: CaptureDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table('capture')
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addCapture erorr");
            console.log(er);
            return null;
        });
}
function addBasesDamageDestruction(type: "destruction_bases" | "damage_bases", array: Omit<DamageBasesDB, 'created_at'>[]) {
    let insert: DamageBasesDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table(type)
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addBasesDamage erorr");
            console.log(er);
            return null;
        });
}
function addScoutingAndDamage(type: "scouting" | "damage_scouted", array: Omit<ScoutingDB, 'created_at'>[]) {
    let insert: ScoutingDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table(type)
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addScouting erorr");
            console.log(er);
            return null;
        });
}
function addLandingsAndTakeoffs(type: "landings" | "takeoffs", array: Omit<LandingsAndTakeoffsDB, 'created_at'>[]) {
    let insert: LandingsAndTakeoffsDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table(type)
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addLandings erorr");
            console.log(er);
            return null;
        });
}
function addTimePlayed(array: Omit<TimePlayedDB, 'created_at'>[]) {
    let insert: TimePlayedDB[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));

    return database.table('time_played')
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addTimePlayed erorr");
            console.log(er);
            return null;
        });
}
function addRepairedVehicles(array: { session_id: string, vehicle: string }[]) {
    let insert: { session_id: string, vehicle: string }[] = array.map(element => Object.assign(element, { created_at: new Date().getTime() }));
    return database.table('repaired_vehicles')
        .insert(insert)
        .then(result => result)
        .catch(er => {
            console.log("addRepairedVehicles erorr");
            console.log(er);
            return null;
        });
}

export default async (report: BattleReport) => {
    let basic = report.basicInfo;

    if (!await addReportInfo({
        session_id: basic.SessionID,
        result: basic.Battle.result,
        map: basic.Battle.map,
        mode: basic.Battle.mode,
        nation: basic.nation,
        activity: basic.Activity,
        friendly_kills: basic.friendlyKills,
        skill_bonus: basic.skillBonus,
        ammo_crew_replenishment: basic.ammoCrewReplenishment,
        date: basic.date,
        other_awards_credits_base: basic.otherAwards.credits.base,
        other_awards_credits_boosters: basic.otherAwards.credits.boosters,
        other_awards_research_base: basic.otherAwards.research.base,
        other_awards_research_boosters: basic.otherAwards.research.boosters,
        reward_for_mission: basic.RewardForMission,
        reward_for_winning: basic.RewardForWinning,
        vehicles_repair: basic.vehiclesRepair
    })) {
        console.log("Cant Add Report");
        return false;
    }
    if (report.activity.length > 0) {
        addActivity(report.activity.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters
        })));
    }
    if (basic.damagedVehicles.length > 0) {
        addRepairedVehicles(basic.damagedVehicles.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el
        })));
    }
    if (report.assistance.length > 0) {
        addAssistanceDamageDestructScoutDB("assistance", report.assistance.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.awards.length > 0) {
        addAwards(report.awards.map((el) => ({
            session_id: basic.SessionID,
            award: el.award,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (basic.researchedModifications.length > 0) {
        addReaserchedModifications(basic.researchedModifications.map((el) => ({
            session_id: basic.SessionID,
            modification: el.modification,
            vehicle: el.vehicle,
            research: el.research,
        })))
    }
    if (basic.researchedVehicles.length > 0) {
        addReaserchedVehicles(basic.researchedVehicles.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            research: el.research
        })))
    }
    if (report.damageBases.length > 0) {
        addBasesDamageDestruction("damage_bases", report.damageBases.map((el) => ({
            session_id: basic.SessionID,
            tnt: el.TNT,
            damage: el.damage,
            vehicle: el.vehicle,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.destructionBases.length > 0) {
        addBasesDamageDestruction("destruction_bases", report.destructionBases.map((el) => ({
            session_id: basic.SessionID,
            tnt: el.TNT,
            damage: el.damage,
            vehicle: el.vehicle,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.capture.length > 0) {
        addCapture(report.capture.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            percent: el.percent,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.damage.length > 0) {
        addAssistanceDamageDestructScoutDB("damage", report.damage.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.criticalDamage.length > 0) {
        addAssistanceDamageDestructScoutDB("critical_damage", report.criticalDamage.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.severeDamage.length > 0) {
        addAssistanceDamageDestructScoutDB("severe_damage", report.criticalDamage.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.destructionAir.length > 0) {
        addAssistanceDamageDestructScoutDB("destruction_air", report.destructionAir.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.destructionGroundAndFleets.length > 0) {
        addAssistanceDamageDestructScoutDB("destruction_ground_fleets", report.destructionGroundAndFleets.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.destructionOfScouted.length > 0) {
        addAssistanceDamageDestructScoutDB("destruction_scouted", report.destructionOfScouted.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.damageToScouted.length > 0) {
        addScoutingAndDamage("damage_scouted", report.damageToScouted.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            time: el.time
        })));
    }
    if (report.landings.length > 0) {
        addLandingsAndTakeoffs("landings", report.landings.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.takeoffs.length > 0) {
        addLandingsAndTakeoffs("takeoffs", report.takeoffs.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.timePlayed.length > 0) {
        addTimePlayed(report.timePlayed.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            percent: el.percent,
            research_base: el.research.base,
            research_boost: el.research.boosters,
            time: el.time
        })));
    }
    if (report.scouting.length > 0) {
        addScoutingAndDamage("scouting", report.scouting.map((el) => ({
            session_id: basic.SessionID,
            vehicle: el.vehicle,
            target: el.target,
            credits_base: el.credits.base,
            credits_boost: el.credits.boosters,
            time: el.time
        })));
    }
    return true;
}