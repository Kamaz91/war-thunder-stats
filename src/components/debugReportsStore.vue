<template>
    <div class="debug">
        <div>Debug:</div>
        <div>date:<code v-text="date"></code></div>
        <div>filter:<code v-text="filter"></code></div>
        <div>Reports:<code v-text="reports.length"></code></div>
        <div>filteredReports:<code v-text="filteredReports.length"></code></div>
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useBattleReports } from '../stores/battleReports'

export default {
    computed: {
        ...mapState(useBattleReports, ['reports', 'filteredReports', 'filter', 'date']),
    },
    methods: {
        ...mapActions(useBattleReports, ['toggleFilter'])
    },

}
</script>

<style>
.debug {
    position: absolute;
    margin-top: 3em;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.6);
}
</style>