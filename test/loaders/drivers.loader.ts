import { TimeWindow } from "../../lib/common/interfaces/common";

export const drivers = {
  driver1: {
    external_id: `route1`,
    label: `My First Route`,
    phone: `111111`,
    comments: `this is my first route`,
    color: `#FF0000`,
    email: `hoy@who.com`,
    plate: `1331HXJ`,
    vehicle_model: `Model`,
    brand: `SEAT`,
    planned_track: `asd123ASd123`,
    time_window: [10, 20] as TimeWindow,
    max_weight: 100,
    max_volume: 100,
    start_location: { county: `US`, country: `spain`, lat: 1, lng: 1 },
    end_location: { county: `US`, country: `spain`, lat: 2, lng: 2 },
    provides: [`something`],
    start_date: new Date(),
    end_date: new Date(),
  },
};
