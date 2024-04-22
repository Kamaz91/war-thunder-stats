export type VehicleName = string;
export type VehicleNation = "usa" | "germany" | "ussr" | "britain" | "japan" | "china" | "italy" | "france" | "sweden" | "israel";
export type VehicleIsPremium = boolean;
export type VehicleIsSquadron = boolean;
export type VehicleRank = number | undefined;
export type VehicleType = "light_tank" | "medium_tank" | "heavy_tank" | "spaa" | "tank_destroyer" | "fighter" | "strike_aircraft" | "bomber" | "attack_helicopter" | "utility_helicopter" | "boat" | "barge" | "frigate" | "destroyer" | "light_cruiser" | "heavy_cruiser" | "battleship";
export type VehicleThumbnail = string;
export type VehicleBattleRating = {
    arcade: number;
    realistic: number;
    simulation: number;
};
export type VehicleCost = {
    reaserch: number;
    currency: number;
};
export type VehicleRepairModeCost = {
    basic: number;
    reference: number;
}
export type VehicleRepairCost = {
    arcade: VehicleRepairModeCost;
    realistic: VehicleRepairModeCost;
    simulation: VehicleRepairModeCost;
};
export type VehicleModificationsCost = {
    reaserch: number;
    currency: number;
};

export interface VehiclesDetails {
    name: VehicleName | undefined;
    nation: VehicleNation | undefined;
    premium: VehicleIsPremium;
    squadron: VehicleIsSquadron;
    rank: VehicleRank;
    type: VehicleType;
    thumbnail: VehicleThumbnail | undefined;
    battleRating: VehicleBattleRating;
    cost: VehicleCost;
    repairCost: VehicleRepairCost
    modificationsCost: VehicleModificationsCost;
    modifications: VehicleModification[];
}

export interface VehicleModification {
    name: string;
    research: number;
    cost: number;
    ge: number;
}

export interface VehicleModificationImage {
    name: string;
    image: string;
}

export interface VehiclesDetailsInTime {
    name: VehicleName | undefined;
    nation: VehicleNation | undefined;
    premium: VehicleIsPremium;
    squadron: VehicleIsSquadron;
    thumbnail: VehicleThumbnail | undefined;
    rank: Array<{
        time: number;
        value: VehicleRank;
    }>;
    type: Array<{
        time: number;
        value: VehicleType;
    }>;
    battleRating: Array<{
        time: number;
        value: VehicleBattleRating;
    }>;
    cost: Array<{
        time: number;
        value: VehicleCost;
    }>;
    repairCost: {
        arcade: Array<{
            time: number; value: VehicleRepairModeCost;
        }>;
        realistic: Array<{
            time: number; value: VehicleRepairModeCost;
        }>;
        simulation: Array<{
            time: number; value: VehicleRepairModeCost;
        }>;
    };
    modificationsCost: Array<{
        time: number;
        value: VehicleModificationsCost;
    }>;
    modifications: Array<{ time: number; value: VehicleModification[] }>;
}
/*
export interface VehiclesDetailsByTime extends VehiclesDetails {
    rank: Array<{
        time: number;
        value: VehicleRank;
    }>;
    type: Array<{
        time: number;
        value: VehicleType;
    }>;
    battleRating: Array<{
        time: number;
        value: VehicleBattleRating;
    }>;
    cost: Array<{
        time: number;
        value: VehicleCost;
    }>;
    repairCost: {
        arcade: Array<{
            time: number;
            value: VehicleRepairModeCost;
        }>;
        realistic: Array<{
            time: number;
            value: VehicleRepairModeCost;
        }>;
        simulation: Array<{
            time: number;
            value: VehicleRepairModeCost;
        }>;
    };
    modificationsCost: Array<{
        time: number;
        value: VehicleModificationsCost;
    }>;
    modifications: Array<{ time: number; value: VehicleModification[] }>;
}*/