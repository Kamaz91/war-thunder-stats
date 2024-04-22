import { VehiclesDetails, VehicleBattleRating, VehicleCost, VehicleModification, VehicleModificationsCost, VehicleRepairCost, VehicleRepairModeCost } from "../types/datasets";

export function parse() {


}

function validateDateString(dateString: string): boolean {
    const pattern = /^\d{2}-\d{2}-\d{4}\.json$/;
    return pattern.test(dateString);
}

// Example usage:
const dateStr: string = "15-12-2023.json";

if (validateDateString(dateStr)) {
    console.log(`${dateStr} is a valid date string.`);
} else {
    console.log(`${dateStr} is not a valid date string.`);
}

function isVehiclesDetails(data: unknown): data is VehiclesDetails {
    if (!data || typeof data !== 'object') {
        return false;
    }

    if (!("name" in data) ||
        !("nation" in data) ||
        !("premium" in data) ||
        !("squadron" in data) ||
        !("rank" in data) ||
        !("type" in data) ||
        !("thumbnail" in data) ||
        !("battleRating" in data) ||
        !("cost" in data) ||
        !("repairCost" in data) ||
        !("modificationsCost" in data) ||
        !("modifications" in data)
    ) {
        return false;
    }

    if (typeof data.name !== 'string' ||
        typeof data.nation !== 'string' ||
        !['usa', 'germany', 'ussr', 'britain', 'japan', 'china', 'italy', 'france', 'sweden', 'israel'].includes(data.nation) ||
        typeof data.premium !== 'boolean' ||
        typeof data.squadron !== 'boolean' ||
        (typeof data.rank !== 'number' && typeof data.rank !== 'undefined') ||
        typeof data.type !== 'string' ||
        !['light_tank', 'medium_tank', 'heavy_tank', 'spaa', 'tank_destroyer', 'fighter', 'strike_aircraft', 'bomber', 'attack_helicopter', 'utility_helicopter', 'boat', 'barge', 'frigate', 'destroyer', 'light_cruiser', 'heavy_cruiser', 'battleship'].includes(data.type) ||
        typeof data.thumbnail !== 'string' ||
        !isVehicleBattleRating(data.battleRating) ||
        !isVehicleCost(data.cost) ||
        !isVehicleRepairCost(data.repairCost) ||
        !isVehicleModificationsCost(data.modificationsCost) ||
        !Array.isArray(data.modifications) ||
        !data.modifications.every(isVehicleModification)
    ) {
        return false;
    }

    return true;
}

function isVehicleBattleRating(data: unknown): data is VehicleBattleRating {
    if (!data || typeof data !== 'object') {
        return false;
    }
    if (!("arcade" in data) ||
        !("realistic" in data) ||
        !("simulation" in data)) {
        return false;
    }
    return (
        data &&
        typeof data.arcade === 'number' &&
        typeof data.realistic === 'number' &&
        typeof data.simulation === 'number'
    );
}

function isVehicleCost(data: unknown): data is VehicleCost {
    if (!data || typeof data !== 'object') {
        return false;
    }
    if (!("reaserch" in data) ||
        !("currency" in data)) {
        return false;
    }
    return (
        data &&
        typeof data.reaserch === 'number' &&
        typeof data.currency === 'number'
    );
}

function isVehicleRepairModeCost(data: unknown): data is VehicleRepairModeCost {
    if (!data || typeof data !== 'object') {
        return false;
    }
    if (!("basic" in data) ||
        !("reference" in data)) {
        return false;
    }
    return (
        data &&
        typeof data.basic === 'number' &&
        typeof data.reference === 'number'
    );
}

function isVehicleRepairCost(data: unknown): data is VehicleRepairCost {
    if (!data || typeof data !== 'object') {
        return false;
    }
    if (!("arcade" in data) ||
        !("realistic" in data) ||
        !("simulation" in data)) {
        return false;
    }
    return (
        data &&
        isVehicleRepairModeCost(data.arcade) &&
        isVehicleRepairModeCost(data.realistic) &&
        isVehicleRepairModeCost(data.simulation)
    );
}

function isVehicleModificationsCost(data: unknown): data is VehicleModificationsCost {
    if (!data || typeof data !== 'object') {
        return false;
    }
    if (!("reaserch" in data) ||
        !("currency" in data)) {
        return false;
    }
    return (
        data &&
        typeof data.reaserch === 'number' &&
        typeof data.currency === 'number'
    );
}

function isVehicleModification(data: unknown): data is VehicleModification {
    if (!data || typeof data !== 'object') {
        return false;
    }
    if (!("name" in data) ||
        !("research" in data) ||
        !("cost" in data) ||
        !("ge" in data)) {
        return false;
    }
    return (
        data &&
        typeof data.name === 'string' &&
        typeof data.research === 'number' &&
        typeof data.cost === 'number' &&
        typeof data.ge === 'number'
    );
}

// Example usage
const vehicleDetails: VehiclesDetails = {
    name: "",
    nation: "usa",
    premium: false,
    squadron: false,
    rank: 0,
    type: "light_tank",
    thumbnail: "",
    battleRating: {
        arcade: 0,
        realistic: 0,
        simulation: 0
    },
    cost: {
        reaserch: 0,
        currency: 0
    },
    repairCost: {
        arcade: {
            basic: 0,
            reference: 0
        },
        realistic: {
            basic: 0,
            reference: 0
        },
        simulation: {
            basic: 0,
            reference: 0
        }
    },
    modificationsCost: {
        reaserch: 0,
        currency: 0
    },
    modifications: []
};

if (isVehiclesDetails(vehicleDetails)) {
    console.log('Validation passed!');
} else {
    console.error('Validation failed!');
}
