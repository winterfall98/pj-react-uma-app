
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
    const res = await fetch(`${import.meta.env.BASE_URL}cardSimulator/cardStatData/${code}.json`);
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
        throw new Error(`유효하지 않은 응답: ${code}.json`);
    }

    const data = await res.json();
    if(!data || Object.keys(data).length === 0) {
        throw new Error(`empty data for code: ${code}`);
    }

    return data;
}