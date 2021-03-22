const groupBy = require('lodash.groupby');

export const groupByArray = (array: any[], uniqueIndex): any[] => {
  const groupedObj = groupBy(array, uniqueIndex);
  console.log(groupedObj);
  return groupedObj;
};
