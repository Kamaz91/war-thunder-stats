<template>
    <div class="raports-holder">
        <ListElement :report="report" :key="report.basicInfo.SessionID" v-for="report of filteredReports">
        </ListElement>
        <div v-if="filteredReports.length < 1">No Reports is storage</div>
    </div>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { useBattleReports } from '@stores/battleReports';
import ListElement from "@components/reports/list-element.vue";

export default {
    components: { ListElement },
    computed: {
        ...mapState(useBattleReports, ['filteredReports', 'date']),
    },
}
</script>

<style>
.raports-holder {
    display: grid;
    padding: 0.7em;
    row-gap: 0.5em;
}
</style>../../stores/battleReports./reports.vue