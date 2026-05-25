
const excludedFields = new Set(["url", "created", "edited", "homeworld"]);

export const filterFields = (obj: Record<string, unknown>) => Object.entries(obj)
  .filter(([key, value]) => {
    if (excludedFields.has(key)) return false;
    if (Array.isArray(value)) return false;
    return true;
  });

export function removeTechnicalFields(obj: Record<string, unknown>): [string, string | number][] {
  const technicalStart = 'http';

  const filteredFieldsArray = Object.entries(obj)
    .filter((pair): pair is [string, string | number] => {
      const [key, value] = pair;
      if (key.toLowerCase() === "created" || key.toLowerCase() === "edited") return false;
      if (typeof value === 'string' && !value.startsWith(technicalStart)) return true;
      if (typeof value === 'number') return true;
      return false;
    });

  return filteredFieldsArray;
}