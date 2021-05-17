// Recives an array with multiple arrays and join them
export const mergeArrays = (arrayWithArrays) => {
  return [].concat.apply([], arrayWithArrays);
};
