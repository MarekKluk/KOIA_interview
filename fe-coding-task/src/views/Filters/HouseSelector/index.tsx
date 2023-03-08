import { NativeSelect } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { HouseType } from '../../types/HouseType';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../types/FormValues';

export function HouseSelector () {
  const { register, setValue } = useFormContext<FormValues>()
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue('houseType', event.target.value)
  }
  return (
    <NativeSelect
      {...register('houseType')}
      onChange={onChange}
    >
      <option value={HouseType.All}>{HouseType.All}</option>
      <option value={HouseType.SmallHouses}>{HouseType.SmallHouses}</option>
      <option value={HouseType.ApartmentBlocks}>{HouseType.ApartmentBlocks}</option>
    </NativeSelect>
  )
}
