<script setup lang="ts">
import Notifier from '@components/notifier/notifier.vue';
import BattleReportsList from '@components/reports/reports.vue';
import ResearchBox from '@components/ResearchBox.vue';
import InputTextbox from '@components/InputTextbox.vue';
import SummaryBox from '@components/SummaryBox.vue';
import SideMenu from '@components/SideMenu.vue';
import Filters from '@components/Filters.vue';
//import Debug from '@components/debugReportsStore.vue';
</script>

<template>
    <!--<Debug></Debug>-->
    <div class="grid-menu">
        <Notifier></Notifier>
        <SideMenu></SideMenu>
        <div>
            <Filters></Filters>
            <div class="grid">
                <section class="reports">
                    <BattleReportsList></BattleReportsList>
                </section>
                <section class="modifications">
                    <ResearchBox></ResearchBox>
                </section>
                <section class="textbox">
                    <InputTextbox></InputTextbox>
                </section>
                <section class="summary">
                    <SummaryBox></SummaryBox>
                </section>
            </div>
        </div>
    </div>
</template>