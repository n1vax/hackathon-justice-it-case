import GoogleMap from "google-map-react"
// import { GoogleMap, withGoogleMap } from "react-google-maps";
import { ChangeEventHandler, FormEventHandler, useEffect, useMemo, useState } from "react";
import { Mesh, BoxBufferGeometry, MeshNormalMaterial, Vector2 } from "three";
import { latLngToVector3, ThreeJSOverlayView } from "@googlemaps/three";
import Map from "@components/layout/Map/MapOld";
import TextField from "@material-ui/core/TextField"

import debounce from "lodash/debounce";
import { GOOGLE_API_KEY } from "@utils/config";
import Autocomplete from "@components/common/Autocomplete";
import { useForm } from "react-hook-form";
import axios from "axios";
import HouseScene from "@components/layout/HouseScene"
import Panel from "../Panel";
import PanelGroup from "../Panel/PanelGroup";
import { Box } from "@mui/system";

interface Props {

}


const data = {
  center: {
    lat: 47.2366856,
    lng: 39.7067648
  },
  zoom: 11
};

const getGoogleMapAddressUrl = (address: string) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}&language=ru`;
}



const App = (props: Props) => {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({
    lat: 47.2366856,
    lng: 39.7067648
  });

  const [data, setData] = useState<{
    path: Vector2[]
  } | null>(null);

  const { register, handleSubmit } = useForm<{ address: string }>({
    defaultValues: {
      address: ""
    },
  });

  const onSubmit = ({ address }: { address: string }) => {
    fetch(getGoogleMapAddressUrl(address))
      .then((data) => data.json())
      .then((data: { status: string, results: [{ geometry: { location: { lat: number, lng: number } } }] }) => {
        console.log(data);
        if (data.status === "OK") {
          setCoords(data.results[0].geometry.location)
        }
      });
  }

  return (
    <div className="app">
      <div className="ui">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("address")} />
        </form>
      </div>

      {/* <Box
        display="flex"
        height="100%"
        className="panel-group"
        gap={50}
      >

      </Box> */}

      <PanelGroup>
        <Panel>
          <Map onChange={setData} position={coords} />
        </Panel>
        <Panel>
        </Panel>
        <Panel>
          {data ? <HouseScene path={data.path} /> : null}
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default App
