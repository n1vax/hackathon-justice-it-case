import { Divider, FormControl, FormGroup, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system'
import { clamp } from 'lodash';
import React, { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form';

export interface ParametersFormData {
  electricityCostPerYear?: number | undefined;
  desiredEnergySavings?: number | undefined;
  roof?: {
    type?: "flat" | "shed",
    pitch?: number
  }
  solarPanel?: {
    width?: number,
    height?: number,
    efficiency?: number,
    capacity?: number
  }
}

interface ParametersFormProps {
  onChange: (data: ParametersFormData) => void
}

const ParametersForm = ({ onChange }: ParametersFormProps) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<ParametersFormData>({
    mode: "onChange",
    defaultValues: {
      roof: {
        type: "flat",
        pitch: 0
      },
      electricityCostPerYear: 10524,
      desiredEnergySavings: 50,
      solarPanel: {
        width: 1,
        height: 1.65,
        efficiency: 20,
        capacity: 1
      }
    },
  });

  const data = useWatch({ control });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(data);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [data, onChange]);

  return (
    <Box
      onSubmit={handleSubmit(onChange)}
      component="form"
    >
      <Stack spacing={2}>
        <Typography mb={1} variant="h5" component="h2">
          Параметры
        </Typography>
        <FormControl component="fieldset" variant="standard" fullWidth>
          <FormLabel sx={{ marginBottom: 3 }} component="legend">Крыша</FormLabel>
          <Box
            display="flex"

            gap={2}
          >
            <FormControl fullWidth>
              <InputLabel>Тип</InputLabel>
              <Select
                defaultValue="flat"
                error={!!errors?.roof?.type}
                label="Тип"
                {...register("roof.type", { required: true })}>
                <MenuItem value="flat">
                  Плоская
                </MenuItem>
                <MenuItem value="shed">
                  Под наклоном
                </MenuItem>
              </Select>
            </FormControl>
            {data.roof?.type === "shed" && (
              <FormControl fullWidth>
                <InputLabel>Угол наклона</InputLabel>
                <OutlinedInput
                  error={!!errors?.roof?.pitch}
                  type="number"
                  label="Угол наклона"
                  {...register("roof.pitch", { min: 0, max: 60, valueAsNumber: true })}
                  endAdornment={<InputAdornment position="end">градусов</InputAdornment>}
                />
              </FormControl>
            )}
          </Box>
        </FormControl>

        <FormControl component="fieldset" variant="standard" fullWidth>
          <FormLabel sx={{ marginBottom: 3 }} component="legend">Солнечная батарея</FormLabel>
          <Grid container spacing={2}>
            <Grid item xs={6}>

              <FormControl fullWidth>
                <InputLabel>Ширина</InputLabel>
                <OutlinedInput
                  type="number"
                  error={!!errors?.solarPanel?.width}
                  label="Ширина"
                  {...register("solarPanel.width", { min: 0, required: true, valueAsNumber: true })}
                  endAdornment={<InputAdornment position="end">м</InputAdornment>}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>

              <FormControl fullWidth>
                <InputLabel>Высота</InputLabel>
                <OutlinedInput
                  type="number"
                  error={!!errors?.solarPanel?.height}
                  label="Высота"
                  {...register("solarPanel.height", { min: 0, required: true, valueAsNumber: true })}
                  endAdornment={<InputAdornment position="end">м</InputAdornment>}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>

              <FormControl fullWidth>
                <InputLabel>Эффективность</InputLabel>
                <OutlinedInput
                  type="number"
                  error={!!errors?.solarPanel?.efficiency}
                  label="Эффективность"
                  {...register("solarPanel.efficiency", { min: 0, max: 101, required: true, valueAsNumber: true })}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>

              <FormControl fullWidth>
                <InputLabel>Мощность на 1м2</InputLabel>
                <OutlinedInput
                  type="number"
                  error={!!errors?.solarPanel?.capacity}
                  label="Мощность на 1м2"
                  {...register("solarPanel.capacity", { min: 0, required: true, valueAsNumber: true })}
                  endAdornment={<InputAdornment position="end">кВт</InputAdornment>}
                />
              </FormControl>
            </Grid>
          </Grid>
        </FormControl>


        <FormControl component="fieldset" variant="standard" fullWidth>
          <FormLabel sx={{ marginBottom: 3 }} component="legend">Исходные параметры</FormLabel>
          <Box flexDirection="column" display="flex" gap={2}>
            <FormControl fullWidth>
              <InputLabel>Затраты на электричество в год</InputLabel>
              <OutlinedInput
                error={!!errors?.electricityCostPerYear}
                type="number"
                label="Затраты на электричество в год"
                {...register("electricityCostPerYear", { min: 0, required: true, valueAsNumber: true })}
                endAdornment={<InputAdornment position="end">кВт</InputAdornment>}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Желаемая экономия электроэнергии</InputLabel>
              <OutlinedInput
                type="number"
                error={!!errors?.desiredEnergySavings}
                label="Желаемая экономия электроэнергии"
                {...register("desiredEnergySavings", { min: 0, max: 100, required: true, valueAsNumber: true })}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </FormControl>
          </Box>
        </FormControl>
      </Stack>
    </Box>
  )
}

export default ParametersForm
