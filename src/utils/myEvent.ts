import EventEmitter from 'events';
import { ReactNode } from 'react';

export const UnAuth = 'unAuth';
export const GetTokenLogin = 'getTokenLogin';
export const ResultModal = 'ResultModal';
export const HeaderUpdateTreasury = 'HeaderUpdateTreasury';
export const ShowHeaderExplore = 'showHeaderExplore';
export const eventBus = new EventEmitter();

const EventList = ['SetGlobalLoading'];

class EventsServer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private eventEmitters: Record<string, any> = {};

  constructor() {}

  parseEvent(name: string, eventMap: string[]) {
    const eventObj: Record<string, EventStruct> = {};
    eventMap.forEach((item) => {
      const eventName = item.toUpperCase();
      eventObj[item] = {
        emit: this.emit.bind(this, eventName),
        addListener: this.addListener.bind(this, eventName),
        name: eventName,
      };
    });
    this.eventEmitters[name] = eventObj;
  }

  emit(eventType: string, ...params: unknown[]) {
    eventBus.emit(eventType, ...params);
  }

  addListener(eventType: string, listener: (data: unknown) => void) {
    eventBus.addListener(eventType, listener);
    return {
      remove: () => eventBus.removeListener(eventType, listener),
    } as unknown as TMyEventEmitter;
  }

  get base() {
    return this.eventEmitters['base'];
  }
}

type EventStruct = {
  emit: (...params: unknown[]) => void;
  addListener: (listener: (data: unknown) => void) => TMyEventEmitter;
  name: string;
};

const eventsServer = new EventsServer();
eventsServer.parseEvent('base', EventList);

export type TMyEventEmitter = {
  remove: () => void;
} & EventEmitter;

export type TMyEventsTypes = {
  [x in (typeof EventList)[number]]: EventStruct;
};

const myEvents = { ...eventsServer.base };

export default myEvents as unknown as TMyEventsTypes;

export const emitLoading = (isLoading: boolean, text?: string | ReactNode) => {
  myEvents.SetGlobalLoading.emit({
    isLoading,
    text,
  });
};