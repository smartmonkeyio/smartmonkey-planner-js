import { TimeWindows } from "../../lib/common/interfaces/shared/TimeWindow";

export const stops = {
  stop1: {
    external_id: `external id 1`,
    client_external_id: `client_external_id1`,
    reference_person: `Mariano`,
    location: {
      lat: 1,
      lng: 1,
      label: `Avenida Meridiana`,
    },
    location_details: `First floor`,
    label: `Stop 1`,
    comments: `My comment`,
    phone: `555-555-555`,
    email: `example@test.com`,
    url: `https://test.com`,
    duration: 3600,
    requires: [`frio`],
    time_windows: [[0, 3600]] as TimeWindows,
    volume: 1000,
    weight: 1000,

    custom_fields: {},
  },
};
