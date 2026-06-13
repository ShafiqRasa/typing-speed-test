import data from "./data.json";

export type DifficultyLevel = keyof typeof data;

export const difficultyOptions = Object.keys(data) as DifficultyLevel[];

export const getTextForDifficulty = (
  difficulty: DifficultyLevel,
  index = 0,
): string => {
  return data[difficulty]?.[index]?.text ?? data.easy[0].text;
};
