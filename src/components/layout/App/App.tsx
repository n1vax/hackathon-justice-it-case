import { useState } from "react";
import { Vector2 } from "three";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import Paper from '@mui/material/Paper';
import { IconButton, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import Map from "@components/layout/Map";
import HouseScene from "@components/layout/HouseScene"
import { GOOGLE_API_KEY } from "@utils/config";

import Panel from "../Panel";
import ParametersForm from "../ParametersForm";
import { grey } from '@mui/material/colors';

interface AppProps {

}


const getGoogleMapAddressUrl = (address: string) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}&language=ru`;
}

const App = (props: AppProps) => {
  const [center, setCenter] = useState({
    lat: 47.2366856,
    lng: 39.7067648
  });

  const { register, handleSubmit } = useForm<{ address: string }>({
    defaultValues: {
      address: ""
    },
  });

  const [data, setData] = useState<{
    path: Vector2[],
    area: number
  } | null>(null);

  const onSubmit = ({ address }: { address: string }) => {
    fetch(getGoogleMapAddressUrl(address))
      .then((data) => data.json())
      .then((data: { status: string, results: [{ geometry: { location: { lat: number, lng: number } } }] }) => {
        if (data.status === "OK") {
          setCenter(data.results[0].geometry.location)
        }
      });
  }

  return (
    <Box
      display="flex"
      height={{ xl: "100vh" }}
      flexWrap={{ xs: "wrap", xl: "nowrap" }}
      flexDirection={{ xs: "column", xl: "row" }}
      padding={6}
      gap={6}
      bgcolor={grey[200]}
    >
      <Panel expanded>
        <Map
          onChange={setData}
          center={center}
        >
          <Box width="100%" top={0} position="absolute" padding={2}>
            <Paper
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                overflow: "hidden",
                borderRadius: 2,
                paddingX: 1.5,
                paddingY: 0.2,
                display: "flex"
              }}
              elevation={10}
            >
              <InputBase placeholder="Введите адрес вашего дома" fullWidth {...register("address")} />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Map>
      </Panel>

      <Panel expanded={!!data}>
        <ParametersForm />
      </Panel>

      <Panel expanded={!!data}>
        {data ? <HouseScene path={data.path} /> : null}
      </Panel>
    </Box>
  )
}

export default App
