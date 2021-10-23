import GoogleMap from "google-map-react"
// import { GoogleMap, withGoogleMap } from "react-google-maps";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Mesh, Scene, BoxBufferGeometry, MeshNormalMaterial, Vector2 } from "three";
import { latLngToVector3, ThreeJSOverlayView } from "@googlemaps/three";
import { useGoogle } from "src/contexts/Google";
import { GOOGLE_API_KEY } from '@utils/config';
import { Loader } from '@googlemaps/js-api-loader';
import Button from '@mui/material/Button';
import { latLngToVector2Relative, latLngToVector3Relative } from "@utils/three";
import { Backdrop, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";



interface MapProps {
  children?: ReactNode;
  center: GoogleMap.Coords;
  zoom?: number;
  onChange: (data: { area: number, path: Vector2[] } | null) => void;
}

const Map = ({
  center,
  onChange,
  children
}: MapProps) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{
    google?: typeof window.google,
    map?: google.maps.Map,
    drawingManager?: google.maps.drawing.DrawingManager,
    selectedShape?: google.maps.Polygon
  }>({});

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      version: 'weekly',
      libraries: ["drawing"]
    });
    const el = elRef.current!;

    loader.load().then((google) => {
      const map = new google.maps.Map(el, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 20,
        disableDefaultUI: true,
        mapTypeId: "satellite"
      });

      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        polygonOptions: {
          strokeWeight: 0,
          fillColor: "#1E90FF",
          fillOpacity: 0.45,
          editable: true
        },
        map: map
      });

      setState(oldState => ({
        ...oldState,
        google,
        map,
        drawingManager
      }))
    });
  }, []);

  useEffect(() => {
    const { google, drawingManager, selectedShape } = state;

    if (!google || !drawingManager) {
      return;
    }

    let handleOverlayComplete: google.maps.MapsEventListener;

    if (selectedShape) {
      drawingManager.setDrawingMode(null);
    } else {
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);

      handleOverlayComplete = google.maps.event.addListener(drawingManager, 'overlaycomplete', (e) => {
        drawingManager.setDrawingMode(null);

        const selectedShape: google.maps.Polygon = e.overlay;
        const selectedShapePath = selectedShape.getPath();

        const handlePathSetAndInsertAt = () => {
          const area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
          const rawPath = selectedShapePath.getArray();
          const path = rawPath.map((latLng) => latLngToVector2Relative(latLng, rawPath[0]));

          onChange({
            area,
            path
          });
        }

        google.maps.event.addListener(selectedShapePath, 'set_at', handlePathSetAndInsertAt);
        google.maps.event.addListener(selectedShapePath, 'insert_at', handlePathSetAndInsertAt);

        handlePathSetAndInsertAt();

        setState(oldState => ({
          ...oldState,
          selectedShape
        }));
      });
    }

    return () => {
      google.maps.event.removeListener(handleOverlayComplete);
    }
  }, [state]);

  useEffect(() => {
    const { map } = state;

    if (!map) {
      return;
    }

    map.setCenter(center);
    map.setZoom(18);
  }, [center])

  const handleDelete = () => {
    if (state.selectedShape) {
      state.selectedShape.setMap(null);

      onChange(null);

      setState(oldState => ({
        ...oldState,
        selectedShape: undefined
      }))
    }
  }

  return (
    <Box height="100%" position="relative" display="flex" >
      <Box flex="1 1 auto" ref={elRef} className="map__content" />

      {children}

      <Box
        width="100%"
        bottom={0}
        display="flex"
        justifyContent="center"
        marginBottom={4}
        position="absolute"
      >
        {
          state.selectedShape && <Button
            onClick={handleDelete}
            variant="contained"
          >
            Очисть область
          </Button>
        }
      </Box>
    </Box>
  )
}

export default Map
