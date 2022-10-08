const omitUndefinedAndEmptyArr = <T>(obj: any): T => {
  const newObj = {} as any;
  Object.keys(obj || {}).forEach((key) => {
    if (Array.isArray(obj[key]) && obj[key]?.length === 0) {
      return;
    }
    if (obj[key] === undefined) {
      return;
    }
    newObj[key] = obj[key];
  });
  return newObj;
};

export default omitUndefinedAndEmptyArr;
