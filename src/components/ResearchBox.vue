<template>
    <div class="boxes-holder">
        <vehicle-research-box class="research-vehs" v-for="[vehicle, research] of researchedVehicles" :name="vehicle"
            :research="research">
        </vehicle-research-box>
    </div>
    <div class="research-mods" v-for="[vehicle, modifications] of researchedModifications">
        <span v-text="vehicle"></span>:
        <div class="mod-holder">
            <div class="mod-box" v-for="[modificationName, research] of modifications">
                <span v-text="modificationName"></span>:
                <span v-text="numberWithCommas(research) + ' RP'"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useBattleReports } from '@stores/battleReports'
import { numberWithCommas } from '@/sharedLibs/utils';
import VehicleResearchBox from '@components/VehicleResearchBox.vue';

export default {
    //TODO Połączyć researchedVehicles() i researchedModifications() w jedną funkcję aby liczyć wszystko raz
    // Dodać zliczanie Map z gry
    components: { VehicleResearchBox },
    computed: {
        researchedVehicles(): Map<string, number> {
            let vehicles = new Map();
            for (const report of this.filteredReports) {
                report.basicInfo.researchedVehicles.forEach((el) => {
                    if (vehicles.has(el.vehicle)) {
                        let veh: number = vehicles.get(el.vehicle);
                        veh += el.research;
                        vehicles.set(el.vehicle, veh);
                    } else {
                        vehicles.set(el.vehicle, el.research);
                    }
                });
            }
            return vehicles;
        },
        researchedModifications(): Map<string, Map<string, number>> {
            let vehicles = new Map();
            for (const report of this.filteredReports) {
                report.basicInfo.researchedModifications.forEach((el) => {
                    if (vehicles.has(el.vehicle)) {
                        let veh = vehicles.get(el.vehicle);
                        var mod: number = el.research;

                        if (veh.has(el.modification)) {
                            mod += veh.get(el.modification);
                        }
                        veh.set(el.modification, mod);

                        vehicles.set(el.vehicle, veh);
                    } else {
                        let veh = new Map().set(el.modification, el.research);
                        vehicles.set(el.vehicle, veh);
                    }
                });
            }
            return vehicles;
        },
        ...mapState(useBattleReports, ['filteredReports']),
    },
    methods: {
        calculateReaserch() {
            let vehicles = new Map();
            let vehiclesMods = new Map();

            for (const report of this.filteredReports) {
                report.basicInfo.researchedModifications.forEach((el) => {
                    if (vehicles.has(el.vehicle)) {
                        let veh = vehicles.get(el.vehicle);
                        var mod: number = el.research;

                        if (veh.has(el.modification)) {
                            mod += veh.get(el.modification);
                        }
                        veh.set(el.modification, mod);

                        vehicles.set(el.vehicle, veh);
                    } else {
                        let veh = new Map().set(el.modification, el.research);
                        vehicles.set(el.vehicle, veh);
                    }
                });
                report.basicInfo.researchedVehicles.forEach((el) => {
                    if (vehiclesMods.has(el.vehicle)) {
                        let veh: number = vehiclesMods.get(el.vehicle);
                        veh += el.research;
                        vehiclesMods.set(el.vehicle, veh);
                    } else {
                        vehiclesMods.set(el.vehicle, el.research);
                    }
                });
            }
            return { vehicles, vehiclesMods };
        },
        numberWithCommas
    }
}
</script>

<style>
.boxes-holder {
    display: grid;
    grid-template-columns: repeat(auto-fill, 8em);
    grid-template-rows: repeat(auto-fill, 6em);
    grid-row-gap: .5em;
    grid-column-gap: 1em;
}

.research-vehs,
.research-mods {
    color: var(--text);
}

.mod-holder {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-auto-flow: row;
    gap: 1em;
}

.mod-box {
    padding: 0.3em;
    border: 1px solid #00000034;
}
</style>