export function getDesiredQuartersArray(startQuarter: string, endQuarter: string) {
  const quarters: string[] = [];
  const startYear = parseInt(startQuarter.slice(0, 4));
  const endYear = parseInt(endQuarter.slice(0, 4));
  const startQuarterNumber = parseInt(startQuarter.slice(5));
  const endQuarterNumber = parseInt(endQuarter.slice(5));

  for (let year = startYear; year <= endYear; year++) {
    const start = year === startYear ? startQuarterNumber : 1;
    const end = year === endYear ? endQuarterNumber : 4;
    for (let quarter = start; quarter <= end; quarter++) {
      quarters.push(`${year}K${quarter}`);
    }
  }
  return quarters;
}
