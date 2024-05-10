<script lang="ts">
import DefaultView from '@views/default.vue';

import { useSettings } from '@stores/settings';
import { useVehiclesData } from '@stores/vehiclesData';

import { registerClipboardInterval } from "@/src/clipboard";
import { sendToMainProcess } from '@/sharedLibs/helpers/eventHelpers';
import { watchEffect } from 'vue';
export default {
  setup() {
    var Settings = useSettings();
    var VehiclesData = useVehiclesData();

    // Watcher config dir state
    watchEffect(async () => {
      if (Settings.states.configDir == 'loaded') {
        console.log("data sets path is set");
        // Load vehicles datasets then register clipboard and get the reports data
        VehiclesData.loadDatasets().then(() => {
          registerClipboardInterval();
          sendToMainProcess({ name: "reports-get-all", data: { from: 0, to: 0 } });
        });
      }
    });

    return { Settings, VehiclesData }
  },
  beforeUnmount() {
    Ipc.removeAllListeners();
    console.warn("App unmounting");
  },
  components: { DefaultView },
  data() {
    return {
      viewList: [{
        name: "reports",
        view: DefaultView
      },
      {
        name: "charts",
        view: DefaultView
      }]
    }
  },

  async mounted() {
    sendToMainProcess({ name: "get-path", data: "" });
  },
  methods: {
    currentView() {
      let currentView = this.viewList.find((el) => el.name == this.Settings.view);
      if (currentView == null) { return DefaultView; }
      return currentView.view;
    }
  }
}
import Ipc from '@services/ipc';
</script>

<template>
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