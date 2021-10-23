import GoogleMap from "google-map-react"
// import { GoogleMap, withGoogleMap } from "react-google-maps";
import { useEffect, useState } from "react";
import { Mesh, Scene, BoxBufferGeometry, MeshNormalMaterial } from "three";
import { latLngToVector3, ThreeJSOverlayView } from "@googlemaps/three";
import { GOOGLE_API_KEY } from "@utils/config";


interface MapProps {
  position: GoogleMap.Coords;
  zoom?: number;
}

const Marker = ({ lat, lng }: GoogleMap.Coords) => {
  return <button>
    marker
  </button>
}


const Map = ({
  position,
  zoom = 18
}: MapProps) => {
  const [google, setGoogle] = useState<{ map: any, maps: any }>();

  const handleGoogleApiLoaded = (params: { map: any, maps: any }) => {
    const polyOptions = {
      strokeWeight: 0,
      fillOpacity: 0.45,
      editable: true
    };
    // Creates a drawing manager attached to the map that allows the user to draw
    // markers, lines, and shapes.
    const drawingManager = params.maps.drawing.DrawingManager({
      drawingMode: params.maps.drawing.OverlayType.POLYGON,
      markerOptions: {
        draggable: true
      },
      polylineOptions: {
        editable: true
      },
      rectangleOptions: polyOptions,
      circleOptions: polyOptions,
      polygonOptions: polyOptions,
      map: params.map
    });

    // const triangleCoords = [
    //   { lat: 25.774, lng: -80.19 },
    //   { lat: 18.466, lng: -66.118 },
    //   { lat: 32.321, lng: -64.757 },
    //   { lat: 25.774, lng: -80.19 }
    // ];

    // var bermudaTriangle = new params.maps.Polygon({
    //   paths: triangleCoords,
    //   strokeColor: "#FF0000",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#FF0000",
    //   fillOpacity: 0.35
    // });
    // bermudaTriangle.setMap(params.map);

    setGoogle(params);
  }

  useEffect(() => {
    // if (map) {
    //   map.setOptions({
    //     zoom
    //   })
    // }
    // setZoom(20);
  }, [position]);

  // useEffect(() => {
  //   if (!google) {
  //     return;
  //   }

  //   const drawingManager = google.maps.drawing.DrawingManager({
  //     drawingMode: google.maps.drawing.OverlayType.POLYGON,
  //     markerOptions: {
  //       draggable: true
  //     },
  //     polylineOptions: {
  //       editable: true
  //     },
  //     drawingControlOptions: {
  //       position: google.maps.ControlPosition.TOP_CENTER,
  //       drawingModes: [
  //         google.maps.drawing.OverlayType.MARKER,
  //         google.maps.drawing.OverlayType.CIRCLE,
  //         google.maps.drawing.OverlayType.POLYGON,
  //         google.maps.drawing.OverlayType.POLYLINE,
  //         google.maps.drawing.OverlayType.RECTANGLE,
  //       ],
  //     },
  //     // markerOptions: {
  //     //   icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  //     // },
  //     circleOptions: {
  //       fillColor: "#ffff00",
  //       fillOpacity: 1,
  //       strokeWeight: 5,
  //       clickable: false,
  //       editable: true,
  //       zIndex: 1,
  //     },

  //     // rectangleOptions: polyOptions,
  //     // circleOptions: polyOptions,
  //     // polygonOptions: polyOptions,
  //     // map: map
  //   });
  //   // console.log(window.google);
  // }, [google]);

  return (
    <div className="map">
      <GoogleMap
        options={{
          disableDefaultUI: true,
          mapTypeId: "satellite",
        }}

        bootstrapURLKeys={{
          key: GOOGLE_API_KEY,
          language: 'ru',
          region: 'ru',
          libraries: ["drawing"]
        }}
        center={position}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleGoogleApiLoaded}
      >
        <Marker {...position} />
      </GoogleMap>
    </div>
  )
}

export default Map
