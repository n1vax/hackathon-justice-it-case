
import { MathUtils, Vector2, Vector3 } from "three";

export const EARTH_RADIUS = 6371010;

const toLatLngLiteral = (
  latLng: google.maps.LatLngLiteral | google.maps.LatLng
): google.maps.LatLngLiteral => {
  if (window.google && google.maps && latLng instanceof google.maps.LatLng) {
    return latLng.toJSON();
  }
  return latLng as google.maps.LatLngLiteral;
}

/**
 * Converts latitude and longitude to meters.
 */
export const latLngToMeters = (
  latLng: google.maps.LatLngLiteral | google.maps.LatLng
): {
  x: number;
  y: number;
} => {
  latLng = toLatLngLiteral(latLng);

  const x = EARTH_RADIUS * MathUtils.degToRad(latLng.lng);
  const y =
    0 -
    EARTH_RADIUS *
    Math.log(
      Math.tan(0.5 * (Math.PI * 0.5 - MathUtils.degToRad(latLng.lat)))
    );
  return { x, y };
}

/**
 * Converts latitude and longitude to world space coordinates with y up.
 */
export const latLngToVector3 = (
  point: google.maps.LatLngLiteral | google.maps.LatLng,
  target = new Vector3()
) => {
  const { x, y } = latLngToMeters(point);

  return target.set(x, 0, -y);
}

export const latLngToVector2 = (
  point: google.maps.LatLngLiteral | google.maps.LatLng,
  target = new Vector2()
) => {
  const { x, y } = latLngToMeters(point);

  return target.set(x, y);
}


export const latLngToVector3Relative = (
  point: google.maps.LatLngLiteral | google.maps.LatLng,
  reference: google.maps.LatLngLiteral | google.maps.LatLng,
  target = new Vector3()
) => {
  const p = latLngToVector3(point);
  const r = latLngToVector3(reference);

  target.setX(Math.abs(r.x - p.x) * Math.sign(p.x - r.x));
  target.setY(Math.abs(r.y - p.y) * Math.sign(p.y - r.y));
  target.setZ(Math.abs(r.z - p.z) * Math.sign(p.z - r.z));

  return target;
}

export const latLngToVector2Relative = (
  point: google.maps.LatLngLiteral | google.maps.LatLng,
  reference: google.maps.LatLngLiteral | google.maps.LatLng,
  target = new Vector2()
) => {
  const p = latLngToVector2(point);
  const r = latLngToVector2(reference);

  target.setX(Math.abs(r.x - p.x) * Math.sign(p.x - r.x));
  target.setY(Math.abs(r.y - p.y) * Math.sign(p.y - r.y));

  return target;
}