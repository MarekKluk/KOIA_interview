import { useForm, FormProvider } from 'react-hook-form';
import { FormValues } from '../types/FormValues';
import { HouseType } from '../types/HouseType';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function FiltersFormProvider({ children }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: {houseType: HouseType.All, quarters: [0, 7]}
  });

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}
