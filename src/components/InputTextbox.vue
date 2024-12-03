<template>
    <input type="date" v-bind:value="dateString" @change="onDateChange">
    <textarea class="textbox-input" rows="5" placeholder="Paste here your battle report..." v-model="textbox"></textarea>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import { useBattleReports } from '@stores/battleReports'
//import { parseReport } from "@/sharedLibs/reportParser";
//import { ipcRenderer } from 'electron';
import { BattleReport } from '@/types/report';

export default {
    name: "reportInput",
    data(): {
        date: Date;
        textbox: string;
    } {
        return {
            date: new Date(),
            textbox: ""
        }
    },
    watch: {
        "textbox": function (newText: string) {
            if (newText.length > 0) {
                this.parseReport(newText);
                this.textbox = "";
            }
        }
    },
    computed: {
        dateString() {
            var dd = new String(this.date.getDate()).padStart(2, '0');
            var mm = new String(this.date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = this.date.getFullYear().toString();
            return yyyy + '-' + mm + '-' + dd;
        }
    },
    methods: {
        onDateChange(event: any) {
            this.date = new Date(event.target.value);
        },
        parseReport(inputText: string) {
            let date = new Date();
            if (date.getDay() !== this.date.getDay() && date.getMonth() !== this.date.getMonth() && date.getFullYear() !== this.date.getFullYear()) {
                date = this.date;
            }
            console.log(date);

            // const extracted = parseReport(inputText, date.getTime());

            // if (extracted == null) {
            //     console.log("Cant Parse report");
            //     return;
            // }

            // if (extracted.basicInfo.SessionID == '' || extracted.basicInfo.Battle.result == '') {
            //     return;
            // }

            // if (!this.hasReport(extracted.basicInfo.SessionID)) {
            //     console.log(extracted);
            //     this.sendReportToDB(extracted);
            //     this.addBattleReport(extracted);
            // } else {
            //     console.log("Battle raport already exists:", extracted.basicInfo.SessionID);
            // }
        },
        sendReportToDB(report: BattleReport) {
            //ipcRenderer.send("report-add", report);
        },
        ...mapActions(useBattleReports, ['addBattleReport', 'hasReport'])
    }
}
</script>

<style>
.textbox-input {
    width: 100%;
    resize: none;
}
</style>