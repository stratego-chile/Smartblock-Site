/* eslint-disable @typescript-eslint/no-explicit-any */
export type Subscription = {
  unsubscribe: () => void;
}

export type EventEmitter<T = any> = {
  subscribe: (name: string, cd: T) => Subscription;
  emit: (name: string, data: T) => void;
}

export type CustomEvent = { [key: string]: any }

export function EventEmitter<T = any>(eventsConfig?: CustomEvent): EventEmitter<T> {
  const events: CustomEvent = { ...eventsConfig };
  return {
    subscribe: (name: string, cb: T) => { // Generates a subscription instance to receive the event data asynchronously
      (events[name] || (events[name] = [])).push(cb);
      return {
        unsubscribe: () => {
          events[name] && events[name].splice(events[name].indexOf(cb), 1); // Removes the locally stored event data
        }
      };
    },
    emit: (name: string, data: T) => {
      (events[name] || []).forEach((fn: (arg: T) => void) => fn(data));
    }
  };
}
