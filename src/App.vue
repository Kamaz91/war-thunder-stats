<script lang="ts">
import DefaultView from '@views/default.vue';
import ChartsView from '@views/charts.view.vue';

import { useSettings } from '@stores/settings';
import { useVehiclesData } from '@stores/vehiclesData';
import { useNotifier } from '@stores/notifier';

//import { registerClipboardInterval } from "@/src/clipboard";
//import { sendToMainProcess } from '@/sharedLibs/helpers/eventHelpers';
import { watchEffect } from 'vue';
//import Ipc from '@services/ipc';

import Notifier from '@components/notifier/notifier.vue';
import { useBattleReports } from './stores/battleReports';

export default {
  setup() {
    var Settings = useSettings();
    var VehiclesData = useVehiclesData();
    var Notifier = useNotifier();
    var BattleReportsStore = useBattleReports();

    // Watcher config dir state
    watchEffect(async () => {
      if (Settings.states.configDir == 'loaded') {
        console.log("data sets path is set");
        // Load vehicles datasets then register clipboard and get the reports data
        VehiclesData.loadDatasets().then(() => {
          //registerClipboardInterval();
          //sendToMainProcess({ name: "reports-get-all", data: { from: 0, to: 0 } });
        });
      }
    });

    return { Settings, VehiclesData, Notifier, BattleReportsStore }
  },
  beforeUnmount() {
    window.Api.removeAllListeners();
    console.warn("App unmounting");
  },
  components: { DefaultView, ChartsView, Notifier },
  data() {
    return {
      viewList: [{
        name: "reports",
        view: DefaultView
      },
      {
        name: "charts",
        view: ChartsView
      }],
      defaultView: DefaultView
    }
  },

  mounted() {
    window.Api.listener.RaportStatus.addTask("Notification", (_ev, eventData) => {
      this.Notifier.addNotification(eventData.status, 5000, false, eventData.message, eventData.data);
    });
    window.Api.listener.Raport.addTask("ReportListener", (_ev, eventData) => {
      this.Notifier.addNotification("success", 5000, false, "Report Added!", "Session Id:" + eventData.basicInfo.SessionID);
      this.BattleReportsStore.addBattleReport(eventData);
    });
    this.getReports();
  },
  methods: {
    currentView() {
      let currentView = this.viewList.find((el) => el.name == this.Settings.view);
      if (currentView == null) { return this.defaultView; }
      return currentView.view;
    },
    async getReports() {
      let reports = await window.Api.report.count();
      const limit = 500;

      console.log(reports.count);
      for (let offset = 0; offset < reports.count;) {
        await window.Api.report.getChunk(offset, limit).then((reports) => {
          console.log(reports);
          for (const report of reports) {
            this.BattleReportsStore.addBattleReport(report);
          }
        });
        offset += limit;
      }
    }
  }
}
</script>

<template>
  <Notifier></Notifier>
  <component :is="currentView()"></component>
</template>

<style>
html,
body {
  height: 100%;
  min-height: 100%;
}

#app {
  max-height: 100%;
  height: 100%;
}

.grid-menu {
  display: grid;
  grid-template-columns: 8em auto;
  max-height: 100%;
  min-height: 100%;
}

.grid {
  display: grid;
  max-height: 100%;
  height: 100%;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    "reports modifications"
    "reports summary"
    "reports summary"
    "textbox summary";
}

.reports {
  max-height: 100%;
  height: 100%;
  grid-area: reports;
}

.modifications {
  grid-area: modifications;
}

.textbox {
  grid-area: textbox;
}

.sideMenu {
  grid-area: menu;
}

.summary {
  grid-area: summary;
}
</style>