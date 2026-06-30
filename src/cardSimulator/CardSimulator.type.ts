export type CardCode = number;

export type CardSlot = {
    code: CardCode;
    stats: CardStatData;
    limitBreak: number;
};

// card data (default data)
export type CardData = {
    title?: string;
    name?: string;
    search?: string;
    type?: string;
    image?: string | '';
};

// card data list
export type CardListMap = Record<number, CardData>;


export type BasicStat = {
    base: number;
    unique?: number | string;
};

export type BasicStatData = Record<string, BasicStat>;

export type ScenarioStat = {
    name: string;
    value: number;
};

export type ScenarioStatType = Record<string, ScenarioStat[]>;

export type ScenarioData = Record<string, ScenarioStatType>;

export type DataTypes = {
    basics: BasicStatData;
    scenarios: ScenarioData;
};

export type CardStatData = Record<string, DataTypes>;

export type CardStatsMap = CardStatData[];