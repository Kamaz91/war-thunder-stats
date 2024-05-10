import { defineStore } from 'pinia'
import { VehiclesDetails, VehiclesDetailsInTime } from '@/types/datasets';
import { useSettings } from '@stores/settings';
import fs from "fs";
import path from 'path';
import { filters } from '@/types/database';

interface State {
    loading: "innitial" | "error" | "reading" | "done";
    vehicles: VehiclesDetailsInTime[];
    vehiclesMap: Map<string, VehiclesDetailsInTime>;
}

export const useVehiclesData = defineStore('vehiclesData', {
    state: (): State => ({
        loading: "innitial",
        vehicles: [],
        vehiclesMap: new Map()
    }),
    actions: {
        getDatasetsPath() {
            let settings = useSettings();
            return settings.datasetsPath;
        },
        filterVehicles(filters: filters) {
            // return this.vehicles.filter(el => el.name.includes(name) || el.nation == nation)
        },
        findVehicle(name: string): VehiclesDetailsInTime | undefined {
            let vehicle = this.vehiclesMap.get(name);
            return vehicle;

        },
        async loadDataset(file: string): Promise<VehiclesDetails[]> {
            var reader: string = await new Promise((resolve, reject) => {
                let x = (error: any, data: string) => {
                    if (error) {
                        reject([]);
                    }
                    resolve(data);
                };

                fs.readFile(path.resolve(this.getDatasetsPath(), file), 'utf8', x);
            });
            return JSON.parse(reader);

        },
        async loadDatasets() {
            this.loading = "reading";
            let files = fs.readdirSync(this.getDatasetsPath());
            for (const file of files) {
                let dataset = await this.loadDataset(file);
                let date = this.parseToDate(file.replace(".json", ""));
                this.setDatasetMap(dataset, date);
            }
            this.loading = "done";
        },
        setDatasetMap(dataset: VehiclesDetails[], time: number) {
            let vehicles = dataset.map(el => {
                let template = this.createVehicleTemplate();
                this.setVehicleDetails(el, template, time);
                return template;
            });
            for (const vehicle of vehicles) {
                if (vehicle.name) {
                    this.vehiclesMap.set(vehicle.name, vehicle);
                }
            }

        },
        setDatasetArray(dataset: VehiclesDetails[], time: number) {
            let vehicles = dataset.map(el => {
                let template = this.createVehicleTemplate();
                this.setVehicleDetails(el, template, time);
                return template;
            });
            this.vehicles = vehicles;
        },
        parseToDate(date: string) {
            let s = date.split("-");
            let dateString = s[2] + '-' + s[1] + '-' + s[0];
            return new Date(dateString).getTime();
        },
        createVehicleTemplate(): VehiclesDetailsInTime {
            return {
                name: undefined,
                battleRating: [],
                cost: [],
                modifications: [],
                modificationsCost: [],
                nation: undefined,
                premium: false,
                squadron: false,
                rank: [],
                repairCost: {
                    arcade: [],
                    realistic: [],
                    simulation: []
                },
                thumbnail: undefined,
                type: []
            }
        },
        setVehicleDetails(rawData: VehiclesDetails, vehicleData: VehiclesDetailsInTime, time: number) {
            vehicleData.name = rawData.name;
            vehicleData.nation = rawData.nation;
            vehicleData.premium = rawData.premium;
            vehicleData.squadron = rawData.squadron;
            vehicleData.thumbnail = rawData.thumbnail;
            vehicleData.battleRating.push({ time: time, value: rawData.battleRating });
            vehicleData.rank.push({ time: time, value: rawData.rank });
            vehicleData.type.push({ time: time, value: rawData.type });
            vehicleData.cost.push({ time: time, value: rawData.cost });
            vehicleData.modificationsCost.push({ time: time, value: rawData.modificationsCost });
            vehicleData.repairCost.arcade.push({ time: time, value: rawData.repairCost.arcade });
            vehicleData.repairCost.realistic.push({ time: time, value: rawData.repairCost.realistic });
            vehicleData.repairCost.simulation.push({ time: time, value: rawData.repairCost.simulation });
            vehicleData.modifications.push({ time: time, value: rawData.modifications });
        }
    }
});