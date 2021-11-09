export type ITransportModes = `car` | `truck` | `bicycle` | `pedestrian` | `scooter`;

export type ShippedHazardousGoods =
  | `explosive`
  | `gas`
  | `flammable`
  | `combustible`
  | `organic`
  | `poison`
  | `radioactive`
  | `corrosive`
  | `poisonousInhalation`
  | `harmfulToWater`
  | `other`;

export type TunnelCategory = `B` | `C` | `D` | `E`;

export type TruckType = `straight` | `tractor`;

export interface ITruckOptions {
  shipped_hazardous_goods?: ShippedHazardousGoods[];
  gross_weight?: number;
  height?: number;
  width?: number;
  length?: number;
  tunnel_category?: TunnelCategory;
  axle_count?: number;
  type?: TruckType;
  trailer_count?: number;
}

export interface TrafficOptions {
  mode?: ITransportModes;
  multiplier?: number;
  truck?: ITruckOptions;
}