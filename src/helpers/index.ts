export const generatePredictionFormInfo = (values: string[]) => {
  const xObject: { [key: string]: string } = {};

  for (const item of values) {
    xObject[item] = "";
  }

  return xObject;
};

export const findEmptyPredictionXs = (
  formInfo: { [key: string]: string },
  currentXs: string[] | null
) => {
  const filledInputs: string[] = [];

  for (const key in formInfo) {
    if (formInfo[key] !== "") {
      filledInputs.push(key);
    }
  }

  const notFilledInputs = currentXs?.filter((x) => !filledInputs.includes(x));

  return notFilledInputs;
};
