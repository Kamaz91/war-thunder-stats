import type { VehicleBattleRating, VehicleCost, VehicleIsPremium, VehicleIsSquadron, VehicleModification, VehicleModificationsCost, VehicleName, VehicleNation, VehicleRank, VehicleRepairModeCost, VehicleThumbnail, VehicleType, VehiclesDetails, VehiclesDetailsInTime } from "../types/datasets"

const DEFAULT_VEHICLE_THUMBNAIL = "https://encyclopedia.warthunder.com/i/slots/us_m2a4.png";

class DatasetVehicleObject implements VehiclesDetailsInTime {
    name: VehicleName;
    nation: VehicleNation;
    premium: VehicleIsPremium;
    squadron: VehicleIsSquadron;
    thumbnail: string | undefined;
    rank: { time: number; value: VehicleRank; }[];
    type: { time: number; value: VehicleType; }[];
    battleRating: { time: number; value: VehicleBattleRating; }[];
    cost: { time: number; value: VehicleCost; }[];
    repairCost: { arcade: { time: number; value: VehicleRepairModeCost; }[]; realistic: { time: number; value: VehicleRepairModeCost; }[]; simulation: { time: number; value: VehicleRepairModeCost; }[]; };
    modificationsCost: { time: number; value: VehicleModificationsCost; }[];
    modifications: { time: number; value: VehicleModification[]; }[];

    constructor(input: VehiclesDetails, time: number) {
        this.addDataset(input, time);
    }

    addDataset(input: VehiclesDetails, time: number) {
        // If name exists in object add only time based data
        if (this.name.length > 0) {
            this.name = input.name || "";
            this.nation = input.nation || "usa";
            this.premium = input.premium;
            this.squadron = input.squadron;
            this.thumbnail = input.thumbnail == undefined ? DEFAULT_VEHICLE_THUMBNAIL : input.thumbnail;
        }
        this.battleRating.push({ time: time, value: input.battleRating });
        this.rank.push({ time: time, value: input.rank });
        this.type.push({ time: time, value: input.type });
        this.cost.push({ time: time, value: input.cost });
        this.modificationsCost.push({ time: time, value: input.modificationsCost });
        this.repairCost.arcade.push({ time: time, value: input.repairCost.arcade });
        this.repairCost.realistic.push({ time: time, value: input.repairCost.realistic });
        this.repairCost.simulation.push({ time: time, value: input.repairCost.simulation });
        this.modifications.push({ time: time, value: input.modifications });
    }

    getBRUpToDate(time: number) {
        return this.battleRating.filter(el => el.time >= time)[0].value;
    }
}