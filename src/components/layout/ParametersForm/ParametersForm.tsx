import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { useForm } from 'react-hook-form';

interface ParametersFormProps {

}

const ParametersForm = (props: ParametersFormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      roofType: ""
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  }

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      height="100%"
      padding={3}
    >
      <FormControl fullWidth>
        <InputLabel>Тип крыши</InputLabel>
        <Select label="Тип крыши" {...register("roofType")}>
          <MenuItem value="flat">
            Плоская
          </MenuItem>
          <MenuItem value="shed">
            Под наклоном
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default ParametersForm
