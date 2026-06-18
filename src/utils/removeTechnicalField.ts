export function removeTechnicalFields(
  obj: Record<string, unknown>,
): [string, string | number][] {
  const technicalStart = 'http';

  const filteredFieldsArray = Object.entries(obj).filter(
    (pair): pair is [string, string | number] => {
      const [key, value] = pair;
      if (key.toLowerCase() === 'created' || key.toLowerCase() === 'edited')
        return false;
      if (typeof value === 'string' && !value.startsWith(technicalStart))
        return true;
      if (typeof value === 'number') return true;
      return false;
    },
  );

  return filteredFieldsArray;
}
