<template>
    <div>
        <button @click="toggleFilter('today')">Today</button>
        <button @click="toggleFilter('yesterday')">Last Day</button>
        <button @click="toggleFilter('week')">Last Week</button>
        <button @click="toggleFilter('30days')">Last 30 Days</button>
        <button @click="toggleFilter('all')">All</button>
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useBattleReports } from '@stores/battleReports'

export default {
    computed: {
        ...mapState(useBattleReports, ['filter']),
    },
    methods: {
        ...mapActions(useBattleReports, ['toggleFilter'])
    },

}
</script>