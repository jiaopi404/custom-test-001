import { getSetTimeoutPromise } from "./001getSetTimeoutPromise";

type PromiseTaskType = (...args: any[]) => Promise<any>;

function usePromiseQueue() {
  const queue: PromiseTaskType[] = [];
  let loopIntervalId: number;

  const start = () => {
    loopIntervalId = setInterval(async () => {
      if (queue.length) {
        clearInterval(loopIntervalId);
        await execPromiseTask();
        return start();
      }
    }, 17);
  };

  const execPromiseTask = async () => {
    for (const task of queue) {
      await task();
      queue.shift();
    }
  };

  const add = (promiseTask: PromiseTaskType) => {
    queue.push(promiseTask);
  };

  const destroy = () => {
    clearInterval(loopIntervalId);
  };

  return {
    start,
    add,
    destroy,
  };
}

function setup() {
  const { start, add: addTask, destroy } = usePromiseQueue();
  start();
  addTask(getSetTimeoutPromise.bind(null, 300));
  addTask(getSetTimeoutPromise.bind(null, 1000));
  addTask(getSetTimeoutPromise.bind(null, 600));
  setTimeout(() => {
    destroy();
  }, 5000);
}
export default setup;
