import { DataTypes, CreationOptional, InferAttributes, Model, InferCreationAttributes, HasManyCreateAssociationMixin, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, NonAttribute, ForeignKey } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasMany } from '@sequelize/core/decorators-legacy';

export class BattleReport extends Model<InferAttributes<BattleReport>, InferCreationAttributes<BattleReport>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare report_id: CreationOptional<number>;
    @NotNull
    @Attribute(DataTypes.STRING)
    declare session_id: string;
    declare result: string;
    declare map: string;
    declare mode: string;
    declare nation: string;
    declare activity: number;
    declare vehicles_repair: number;
    declare ammo_crew_replenishment: number;
    declare other_awards_credits_base: number;
    declare reward_for_winning: number;
    declare reward_for_mission: number;
    declare friendly_kills: number;
    declare skill_bonus: number;
    declare other_awards_credits_boosters: number;
    declare other_awards_research_base: number;
    declare other_awards_research_boosters: number;
    declare date: CreationOptional<Date>;

    @HasMany(() => Assist, /* foreign key */ 'report_id')
    declare assists?: NonAttribute<Assist[]>;
    @HasMany(() => Award, /* foreign key */ 'report_id')
    declare awards?: NonAttribute<Award[]>;
    @HasMany(() => BattleActivity, /* foreign key */ 'report_id')
    declare battleActivity?: NonAttribute<BattleActivity[]>;
    @HasMany(() => Capture, /* foreign key */ 'report_id')
    declare captures?: NonAttribute<Capture[]>;
    @HasMany(() => CriticalDamage, /* foreign key */ 'report_id')
    declare criticalDamage?: NonAttribute<CriticalDamage[]>;
    @HasMany(() => Damage, /* foreign key */ 'report_id')
    declare damage?: NonAttribute<Damage[]>;
    @HasMany(() => DamageBases, /* foreign key */ 'report_id')
    declare damageBases?: NonAttribute<DamageBases[]>;
    @HasMany(() => DamageScouted, /* foreign key */ 'report_id')
    declare damageScouted?: NonAttribute<DamageScouted[]>;
    @HasMany(() => DestructionAir, /* foreign key */ 'report_id')
    declare airKills?: NonAttribute<DestructionAir[]>;
    @HasMany(() => DestructionBases, /* foreign key */ 'report_id')
    declare destroyedBases?: NonAttribute<DestructionBases[]>;
    @HasMany(() => DestructionGroundAndFleets, /* foreign key */ 'report_id')
    declare groundFleetKills?: NonAttribute<DestructionGroundAndFleets[]>;
    @HasMany(() => DestructionScouted, /* foreign key */ 'report_id')
    declare destructionScouted?: NonAttribute<DestructionScouted[]>;
    @HasMany(() => Landing, /* foreign key */ 'report_id')
    declare landings?: NonAttribute<Landing[]>;
    @HasMany(() => Takeoff, /* foreign key */ 'report_id')
    declare takeoffs?: NonAttribute<Takeoff[]>;
    @HasMany(() => RepairedVehicle, /* foreign key */ 'report_id')
    declare repairedVehicles?: NonAttribute<RepairedVehicle[]>;
    @HasMany(() => ResearchedModification, /* foreign key */ 'report_id')
    declare researchedModifications?: NonAttribute<ResearchedModification[]>;
    @HasMany(() => ResearchedVehicle, /* foreign key */ 'report_id')
    declare researchedVehicles?: NonAttribute<ResearchedVehicle[]>;
    @HasMany(() => Scouting, /* foreign key */ 'report_id')
    declare scoutings?: NonAttribute<Scouting[]>;
    @HasMany(() => SevereDamage, /* foreign key */ 'report_id')
    declare severeDamage?: NonAttribute<SevereDamage[]>;
    @HasMany(() => TimePlayed, /* foreign key */ 'report_id')
    declare timeplayed?: NonAttribute<TimePlayed[]>;

    declare createAssist: HasManyCreateAssociationMixin<Assist>;
    declare getAssists: HasManyGetAssociationsMixin<Assist>; // Note the null assertions!
    declare addAssist: HasManyAddAssociationMixin<Assist, number>;
    declare addAssists: HasManyAddAssociationsMixin<Assist, number>;
    declare setAssists: HasManySetAssociationsMixin<Assist, number>;

    declare createAward: HasManyCreateAssociationMixin<Award>;
    declare getAwards: HasManyGetAssociationsMixin<Award>; // Note the null assertions!
    declare addAward: HasManyAddAssociationMixin<Award, number>;
    declare addAwards: HasManyAddAssociationsMixin<Award, number>;
    declare setAwards: HasManySetAssociationsMixin<Award, number>;

    declare createBattleActivity: HasManyCreateAssociationMixin<BattleActivity>;
    declare createCapture: HasManyCreateAssociationMixin<Capture>;
    declare createCriticalDamage: HasManyCreateAssociationMixin<CriticalDamage>;
    declare createDamage: HasManyCreateAssociationMixin<Damage>;
    declare createDamageBases: HasManyCreateAssociationMixin<DamageBases>;
    declare createDamageScouted: HasManyCreateAssociationMixin<DamageScouted>;
    declare createDestructionAir: HasManyCreateAssociationMixin<DestructionAir>;
    declare createDestructionBases: HasManyCreateAssociationMixin<DestructionBases>;
    declare createDestructionGroundAndFleets: HasManyCreateAssociationMixin<DestructionGroundAndFleets>;
    declare createDestructionScouted: HasManyCreateAssociationMixin<DestructionScouted>;
    declare createLanding: HasManyCreateAssociationMixin<Landing>;
    declare createTakeoff: HasManyCreateAssociationMixin<Takeoff>;
    declare createRepairedVehicle: HasManyCreateAssociationMixin<RepairedVehicle>;
    declare createResearchedModification: HasManyCreateAssociationMixin<ResearchedModification>;
    declare createResearchedVehicle: HasManyCreateAssociationMixin<ResearchedVehicle>;
    declare createScouting: HasManyCreateAssociationMixin<Scouting>;
    declare createSevereDamage: HasManyCreateAssociationMixin<SevereDamage>;
    declare createTimePlayed: HasManyCreateAssociationMixin<TimePlayed>;
}

class Base extends Model<InferAttributes<Base>, InferCreationAttributes<Base>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    report_id: ForeignKey<number>;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

class Researchable extends Model<InferAttributes<Base>, InferCreationAttributes<Base>> {
    @Attribute(DataTypes.INTEGER)
    declare research_base: number;
    @Attribute(DataTypes.INTEGER)
    declare research_boost: number;
}

class Earnable extends Model<InferAttributes<Base>, InferCreationAttributes<Base>> {
    @Attribute(DataTypes.INTEGER)
    declare credits_base: number;
    @Attribute(DataTypes.INTEGER)
    declare credits_boost: number;
}

class EarnableAndResearchable extends Base {
    @Attribute(DataTypes.INTEGER)
    research_base: number;
    @Attribute(DataTypes.INTEGER)
    research_boost: number;
    @Attribute(DataTypes.INTEGER)
    credits_base: number;
    @Attribute(DataTypes.INTEGER)
    credits_boost: number;
}

class AssistanceDamageDestructScout extends Model<InferAttributes<EarnableAndResearchable>, InferCreationAttributes<EarnableAndResearchable>> {
    @Attribute(DataTypes.STRING)
    declare vehicle: string;
    @Attribute(DataTypes.STRING)
    declare target: string;
    @Attribute(DataTypes.INTEGER)
    declare time: number;
}

class Scout extends Model<InferAttributes<Earnable>, InferCreationAttributes<Earnable>> {
    @Attribute(DataTypes.STRING)
    declare vehicle: string;
    @Attribute(DataTypes.STRING)
    declare target: string;
    @Attribute(DataTypes.INTEGER)
    declare time: number;
}

class LandingsAndTakeoffs extends Model<InferAttributes<Researchable>, InferCreationAttributes<Researchable>> {
    @Attribute(DataTypes.STRING)
    declare vehicle: string;
    @Attribute(DataTypes.INTEGER)
    declare time: number;
}

export class Assist extends Model<InferAttributes<AssistanceDamageDestructScout>, InferCreationAttributes<AssistanceDamageDestructScout>> {
    @Attribute(DataTypes.STRING)
    declare vehicle: string;
    @Attribute(DataTypes.STRING)
    declare target: string;
    @Attribute(DataTypes.INTEGER)
    declare time: number;
}

export class Award extends Model<InferAttributes<EarnableAndResearchable>, InferCreationAttributes<EarnableAndResearchable>> {
    @Attribute(DataTypes.STRING)
    declare award: string;
    @Attribute(DataTypes.INTEGER)
    declare time: number;
}

export class BattleActivity extends Model<InferAttributes<EarnableAndResearchable>, InferCreationAttributes<EarnableAndResearchable>> {
    @Attribute(DataTypes.STRING)
    declare vehicle: string;
}

export class Capture extends Model<InferAttributes<Capture>, InferCreationAttributes<Capture>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare report_id: ForeignKey<number>;
    declare vehicle: string;
    declare percent: number;
    declare research_base: number;
    declare research_boost: number;
    declare credits_base: number;
    declare credits_boost: number;
    declare time: number;
}

export class CriticalDamage extends Model<InferAttributes<AssistanceDamageDestructScout>, InferCreationAttributes<AssistanceDamageDestructScout>> { }

export class Damage extends Model<InferAttributes<AssistanceDamageDestructScout>, InferCreationAttributes<AssistanceDamageDestructScout>> { }

export class DamageBases extends Model<InferAttributes<DamageBases>, InferCreationAttributes<DamageBases>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare report_id: ForeignKey<number>;
    declare vehicle: string;
    declare tnt: number;
    declare damage: number;
    declare research_base: number;
    declare research_boost: number;
    declare credits_base: number;
    declare credits_boost: number;
    declare time: number;
}

export class DamageScouted extends Model<InferAttributes<Scout>, InferCreationAttributes<Scout>> { }

export class DestructionAir extends Model<InferAttributes<DestructionAir>, InferCreationAttributes<DestructionAir>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare report_id: ForeignKey<number>;
    declare vehicle: string;
    declare target: string;
    declare finishing_off: string;
    declare research_base: number;
    declare research_boost: number;
    declare credits_base: number;
    declare credits_boost: number;
    declare time: number;
}

export class DestructionBases extends Model<InferAttributes<DestructionBases>, InferCreationAttributes<DestructionBases>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare report_id: ForeignKey<number>;
    declare vehicle: string;
    declare tnt: number;
    declare research_base: number;
    declare research_boost: number;
    declare credits_base: number;
    declare credits_boost: number;
    declare time: number;
}

export class DestructionGroundAndFleets extends Model<InferAttributes<AssistanceDamageDestructScout>, InferCreationAttributes<AssistanceDamageDestructScout>> { }

export class DestructionScouted extends Model<InferAttributes<AssistanceDamageDestructScout>, InferCreationAttributes<AssistanceDamageDestructScout>> { }

export class Landing extends Model<InferAttributes<LandingsAndTakeoffs>, InferCreationAttributes<LandingsAndTakeoffs>> { }

export class RepairedVehicle extends Model<InferAttributes<RepairedVehicle>, InferCreationAttributes<RepairedVehicle>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare report_id: ForeignKey<number>;
    declare vehicle: string;
}

export class ResearchedModification extends Model<InferAttributes<ResearchedModification>, InferCreationAttributes<ResearchedModification>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare report_id: ForeignKey<number>;
    declare vehicle: string;
    declare modification: string;
    declare research: number;
}

export class ResearchedVehicle extends Model<InferAttributes<ResearchedVehicle>, InferCreationAttributes<ResearchedVehicle>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare report_id: ForeignKey<number>;
    declare vehicle: string;
    declare research: number;
}

export class Scouting extends Model<InferAttributes<Scout>, InferCreationAttributes<Scout>> { }

export class SevereDamage extends Model<InferAttributes<AssistanceDamageDestructScout>, InferCreationAttributes<AssistanceDamageDestructScout>> { }

export class Takeoff extends Model<InferAttributes<LandingsAndTakeoffs>, InferCreationAttributes<LandingsAndTakeoffs>> { }

export class TimePlayed extends Model<InferAttributes<TimePlayed>, InferCreationAttributes<TimePlayed>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare report_id: ForeignKey<number>;
    declare vehicle: string;
    declare percent: number;
    declare time: number;
    declare research_base: number;
    declare research_boost: number;
}