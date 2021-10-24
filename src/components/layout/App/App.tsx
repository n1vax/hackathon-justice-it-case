import { useMemo, useState } from "react";
import * as THREE from "three";
import { useForm } from "react-hook-form";
import { Grid, IconButton, InputBase, List, ListItem, Typography, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import Map from "@components/layout/Map";
import HouseScene from "@components/layout/HouseScene"
import { GOOGLE_API_KEY } from "@utils/config";

import Panel, { PanelInner } from "../Panel";
import ParametersForm, { ParametersFormData } from "../ParametersForm";
import { grey } from '@mui/material/colors';
import Sidebar from "../Sidebar";

interface AppProps { }

const getGoogleMapAddressUrl = (address: string) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}&language=ru`;
}

const App = (props: AppProps) => {
  const [parameters, setParameters] = useState<ParametersFormData>()
  const [center, setCenter] = useState({
    lat: 47.2372031,
    lng: 39.7099012
  });

  const { register, handleSubmit } = useForm<{ address: string }>({
    defaultValues: {
      address: ""
    },
  });

  const [data, setData] = useState<{
    path: THREE.Vector2[],
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

  const solarPanelCapacityPerDay = useMemo(() => {
    if (!parameters?.solarPanel) {
      return 0;
    }

    const { width, height, efficiency, capacity } = parameters.solarPanel;

    if (!capacity) {
      return 0;
    }

    const area = (width || 0) * (height || 0);

    const capacityWatts = capacity * 1000;
    const SUN_HOURS_PER_DAY = 4.5;

    const result = (area * capacityWatts * ((efficiency || 0) / 100) * SUN_HOURS_PER_DAY) / 1000;

    return +result.toFixed(6);
  }, [parameters]);

  const solarPanelCount = useMemo(() => {
    if (!parameters) {
      return 0;
    }

    const { desiredEnergySavings, electricityCostPerYear } = parameters;

    if (!desiredEnergySavings || !electricityCostPerYear || !solarPanelCapacityPerDay) {
      return 0;
    }


    const costPerYer = electricityCostPerYear * (desiredEnergySavings / 100);
    const solarPanelCapacityPerYer = solarPanelCapacityPerDay * 365;

    return Math.round(costPerYer / solarPanelCapacityPerYer);
  }, [parameters]);

  const areaOfAllSolarPanels = useMemo(() => {
    if (!parameters?.solarPanel) {
      return 0;
    }

    const { width, height } = parameters.solarPanel;

    if (!width || !height || !solarPanelCount) {
      return 0;
    }

    const area = width * height * solarPanelCount;

    return area;
  }, [parameters]);

  const computedValuesList = useMemo(() => {
    return [
      {
        name: "Производительность одной панели за день",
        value: solarPanelCapacityPerDay,
        unit: "кВт"
      },
      {
        name: "Площадь выделенной области",
        value: data ? data.area : 0,
        unit: "м2"
      },
      {
        name: "Кол-во солнечных панелей с учетом экономии",
        value: solarPanelCount,
        unit: "шт."
      },
      {
        name: "Общая площадь солнечных батарей с учетом экономии",
        value: areaOfAllSolarPanels,
        unit: "м2"
      },
    ]
  }, [solarPanelCapacityPerDay, data, solarPanelCount, areaOfAllSolarPanels])

  return (
    <Box
      component="div"
      sx={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100vh"
      }}
    >
      <Grid height="100%" container>
        <Grid height="100%" maxWidth="400px" item xs={3}>
          <Sidebar show={!!data} className="sidebar-left">
            <Panel>
              <PanelInner>
                <ParametersForm onChange={setParameters} />
              </PanelInner>
            </Panel>

            <Panel>
              <PanelInner>
                <Typography mb={1} variant="h5" component="h2">
                  Вычисленные значения
                </Typography>

                <List>
                  {computedValuesList.map((listItem, i) => {
                    return (
                      <ListItem key={i} sx={{
                        alignItems: "flex-end",

                      }} disableGutters>
                        <Typography
                          sx={{
                            // display: "block",
                            // width: "100%",
                            // mb: 1
                            flex: "1 1 50%"
                          }}
                          variant="caption"
                          color="text.secondary"
                        >
                          {listItem.name}
                        </Typography>
                        <Typography
                          sx={{
                            flex: "1 1 50%",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "flex-end"
                          }}
                          variant="subtitle2"
                        // color="text.primary"
                        >
                          {`${listItem.value} ${listItem.unit}`}
                        </Typography>
                      </ListItem>
                    )
                  })}
                </List>
              </PanelInner>
            </Panel>
          </Sidebar>
        </Grid>

        <Grid height="100%" py={3} item xs>
          <Panel height="auto">
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                overflow: "hidden",
                borderRadius: 2,
                paddingX: 2,
                paddingY: 0.5,
                display: "flex"
              }}
            >
              <InputBase placeholder="Введите адрес" fullWidth {...register("address")} />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>
          </Panel>
        </Grid>

        <Grid height="100%" maxWidth="400px" item xs={3}>
          <Sidebar show={!!data} className="sidebar-right">
            <Panel>
              {data ? <HouseScene path={data.path} /> : null}
            </Panel>
          </Sidebar>
        </Grid>
      </Grid>

      <Map
        onChange={setData}
        center={center}
      />
    </Box>
  )
}

export default App
