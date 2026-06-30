export const MOBILE_BREAK = 640;

export const SCARD_TYPE = [
  {
    type: "1",
    effectType: "3",
    typename: "스피드",
    class: "speed",
    effecttype: [1, 2, 3, 5, 8, 9, 30],
  },
  {
    type: "2",
    effectType: "4",
    typename: "스태미나",
    class: "stamina",
    effecttype: [1, 2, 4, 6, 8],
  },
  {
    type: "3",
    effectType: "5",
    typename: "파워",
    class: "power",
    effecttype: [1, 2, 4, 5, 8, 30],
  },
  {
    type: "4",
    effectType: "6",
    typename: "근성",
    class: "grit",
    effecttype: [1, 2, 3, 5, 6, 8, 30],
  },
  {
    type: "5",
    effectType: "4",
    typename: "지능",
    class: "inteli",
    effecttype: [1, 2, 3, 7, 8, 30, 31],
  },
  {
    type: "6",
    typename: "친구",
    class: "friend",
    effecttype: [8, 9],
  },
  {
    type: "7",
    typename: "그룹",
    class: "group",
    effecttype: [],
  },
] as const;


type EffectTypeItem = {
  type: string;
  name: string;
  format: string;
}

export const EFFECT_TYPE: Record<number, EffectTypeItem> = {
  1: { type: "1", name: "우정 보너스", format: "2" },
  2: { type: "2", name: "컨디션 효과 증가", format: "2" },
  3: { type: "3", name: "스피드 보너스", format: "1" },
  4: { type: "4", name: "스태미나 보너스", format: "1" },
  5: { type: "5", name: "파워 보너스", format: "1" },
  6: { type: "6", name: "근성 보너스", format: "1" },
  7: { type: "7", name: "지능 보너스", format: "1" },
  8: { type: "8", name: "트레이닝 효과 증가", format: "2" },
  9: { type: "9", name: "초기 스피드 증가", format: "1" },
  30: { type: "30", name: "스킬 Pt 보너스", format: "1" },
  31: { type: "31", name: "지능 우정 회복량 증가", format: "1" },
  10003: { type: "10003", name: "스피드 트레이닝", format: "10000" },
  10004: { type: "10004", name: "스태미나 트레이닝", format: "10000" },
  10005: { type: "10005", name: "파워 트레이닝", format: "10000" },
  10006: { type: "10006", name: "근성 트레이닝", format: "10000" },
  10007: { type: "10007", name: "지능 트레이닝", format: "10000" }
} as const;

/**
 * 서포트카드 시나리오 트레이닝 데이터
 * 3:스피드,  4:스태미나, 5:파워, 6:근성, 7:지능, 30:스킬 Pt
 */
export const TRAINING_CONST = {
  4: {
    name: "그랜드 라이브",
    code: 4,
    value: {
      3: { 3: 12, 5: 6, 30: 4 },
      4: { 4: 12, 6: 8, 30: 4 },
      5: { 4: 6, 5: 13, 30: 4 },
      6: { 3: 3, 5: 3, 6: 11, 30: 4 },
      7: { 3: 4, 7: 10, 30: 5 },
    },
  },
  3: {
    name: "Make a new track!!",
    code: 3,
    value: {
      3: { 3: 12, 5: 6, 30: 2 },
      4: { 4: 11, 6: 5, 30: 2 },
      5: { 4: 6, 5: 10, 30: 2 },
      6: { 3: 4, 5: 4, 6: 10, 30: 2 },
      7: { 3: 4, 7: 10, 30: 3 },
    },
  },
  2: {
    name: "아오하루",
    code: 2,
    value: {
      3: { 3: 12, 5: 6, 30: 4 },
      4: { 4: 12, 6: 8, 30: 4 },
      5: { 4: 6, 5: 13, 30: 4 },
      6: { 3: 4, 5: 4, 6: 10, 30: 4 },
      7: { 3: 4, 7: 10, 30: 5 },
    },
  },
  1: {
    name: "URA",
    code: 1,
    value: {
      3: { 3: 14, 5: 7, 30: 2 },
      4: { 4: 13, 6: 6, 30: 2 },
      5: { 4: 7, 5: 12, 30: 2 },
      6: { 3: 5, 5: 5, 6: 12, 30: 2 },
      7: { 3: 4, 7: 13, 30: 2 },
    },
  },
} as const;

export const TRAINING_LIST = [
  {type: "1", name: "URA"},
  {type: "2", name: "아오하루"},
  {type: "3", name: "Make a new track!!"},
  {type: "4", name: "그랜드 라이브"},
] as const;