export type Tables = "assistance" | "awards" | "battle_activity" | "basic_info" | "critical_damage" | "severe_damage" | "capture" | "damage" | "damage_bases" | "damage_scouted" | "destruction_air" | "destruction_bases" | "destruction_ground_fleets" | "destruction_scouted" | "landings" | "repaired_vehicles" | "reports" | "researched_modifications" | "researched_vehicles" | "scouting" | "takeoffs" | "time_played";

export interface AwardsDB {
    session_id: string;
    award: string;
    research_base: number;
    research_boost: number;
    credits_base: number;
    credits_boost: number;
    time: number;
    created_at: number;
}
export interface BattleActivityDB {
    session_id: string;
    vehicle: string;
    research_base: number;
    research_boost: number;
    credits_base: number;
    credits_boost: number;
    time: number;
    created_at: number;
}
export interface CaptureDB {
    session_id: string;
    vehicle: string;
    percent: number;
    research_base: number;
    research_boost: number;
    credits_base: number;
    credits_boost: number;
    time: number;
    created_at: number;
}
export interface AssistanceDamageDestructScoutDB {
    session_id: string;
    vehicle: string;
    target: string;
    research_base: number;
    research_boost: number;
    credits_base: number;
    credits_boost: number;
    time: number;
    created_at: number;
}
export interface DestructionAirDB {
    session_id: string;
    vehicle: string;
    target: string;
    finishing_off: string;
    research_base: number;
    research_boost: number;
    credits_base: number;
    credits_boost: number;
    time: number;
    created_at: number;
}
export interface DestructionBasesDB {
    session_id: string;
    vehicle: string;
    tnt: number;
    research_base: number;
    research_boost: number;
    credits_base: number;
    credits_boost: number;
    time: number;
    created_at: number;
}
export interface DamageBasesDB {
    session_id: string;
    vehicle: string;
    tnt: number;
    damage: number;
    research_base: number;
    research_boost: number;
    credits_base: number;
    credits_boost: number;
    time: number;
    created_at: number;
}
export interface LandingsAndTakeoffsDB {
    session_id: string;
    vehicle: string;
    research_base: number;
    research_boost: number;
    time: number;
    created_at: number;
}
export interface ScoutingDB {
    session_id: string;
    vehicle: string;
    target: string;
    credits_base: number;
    credits_boost: number;
    time: number;
    created_at: number;
}
export interface TimePlayedDB {
    session_id: string;
    vehicle: string;
    percent: number;
    research_base: number;
    research_boost: number;
    time: number;
    created_at: number;
}
export interface ReportInfoDB {
    id: number;
    session_id: string;
    result: string;
    map: string;
    mode: string;
    nation: string;
    activity: number;
    friendly_kills: number;
    skill_bonus: number;
    vehicles_repair: number;
    ammo_crew_replenishment: number;
    other_awards_credits_base: number;
    other_awards_credits_boosters: number;
    other_awards_research_base: number;
    other_awards_research_boosters: number;
    reward_for_winning: number;
    reward_for_mission: number;
    created_at: number;
    date: number;
}
export interface ReaserchedModificationDB {
    session_id: string;
    vehicle: string;
    modification: string;
    research: number;
    created_at: number;
}
export interface ReaserchedVehicleDB {
    session_id: string;
    vehicle: string;
    research: number;
    created_at: number;
}

export interface RepairedVehiclesDB {
    session_id: string;
    vehicle: string;
    created_at: number;
}

export interface filters {

}