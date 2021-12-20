export const getSetTimeoutPromise = (miliseconds: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log("timeout miliseconds: ", miliseconds);
      resolve();
    }, miliseconds);
  });
};
