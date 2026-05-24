
const excludedFields = new Set(["url", "created", "edited", "homeworld"]);

export const filterFields = (obj: Record<string, unknown>) => Object.entries(obj)
  .filter(([key, value]) => {
    if (excludedFields.has(key)) return false;
    if (Array.isArray(value)) return false;
    return true;
  });