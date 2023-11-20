const eventEmit = (() => {
  const events = {};

  const subscribe = (type, callBack) => {
    if (events[type]) {
      events[type].push(callBack);
    } else {
      events[type] = [callBack];
    }
  };

  const trigger = (type, ...args) => {
    if (events[type]) {
      events[type].forEach((callback) => {
        callback(...args);
      });
    }
  };

  return { subscribe, trigger };
})();

export default eventEmit;
