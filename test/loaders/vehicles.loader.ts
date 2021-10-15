import { TimeWindow } from "../../lib/common/interfaces/shared/TimeWindow";

export const vehicles = {
  vehicle1: {
    external_id: `external_id_1`,
    label: `label1`,
    phone: `phone1`,
    email: `email1`,
    plate: `plate1`,
    color: `blue`,
    vehicle_model: `model1`,
    brand: `brand1`,
    default_time_window: [0, 10000] as TimeWindow,
    default_max_weight: 100,
    default_max_volume: 200,
    default_start_location: { lat: 1, lng: 1, county: `Mataro` },
    default_end_location: { lat: 2, lng: 2, county: `Mataro` },
    default_provides: [`p1`],
  },
};
