import { Activity, Awards, BasicInfo, BattleReport, Bombing, Capture, DestructionAir, Earned, ExtractedData, HitsAndDestroys, Scouting, TakeoffsLandings, TimePlayed } from '../types/report';
type SectionName =
    "activity" |
    "assistance" |
    "awards" |
    "capture" |
    "criticalDamage" |
    "severeDamage" |
    "destructionAir" |
    "destructionGroundAndFleets" |
    "damage" |
    "scouting" |
    "damageToScouted" |
    "destructionOfScouted" |
    "timePlayed" |
    "landings" |
    "takeoffs" |
    "destructionBases" |
    "damageBases";

interface Section {
    name: string;
    data: string;
}

function extractBaseAndBoosters(inputString: string): Earned {
    const match = inputString.match(/\d+/); // Match the first number in the input string
    let boosters = 0;
    let base = 0;

    if (!match || match.index == undefined) {
        return { base, boosters };
    }

    base = parseInt(match[0]);
    let boostersMatch = inputString.substring(match.index + match[0].length).match(/\d+/g);

    if (boostersMatch) {
        boostersMatch.pop();
        boosters = boostersMatch.reduce((acc, val) => acc + parseInt(val), 0);
    }
    return { base, boosters };
}

function extractSections(inputText: string): Section[] {
    // Define a regular expression to match section headers
    const sectionHeaderRegex = /^([^ \t\n\r\v\f]+[^\n]*)/gm;

    // Split the input text into sections
    const sections = inputText.split(sectionHeaderRegex);

    // Initialize variables to store section information
    let currentSectionName = '';
    let currentSectionData = '';

    // Define an array to store grouped sections
    const groupedSections = [];

    // Iterate through the sections and group them by name
    for (const section of sections) {
        // Check if the section is a header (name)
        if (section.match(sectionHeaderRegex)) {
            // If we have previous data, push it into the array
            if (currentSectionName && currentSectionData) {
                groupedSections.push({ name: currentSectionName.trim(), data: currentSectionData });
            }

            // Set the current section name
            currentSectionName = section;
            currentSectionData = '';
        } else {
            // Append the data to the current section
            currentSectionData += section + '\n';
        }
    }

    // Push the last section into the array
    if (currentSectionName && currentSectionData) {
        groupedSections.push({ name: currentSectionName.trim(), data: currentSectionData.trim() });
    }
    return groupedSections;
}

function extractHits(inputText: string): HitsAndDestroys[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: HitsAndDestroys[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');
        const time = parseTime(splited[0]);
        const vehicle = splited[1];
        const target = splited[2];
        const credits = extractBaseAndBoosters(splited[3]);
        const research = extractBaseAndBoosters(splited.length < 5 ? '0' : splited[4]);

        result.push({ time, vehicle, target, credits, research });
    }
    return result;
}

function extractAirKills(inputText: string): DestructionAir[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: DestructionAir[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');
        const time = parseTime(splited[0]);
        const vehicle = splited[1];
        const target = splited[2];
        const finishingOff = splited[3];
        const credits = extractBaseAndBoosters(splited.length <= 4 ? '0' : splited[4]);
        const research = extractBaseAndBoosters(splited.length <= 5 ? '0' : splited[5]);

        result.push({ time, vehicle, target, finishingOff, credits, research });
    }
    return result;
}

function extractScoutDamage(inputText: string): Scouting[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: Scouting[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');
        const time = parseTime(splited[0]);
        const vehicle = splited[1];
        const target = splited[2];
        const credits = extractBaseAndBoosters(splited[3]);

        result.push({ time, vehicle, target, credits });
    }
    return result;
}

function extractCapture(inputText: string): Capture[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: Capture[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');
        const time = parseTime(splited[0]);
        const vehicle = splited[1];
        const percent = parseInt(splited.length <= 4 ? "0" : splited[2]);
        const credits = extractBaseAndBoosters(splited.length <= 4 ? splited[2] : splited[3]);
        const research = extractBaseAndBoosters(splited.length <= 4 ? splited[3] : splited[4]);

        result.push({ time, vehicle, percent, credits, research });
    }
    return result;
}

function extractActivity(inputText: string): Activity[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: Activity[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');
        // Check the row length
        // The update of 15.05.2024 changes the activity of the report by removing the time
        let index = splited.length < 4 ? 0 : 1;
        const vehicle = splited[index];
        const credits = extractBaseAndBoosters(splited[++index]);
        const research = extractBaseAndBoosters(splited[++index]);

        result.push({ vehicle, credits, research });
    }
    return result;
}

function extractTimePlayed(inputText: string): TimePlayed[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: TimePlayed[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');

        const vehicle = splited[0];
        const percent = parseInt(splited[1]);
        const time = parseTime(splited[2]);
        const research = extractBaseAndBoosters(splited[3]);

        result.push({ time, vehicle, percent, research });
    }
    return result;
}

function extractLandingTakeoff(inputText: string): TakeoffsLandings[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: TakeoffsLandings[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');

        const time = parseTime(splited[0]);
        const vehicle = splited[1];
        const research = extractBaseAndBoosters(splited[2]);

        result.push({ time, vehicle, research });
    }
    return result;
}

function extractBombingBases(inputText: string): Bombing[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: Bombing[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');
        if (splited.length < 6) {
            var i = -1;
        } else {
            var i = 0;
        }

        const time = parseTime(splited[0]);
        const vehicle = splited[1];
        const TNT = parseInt(splited.length < 6 ? '0' : splited[2]);
        const damage = parseInt(splited[3 + i]);
        const credits = extractBaseAndBoosters(splited[4 + i]);
        const research = extractBaseAndBoosters(splited[5 + i]);

        result.push({ time, vehicle, TNT, damage, credits, research });
    }
    return result;
}

function extractAwards(inputText: string): Awards[] {
    // Define a regular expression to split text based on multiple spaces and line breaks
    const regex = /(\s{2,})/;

    // Use the regular expression to split the text into an array of lines
    const lines = inputText.replaceAll("\r\n", "\n").trim().split("\n");

    // Initialize an array to store the result
    const result: Awards[] = [];

    // Iterate over the lines and group them into objects with 5 elements each
    for (let line of lines) {
        let splited = line.trim().split(regex).filter((item) => item.trim() != '');
        const time = parseTime(splited[0]);
        const award = splited[1];
        const credits = extractBaseAndBoosters(splited[2]);
        const research = extractBaseAndBoosters(splited.length < 4 ? '0' : splited[3]);

        result.push({ time, award, credits, research });
    }
    return result;
}

function extractBasicInfo(inputText: string, date: number): ExtractedData {
    // Regular expressions for extracting data
    const sessionIDRegex = /Session:\s+(\S+)/;
    const activityRegex = /Activity:\s+(\d+)%/;
    const friendlyKillsRegex = /Friendly kills:\s+(-?\d+) SL/;
    const skillBonusRegex = /Skill Bonus\s+(-?\d+) RP/;
    const vehiclesRepairRegex = /Automatic repair of all vehicles:\s+(-?\d+) SL/;
    const ammoCrewReplenishmentRegex = /Automatic purchasing of ammo and "Crew Replenishment":\s+(-?\d+) SL/;
    const damagedVehiclesRegex = /Damaged Vehicles: (.*$)/m;
    const otherAwardsRegex = /Other awards\s+(.*)\n/;
    const RewardForWinningRegex = /Reward for winning\s+(.*)\n/;
    const RewardForparticipateRegex = /Reward for participating in the mission\s+(.*)\n/;
    const battleResultRegex = /(Victory|Defeat)\s.*?\[(.*?)\]\s(.*?)\smission!/;

    // Extracted data
    const extractedData: BasicInfo = {
        researchedModifications: [],
        researchedVehicles: [],
        SessionID: "",
        Activity: 0,
        friendlyKills: 0,
        skillBonus: 0,
        vehiclesRepair: 0,
        ammoCrewReplenishment: 0,
        damagedVehicles: [],
        otherAwards: {
            credits: {
                base: 0,
                boosters: 0
            },
            research: {
                base: 0,
                boosters: 0
            },
        },
        RewardForWinning: 0,
        RewardForMission: 0,
        nation: "",
        date: date,
        Battle: {
            result: "",
            mode: "",
            map: ""
        }
    };

    if (inputText.includes("Researching progress")) {
        extractedData['researchedModifications'] = extractResearchingProgress(inputText);
    }
    if (inputText.includes("Researched unit")) {
        extractedData['researchedVehicles'] = extractResearchedUnits(inputText);
    }
    const sessionIDMatch = inputText.match(sessionIDRegex);
    if (sessionIDMatch) {
        extractedData["SessionID"] = sessionIDMatch[0].split(":")[1].trim();
    }

    const activityMatch = inputText.match(activityRegex);
    if (activityMatch) {
        extractedData["Activity"] = parseInt(activityMatch[1]);
    }

    const friendlyKillsMatch = inputText.match(friendlyKillsRegex);
    if (friendlyKillsMatch) {
        extractedData["friendlyKills"] = Math.abs(parseInt(friendlyKillsMatch[1]));
    }

    const skillBonusMatch = inputText.match(skillBonusRegex);
    if (skillBonusMatch) {
        extractedData["skillBonus"] = Math.abs(parseInt(skillBonusMatch[1]));
    }

    const vehiclesRepairMatch = inputText.match(vehiclesRepairRegex);
    if (vehiclesRepairMatch) {
        extractedData["vehiclesRepair"] = Math.abs(parseInt(vehiclesRepairMatch[1]));
    }

    const ammoCrewReplenishmentMatch = inputText.match(ammoCrewReplenishmentRegex);
    if (ammoCrewReplenishmentMatch) {
        extractedData["ammoCrewReplenishment"] = Math.abs(parseInt(ammoCrewReplenishmentMatch[1]));
    }

    const damagedVehiclesMatch = inputText.match(damagedVehiclesRegex);
    if (damagedVehiclesMatch) {
        extractedData["damagedVehicles"] = damagedVehiclesMatch[1].split(',').map(vehicle => vehicle.trim());
    }

    const otherAwardsMatch = inputText.match(otherAwardsRegex);
    if (otherAwardsMatch) {
        const regex = /(\s{2,})/;
        let splited = otherAwardsMatch[1].trim().split(regex).filter((item) => item.trim() != '');

        extractedData["otherAwards"].credits = extractBaseAndBoosters(splited[0].trim());
        if (splited.length > 1) {
            extractedData["otherAwards"].research = extractBaseAndBoosters(splited[1].trim());
        }
    }

    const battleResultMatch = inputText.match(battleResultRegex);
    if (battleResultMatch) {
        extractedData["Battle"] = {
            result: battleResultMatch[1],
            mode: battleResultMatch[2].replace('[', '').replace(']', ''),
            map: battleResultMatch[3]
        };
    }

    const RewardForWinningMatch = inputText.match(RewardForWinningRegex);
    if (RewardForWinningMatch) {
        extractedData["RewardForWinning"] = parseInt(RewardForWinningMatch[1].trim());
    }

    const RewardForparticipateMatch = inputText.match(RewardForparticipateRegex);
    if (RewardForparticipateMatch) {
        extractedData["RewardForMission"] = parseInt(RewardForparticipateMatch[1].trim());
    }

    // Remove the specified lines from the input text and all text after "Damaged Vehicles" line
    const cleanedInputText = inputText
        .replace(sessionIDRegex, '')
        .replace(activityRegex, '')
        .replace(vehiclesRepairRegex, '')
        .replace(ammoCrewReplenishmentRegex, '')
        .replace(otherAwardsRegex, '')
        .replace(battleResultRegex, '')
        .replace(RewardForWinningRegex, '')
        .replace(RewardForparticipateRegex, '')
        .replace(/Earned:.*?\n/g, '')
        .replace(/Damaged Vehicles:[\s\S]*/, ''); // This removes all text after "Damaged Vehicles" line

    return { data: extractedData, text: cleanedInputText }
}

function parseTime(inputString: string): number {
    let split = inputString.split(':');
    return parseInt(split[0]) * 60 + parseInt(split[1]);
}

function processSection(section: Section): { processed: Activity[] | Awards[] | HitsAndDestroys[] | Capture[] | Scouting[] | TimePlayed[] | TakeoffsLandings[] | Bombing[], key: SectionName } | undefined {
    const Parsers: { name: string, parse: (inputString: string) => Activity[] | Awards[] | HitsAndDestroys[] | Capture[] | Scouting[] | TimePlayed[] | TakeoffsLandings[] | Bombing[], key: SectionName }[] = [
        { name: "Activity Time", key: "activity", parse: extractActivity },
        { name: "Assistance in destroying the enemy", key: "assistance", parse: extractHits },
        { name: "Awards", key: "awards", parse: extractAwards },
        { name: "Capture of zones", key: "capture", parse: extractCapture },
        { name: "Critical damage to the enemy", key: "criticalDamage", parse: extractHits },
        { name: "Severe damage to the enemy", key: "severeDamage", parse: extractHits },
        { name: "Destruction of aircraft", key: "destructionAir", parse: extractAirKills },
        { name: "Destruction of ground vehicles and fleets", key: "destructionGroundAndFleets", parse: extractHits },
        { name: "Damage to the enemy", key: "damage", parse: extractHits },
        { name: "Scouting of the enemy", key: "scouting", parse: extractScoutDamage },
        { name: "Damage taken by scouted enemies", key: "damageToScouted", parse: extractScoutDamage },
        { name: "Destruction by allies of scouted enemies", key: "destructionOfScouted", parse: (inputString: string) => extractHits(inputString.replaceAll('×', '')) },
        { name: "Time Played", key: "timePlayed", parse: extractTimePlayed },
        { name: "Landings", key: "landings", parse: extractLandingTakeoff },
        { name: "Takeoffs", key: "takeoffs", parse: extractLandingTakeoff },
        { name: "Destruction of bases", key: "destructionBases", parse: extractBombingBases },
        { name: "Damage to bases", key: "damageBases", parse: extractBombingBases },
    ];

    for (const parser of Parsers) {
        try {
            if (section.name.includes(parser.name)) {
                let processed = parser.parse(section.data);
                return { processed, key: parser.key };
            }
        } catch (error) {
            throw { key: parser.key, error };
        }
    }
}

export function parseReport(inputText: string, date: number): BattleReport | null {
    var processed: any = {
        basicInfo: {},
        activity: [],
        assistance: [],
        awards: [],
        capture: [],
        criticalDamage: [],
        severeDamage: [],
        destructionAir: [],
        destructionGroundAndFleets: [],
        damage: [],
        scouting: [],
        damageToScouted: [],
        destructionOfScouted: [],
        timePlayed: [],
        landings: [],
        takeoffs: [],
        destructionBases: [],
        damageBases: []
    }

    // replaceAll("\r\n", "\n") for compatibility with report from notepads and game
    try {
        let extracted = extractBasicInfo(inputText.replaceAll("\r\n", "\n"), date);
        processed.basicInfo = extracted.data;
        if (extracted.text.length > 0) {
            let sections = extractSections(extracted.text);
            for (const section of sections) {
                let result = processSection(section);
                if (result?.key) {
                    processed[result.key] = result?.processed;
                }
            }
        } else {
            console.log("-------No Sections-------");
        }
        return processed;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function extractReportSummary(report: BattleReport) {
    const basic = report.basicInfo;
    var killsAir = 0, killsGroundNavy = 0;
    var win = false, credits = 0, research = 0, deaths = 0, spawns = 0;

    for (const entry of Object.values(report)) {
        if (!Array.isArray(entry) && entry !== null) {
            continue;
        }
        if (entry.length == 0) {
            continue;
        }
        if ('credits' in entry[0]) {
            for (const el of entry) {
                credits += el.credits.base + el.credits.boosters;
            }
        }
        if ('research' in entry[0]) {
            for (const el of entry) {
                research += el.research.base + el.research.boosters;
            }
        }
    }

    killsAir = report.destructionAir.filter((el) => !el.target.includes("(AI)")).length;
    killsGroundNavy = report.destructionGroundAndFleets.filter((el) => !el.target.includes("(AI)")).length;

    deaths = basic.damagedVehicles.length;
    spawns = report.timePlayed.length;

    if (basic.Battle.result == "Victory") {
        win = true;
    }

    research += basic.skillBonus;

    credits += basic.RewardForMission + basic.RewardForWinning + basic.otherAwards.credits.base + basic.otherAwards.credits.boosters;
    credits -= basic.vehiclesRepair + basic.ammoCrewReplenishment + basic.friendlyKills;

    return { win, credits, research, killsAir, killsGroundNavy, deaths, spawns };
}

function extractResearchingProgress(inputText: string): { vehicle: string; modification: string; research: number; }[] {
    const startIndex = inputText.indexOf("Researching progress: ");
    const result = inputText.substring(startIndex);
    //const endIndex = substring.indexOf("\n\n");
    //const result = substring.substring(startIndex, endIndex);
    const researchData: { vehicle: string, modification: string, research: number }[] = [];

    const regex = /(.+?)\s-\s(.+?):\s(\d+)\sRP/g;
    let match;

    while ((match = regex.exec(result)) !== null) {
        researchData.push({
            vehicle: match[1].trim(),
            modification: match[2].trim(),
            research: parseInt(match[3])
        });
    }
    return researchData;
}

function extractResearchedUnits(inputText: string): { vehicle: string; research: number; }[] {
    const startIndex = inputText.indexOf("Researched unit: ");
    const substring = inputText.trim().replaceAll("\r\n", "\n").substring(startIndex);
    let endIndex = substring.indexOf("\n\n");
    const result = substring.substring(endIndex, -1);

    const lines = result.split("\n");
    // Remove first item with "Researched unit" string
    lines.splice(0, 1)

    const vehicleAndResearch = lines.map((unit) => {
        const [vehicle, research] = unit.split(":");
        return {
            vehicle: vehicle.trim(),
            research: parseInt(research)
        };
    });

    return vehicleAndResearch;
};