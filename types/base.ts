export type PlanForm = {
  feature_id: string;
  latLng: string;
  type: string;
};

export const enum GEOTYPEENUM {
  POINT = "POINT",
  LINE = "LINE",
  POLYGON = "POLYGON",
}

export const enum IMAGEFORMATENUM {
  JPG = "JPG",
  PNG = "PNG",
  GEOTIFF = "GEOTIFF",
}
