<template>
    <div class="summary_box">
        <div v-text="`Battles: ${numberWithCommas(summary.battles)}`"></div>
        <div v-text="`Wins: ${numberWithCommas(summary.wins)}`"></div>
        <div v-text="`WR: ${Math.round(summary.wins / summary.battles * 100)}%`"></div>
        <div v-text="`Credits: ${numberWithCommas(summary.credits)}`"></div>
        <div v-text="`RP: ${numberWithCommas(summary.research)}`"></div>
        <div v-text="`Kills Air: ${numberWithCommas(summary.killsAir)}`"></div>
        <div v-text="`Kills GroundNavy: ${numberWithCommas(summary.killsGroundNavy)}`"></div>
        <div v-text="`Deaths: ${numberWithCommas(summary.deaths)}`"></div>
        <div v-text="`Spawns: ${numberWithCommas(summary.spawns)}`"></div>
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useBattleReports } from '@stores/battleReports'
import { numberWithCommas } from '@/sharedLibs/utils';

export default {
    computed: {
        ...mapState(useBattleReports, ['summary']),
    },
    methods: {
        numberWithCommas,
        ...mapActions(useBattleReports, ['toggleFilter'])
    },

}
</script>

<style>
.summary_box {
    color: var(--text);
}
</style>