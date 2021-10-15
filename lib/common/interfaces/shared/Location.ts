export interface Location {
  location_id?: string;
  label?: string;
  country?: string;
  country_code?: string;
  state?: string;
  county?: string;
  city?: string;
  district?: string;
  subdistrict?: string;
  block?: string;
  subblock?: string;
  street?: string;
  house_number?: string;
  postal_code?: string;
  comments?: string;
  lat?: number;
  lng?: number;
  scoring?: number;
  partial_match?: boolean;
}
