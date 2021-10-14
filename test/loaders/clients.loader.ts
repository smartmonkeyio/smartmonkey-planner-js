import { TimeWindow } from "../../lib/common/interfaces/common";

export const clients = {
  client1: {
    external_id: `client1`,
    location: {
      lat: 1,
      lng: 1,
      label: `Avenida Meridiana`,
    },
    label: `label1`,
    comments: `comments`,
    phone: `phone1`,
    email: `example@mail1.com`,
    url: `http://example1.com`,
    reference_person: `Manolo`,
    default_duration: 3600,
    default_requires: [`requires1`],
    default_time_windows: [[0, 3600]] as TimeWindow[],
    default_volume: 1000,
    default_weight: 1000,
  },
};
