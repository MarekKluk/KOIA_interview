import {NativeSelect} from '@mui/material';
import React from 'react';
import { HouseType } from '../types/HouseType';
import { UseFormRegister } from "react-hook-form";

type HouseSelectorProps = {
  register?: UseFormRegister<{ houseType: string }>;
  defaultValue?: string;
}
export function HouseSelector ({ register, defaultValue }: HouseSelectorProps) {
  return (
    <NativeSelect
      defaultValue={defaultValue}
      {...register && register('houseType')}
    >
      <option value={HouseType.All}>{HouseType.All}</option>
      <option value={HouseType.SmallHouses}>{HouseType.SmallHouses}</option>
      <option value={HouseType.ApartmentBlocks}>{HouseType.ApartmentBlocks}</option>
    </NativeSelect>
  )
}
