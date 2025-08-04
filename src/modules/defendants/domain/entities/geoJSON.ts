// export type Coordinates = [number, number];

type Geometry = {
  type: string;
  coordinates: [number, number][];
};

type Feature = {
  type: string;
  properties: Record<string, unknown>;
  geometry: Geometry;
};

export type GeoJSONO = {
  type: string;
  features: Feature[];
};
