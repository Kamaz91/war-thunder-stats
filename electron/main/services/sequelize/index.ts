import { Sequelize } from "@sequelize/core";

import { BattleReport, Assist, Award, BattleActivity, Capture, CriticalDamage, Damage, DamageBases, DamageScouted, DestructionAir, DestructionBases, DestructionGroundAndFleets, DestructionScouted, Landing, RepairedVehicle, ResearchedModification, ResearchedVehicle, Scouting, SevereDamage, Takeoff, TimePlayed } from "./models";

import { SqliteDialect } from '@sequelize/sqlite3';

class Database {
    public Sequelize!: Sequelize;
    public BattleReports!: typeof BattleReport;

    init(databasePath: string) {
        this.Sequelize = new Sequelize({
            dialect: SqliteDialect,
            storage: databasePath + '/databaseSeq.sqlite',
            models: [
                BattleReport,
                Assist,
                Award,
                BattleActivity,
                Capture,
                CriticalDamage,
                Damage,
                DamageBases,
                DamageScouted,
                DestructionAir,
                DestructionBases,
                DestructionGroundAndFleets,
                DestructionScouted,
                Landing,
                RepairedVehicle,
                ResearchedModification,
                ResearchedVehicle,
                Scouting,
                SevereDamage,
                Takeoff,
                TimePlayed
            ]
        });

    }
    async connect() {
        await this.Sequelize.authenticate()
            .then(() => console.log('Connection has been established successfully.'))
            .catch(error => console.error('Unable to connect to the database:', error));
        await this.Sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
    }
}

export default new Database();