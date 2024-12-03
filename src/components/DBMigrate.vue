<template>
    <button @click="migrate()">Migrate</button>
</template>

<script lang="ts">
//import db from "@services/sequelize";

export default {
    methods: {
        async migrate() {
            //let knexDB: any = {}

            // const t = await db.Sequelize.transaction();
            // try {
            //     const report = await db.BattleReports.create({
            //         session_id: "TEST #01",
            //         activity: 12,
            //         map: "TEST_MAP",
            //         mode: "TEST_MODE",
            //         nation: "TEST_NATION",
            //         result: "TEST_RESULT",
            //         ammo_crew_replenishment: 1225234,
            //         friendly_kills: 12,
            //         other_awards_credits_base: 123423423,
            //         other_awards_credits_boosters: 234234,
            //         other_awards_research_base: 23423423,
            //         other_awards_research_boosters: 6546456,
            //         reward_for_mission: 34634,
            //         reward_for_winning: 435345,
            //         skill_bonus: 34553,
            //         vehicles_repair: 345,
            //         date: new Date()
            //     }, {
            //         transaction: t,
            //     });
            //     console.log(Object.keys(report)); 

            //     await report.createAssist({
            //         report_id: report.report_id,
            //         target: "You",
            //         vehicle: "Me",
            //         research_base: 0,
            //         research_boost: 0,
            //         credits_base: 0,
            //         credits_boost: 0,
            //         time: 0
            //     }, { transaction: t });

            //     await report.addAssists([
            //         {
            //             report_id: report.report_id,
            //             vehicle: "xD",
            //             target: "XDDD",
            //             credits_base: 123,
            //             credits_boost: 123134,
            //             research_base: 123,
            //             research_boost: 12312,
            //             time: 0
            //         },
            //     ],
            //         { transaction: t }
            //     );

            //     await report.addAwards([
            //         {
            //             report_id: report.report_id,
            //             credits_base: 0,
            //             credits_boost: 0,
            //             research_base: 0,
            //             research_boost: 0,
            //             time: 0,
            //             award: "xD"
            //         }
            //     ],
            //         { transaction: t }
            //     );

            //     await t.commit();
            // } catch (error) {
            //     // If the execution reaches this line, an error was thrown.
            //     // We rollback the transaction.
            //     console.error(error);
            //     await t.rollback();
            // }
        }
    }
}
</script>