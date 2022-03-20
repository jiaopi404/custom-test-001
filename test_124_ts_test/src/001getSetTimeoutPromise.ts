export const getSetTimeoutPromise = (miliseconds: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log("timeout miliseconds: ", miliseconds);
      console.log("timeout miliseconds: ", miliseconds); // add a log
      resolve();
    }, miliseconds);
  });
};
