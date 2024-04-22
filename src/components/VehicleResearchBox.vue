<template>
    <div class="vehicle-box-holder">
        <div class="vehicle-box">
            <div class="vehicle-box-image"><img :src="vehicleImg"></div>
            <div class="vehicle-box-title" v-text="name"></div>
        </div>
        <div class="vehicle-box-exp-holder" v-text="numberWithCommas(research) + ' / ' + numberWithCommas(researchMax)">
        </div>
    </div>
</template>

<script lang="ts">

import { numberWithCommas } from "@/sharedLibs/utils";
import { VehiclesDetailsInTime } from '@/types/datasets';
import { useVehiclesData } from '@stores/vehiclesData';


export default {
    setup() {
        let Vehicles = useVehiclesData();
        return { Vehicles };
    },
    mounted() {
        this.vehicle = this.Vehicles.findVehicle(this.name) || this.Vehicles.createVehicleTemplate();
    },
    data() {
        return {
            vehicle: {} as VehiclesDetailsInTime
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        research: {
            type: Number,
            required: true
        }
    },
    computed: {
        vehicleImg() {
            return this.vehicle.thumbnail || "https://encyclopedia.warthunder.com/i/slots/us_m2a4.png";
        },
        researchMax() {
            return this.vehicle.cost?.find((el) => el.time > 0)?.value.reaserch || 0;
        }
    },
    methods: { numberWithCommas }
};
</script>

<style>
.vehicle-box-holder {
    border: 1px solid var(--reportBorderColor);
}

.vehicle-box {
    background: #0e518881;
    padding: 0.3em;
    display: flex;
    flex-flow: row;
}

.vehicle-box-title {
    font-size: 0.8em;
}

.vehicle-box-image img {
    height: 2.5em;
}
</style>