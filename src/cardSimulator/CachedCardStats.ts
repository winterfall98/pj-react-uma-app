
import type {
    CardStatData
} from './CardSimulator.type';

// type CardStatsData = Record<string, any[]>;

const cache: Record<number, CardStatData> = {};

export function getAllCachedData() {
    return cache;
}

export function getCache(code: number) {
    return cache[code];
}

export function setCache(code: number, data: CardStatData) {
    cache[code] = data;
}

export async function fetchCardStats(code: number) {
    const res = await fetch(`/cardSimulator/cardStatData/${code}.json`);
    const data = await res.json();

    return data;
}