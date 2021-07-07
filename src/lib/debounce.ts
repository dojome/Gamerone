// const debounce = (fn, time) => {
//   let timeout;

//   return function () {
//     const functionCall = () => fn.apply(this, arguments);

//     clearTimeout(timeout);
//     timeout = setTimeout(functionCall, time);
//   };
// };

// export default debounce;

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export default debounce;
