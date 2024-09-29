declare global {
  const AF: (
    typeEvent: string,
    typeTrack: string,
    eventParam: {
      eventType: string;
      eventName: string;
      eventValue: {[key: string]: string};
    },
  ) => void;
}

export {};
