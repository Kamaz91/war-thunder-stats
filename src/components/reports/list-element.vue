<template>
    <div class="report-element">
        <div v-if="victory" class="emblem-big emblem-center green material-symbols-outlined">select_check_box</div>
        <div v-else class="emblem-big emblem-center red material-symbols-outlined">disabled_by_default</div>
        <div class="report-element-two-rows">
            <div>
                <span class="emblem-text material-symbols-outlined">{{ gameMode }}</span>
                <span>{{ report.basicInfo.Battle.result }}</span>
                <span>{{ report.basicInfo.Battle.map }}</span>
                <span>{{ report.basicInfo.Battle.mode }}</span>
                <span v-text="date"></span>
            </div>
            <div class="report-element-lower-row">
                <span>
                    <span class="emblem-text material-symbols-outlined">universal_currency_alt</span>
                    <span :class="{ red: Earned.credits < 0 }" v-text="Earned.credits"></span>
                </span>
                <span>
                    <span class="emblem-text material-symbols-outlined">emoji_objects</span>
                    <span v-text="Earned.research"></span>
                </span>
                <span v-text="'Kills: ' + kills"></span>
                <span v-text="'Assists: ' + report.assistance.length"></span>
                <span v-text="'Deaths: ' + deaths"></span>
                <span v-text="'Session: ' + report.basicInfo.SessionID"></span>
            </div>
        </div>
        <div class="del-button">
            <button class="no-button red emblem-big emblem-center material-symbols-outlined"
                @click="deleteBattleReport(report.basicInfo.SessionID)">delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { useBattleReports } from '@stores/battleReports';
import { useVehiclesData } from '@stores/vehiclesData';
import { mapActions } from 'pinia';
import { BattleReport } from '@/types/report';

export default {
    setup() {
        let vehiclesData = useVehiclesData();
        return { vehiclesData };
    },
    props: {
        report: {
            type: Object as PropType<BattleReport>,
            required: true
        }
    },
    computed: {
        gameMode(): string {
            for (const playedVehicle of this.report.timePlayed) {
                let vh = this.vehiclesData.findVehicle(playedVehicle.vehicle);
                let x = vh?.type.findLast(el => el.time < new Date().getTime())?.value;
                if ((x == 'fighter' || x == 'strike_aircraft' || x == 'bomber') && this.report.timePlayed.length <= 1) {
                    return "travel";
                }
            }
            return "grass";
        },
        kills(): number {
            let groundKills = this.report.destructionGroundAndFleets.filter((el) => !el.target.includes("(AI)"));
            let airKills = this.report.destructionAir.filter((el) => !el.target.includes("(AI)"));
            return groundKills.length + airKills.length;
        },
        deaths(): number {
            //TODO improve detection of death
            if (this.report.awards.find((el) => el.award.toLowerCase().includes("survivor"))) {
                return 0;
            }
            return this.report.basicInfo.damagedVehicles.length;
        },
        date() {
            return new Date(this.report.basicInfo.date).toLocaleDateString('en-gb', { year: 'numeric', month: 'numeric', day: 'numeric' })
        },
        victory(): boolean {
            return this.report.basicInfo.Battle.result == "Victory"
        },
        Earned(): { credits: number, research: number } {
            const basic = this.report.basicInfo;
            var credits = 0;
            var research = 0;

            for (const entry of Object.values(this.report)) {
                if (!Array.isArray(entry) && entry !== null) {
                    continue;
                }
                if (entry.length == 0) {
                    continue;
                }
                if (entry[0].hasOwnProperty('credits')) {
                    for (const el of entry) {
                        credits += el.credits.base + el.credits.boosters;
                    }
                }
                if (entry[0].hasOwnProperty('research')) {
                    for (const el of entry) {
                        research += el.research.base + el.research.boosters;
                    }
                }
            }

            research += basic.skillBonus + basic.otherAwards.research.base + basic.otherAwards.research.boosters;

            credits += basic.RewardForMission + basic.RewardForWinning + basic.otherAwards.credits.base + basic.otherAwards.credits.boosters;
            credits -= basic.vehiclesRepair + basic.ammoCrewReplenishment + basic.friendlyKills;

            return { credits, research: Math.round(research) };
        }
    },
    methods: {
        ...mapActions(useBattleReports, ['deleteBattleReport'])
    }
}
</script>

<style>
.report-element {
    background: var(--backgroundLight);
    color: var(--darkText);
    padding: 0.4em;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 100%;
    justify-content: start;
    border-radius: 0.3em;
    border: 1px solid var(--reportBorderColor);
    box-shadow: 0px 0px 4px #00000031;
}

.report-element span {
    padding: 0 0.2em;
}

.report-element-two-rows {
    grid-column: 2 / 13;
    justify-self: start;
    align-self: start;
}

.report-element-lower-row {
    font-size: 0.9em;
    color: var(--darkerText);
}

.emblem-big {
    height: 100%;
    font-size: 2.5em;
}

.emblem-center {
    align-self: center;
    justify-self: center;
}

.emblem-text {
    height: 100%;
    font-size: inherit;
}

.green {
    color: var(--accept);
}

.red {
    color: var(--denial);
}

.no-button {
    padding: 0;
    border: none;
    background-color: transparent;
}

.del-button {
    grid-column: -1;
}
</style>./list-element.vue