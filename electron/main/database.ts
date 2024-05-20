import { Knex, knex } from "knex";
import path from "path";

var AppDataPath: string = null;
export var database: Knex = null;

export function isExists() {
    return database.table("basic_info").select().then((row) => row.length > 0).catch(() => false);
}

export function createDB() {
    if (!database) {
        console.log("DB down?");
        return false;
    }
    database.schema.createTable("basic_info", (t) => {
        t.integer('clipboard', 1);
        t.string('version', 15);
        t.integer('created_at', 15);
    }).then();

    database.schema.createTable("reports", (t) => {
        t.increments('id').primary();
        t.string('session_id', 20);
        t.string('result', 15);
        t.string('map', 20);
        t.string('mode', 20);
        t.string('nation', 20);
        t.integer('activity', 3);
        t.integer('friendly_kills', 6);
        t.integer('skill_bonus', 6);
        t.integer('vehicles_repair', 6);
        t.integer('ammo_crew_replenishment', 6);
        t.integer('other_awards_credits_base', 6);
        t.integer('other_awards_credits_boosters', 6);
        t.integer('other_awards_research_base', 6);
        t.integer('other_awards_research_boosters', 6);
        t.integer('reward_for_winning', 6);
        t.integer('reward_for_mission', 6);
        t.integer('created_at', 15);
        t.integer('date', 15);

        t.unique('session_id');
        t.index(['session_id'], 'sid');
        t.index(['map'], "map");
        t.index(['mode'], "mode");
        t.index(['nation'], "nation");
        t.index(['result'], "result");
        t.index(['activity'], "activity");
        t.index(['date'], "date");

    }).then();

    database.schema.createTable("awards", (t) => {
        t.string('session_id', 20);
        t.string('award', 15);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid2");
        t.index(['award'], "award");

        t.index(['session_id', 'created_at'], "sid-time2");
        t.index(['award', 'created_at'], "award-time2");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("battle_activity", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid3");
        t.index(['vehicle'], "vehicle3");

        t.index(['session_id', 'created_at'], "sid-time3");
        t.index(['vehicle', 'created_at'], "vehicle-time3");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("assistance", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid4");
        t.index(['vehicle'], "vehicle4");
        t.index(['session_id', 'created_at'], "sid-time4");
        t.index(['vehicle', 'created_at'], "vehicle-time4");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("capture", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('percent', 3);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid5");
        t.index(['vehicle'], "vehicle5");
        t.index(['percent'], "percent5");

        t.index(['session_id', 'created_at'], "sid-time5");
        t.index(['vehicle', 'created_at'], "vehicle-time5");
        t.index(['percent', 'created_at'], "percent-time5");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("critical_damage", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid6");
        t.index(['vehicle'], "vehicle6");
        t.index(['session_id', 'created_at'], "sid-time6");
        t.index(['vehicle', 'created_at'], "vehicle-time6");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("severe_damage", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid_sev");
        t.index(['vehicle'], "vehicle_sev");
        t.index(['session_id', 'created_at'], "sid-time_sev");
        t.index(['vehicle', 'created_at'], "vehicle-time_sev");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("damage", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid7");
        t.index(['vehicle'], "vehicle7");
        t.index(['session_id', 'created_at'], "sid-time7");
        t.index(['vehicle', 'created_at'], "vehicle-time7");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("destruction_air", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.string('finishing_off', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid8");
        t.index(['vehicle'], "vehicle8");
        t.index(['session_id', 'created_at'], "sid-time8");
        t.index(['vehicle', 'created_at'], "vehicle-time8");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("destruction_ground_fleets", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid9");
        t.index(['vehicle'], "vehicle9");
        t.index(['session_id', 'created_at'], "sid-time9");
        t.index(['vehicle', 'created_at'], "vehicle-time9");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("destruction_scouted", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid10");
        t.index(['vehicle'], "vehicle10");
        t.index(['session_id', 'created_at'], "sid-time10");
        t.index(['vehicle', 'created_at'], "vehicle-time10");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("scouting", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid11");
        t.index(['vehicle'], "vehicle11");
        t.index(['session_id', 'created_at'], "sid-time11");
        t.index(['vehicle', 'created_at'], "vehicle-time11");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("damage_scouted", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('target', 20);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid12");
        t.index(['vehicle'], "vehicle12");
        t.index(['session_id', 'created_at'], "sid-time12");
        t.index(['vehicle', 'created_at'], "vehicle-time12");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("time_played", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('percent', 3);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid13");
        t.index(['vehicle'], "vehicle13");
        t.index(['percent'], "percent13");

        t.index(['session_id', 'created_at'], "sid-time13");
        t.index(['vehicle', 'created_at'], "vehicle-time13");
        t.index(['percent', 'created_at'], "percent-time13");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("landings", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid14");
        t.index(['vehicle'], "vehicle14");
        t.index(['session_id', 'created_at'], "sid-time14");
        t.index(['vehicle', 'created_at'], "vehicle-time14");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("takeoffs", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid15");
        t.index(['vehicle'], "vehicle15");
        t.index(['session_id', 'created_at'], "sid-time15");
        t.index(['vehicle', 'created_at'], "vehicle-time15");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("repaired_vehicles", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid_repair");
        t.index(['vehicle'], "vehicle_repair");
        t.index(['session_id', 'created_at'], "sid-time_repair");
        t.index(['vehicle', 'created_at'], "vehicle-time_repair");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("researched_modifications", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.string('modification', 20);
        t.integer('research', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid_resmod");
        t.index(['vehicle'], "vehicle_resmod");
        t.index(['session_id', 'created_at'], "sid-time_resmod");
        t.index(['vehicle', 'created_at'], "vehicle-time_resmod");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("researched_vehicles", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('research', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid_resveh");
        t.index(['vehicle'], "vehicle_resveh");
        t.index(['session_id', 'created_at'], "sid-time_resveh");
        t.index(['vehicle', 'created_at'], "vehicle-time_resveh");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("destruction_bases", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('tnt', 5);
        t.integer('damage', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid17");
        t.index(['vehicle'], "vehicle17");
        t.index(['tnt'], "tnt17");

        t.index(['session_id', 'created_at'], "sid-time17");
        t.index(['vehicle', 'created_at'], "vehicle-time17");
        t.index(['tnt', 'created_at'], "tnt-time17");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.schema.createTable("damage_bases", (t) => {
        t.string('session_id', 20);
        t.string('vehicle', 20);
        t.integer('tnt', 5);
        t.integer('damage', 6);
        t.integer('credits_base', 6);
        t.integer('credits_boost', 6);
        t.integer('research_base', 6);
        t.integer('research_boost', 6);
        t.integer('time', 5);
        t.integer('created_at', 15);

        t.index(['session_id'], "sid16");
        t.index(['vehicle'], "vehicle16");
        t.index(['tnt'], "tnt16");

        t.index(['session_id', 'created_at'], "sid-time16");
        t.index(['vehicle', 'created_at'], "vehicle-time16");
        t.index(['tnt', 'created_at'], "tnt-time16");

        t.foreign('session_id').references('session_id').inTable('reports');
    }).then();

    database.table("basic_info").insert({ clipboard: 0, version: "1.0", created_at: new Date().getTime() }).then();
}

export function connect(AppDataPath: string) {
    database = knex({
        client: 'sqlite3', // or 'better-sqlite3'
        connection: {
            filename: path.join(AppDataPath, "/database.sqlite")
        },
        useNullAsDefault: true
    });
}