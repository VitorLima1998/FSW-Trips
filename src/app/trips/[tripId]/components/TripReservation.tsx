'use client';
import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { Trip } from '@prisma/client';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface tripReservationProps {
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
}

interface tripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  maxGuests,
  tripStartDate,
  tripEndDate,
}: tripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<tripReservationForm>();

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  const startDate = watch('startDate');
  return (
    <div className='flex flex-col px-5 '>
      <div className='flex gap-4 '>
        <Controller
          name='startDate'
          rules={{
            required: {
              value: true,
              message: 'Data inicial é obrigatória.',
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholderText='Data de início'
              className='w-full'
              minDate={tripStartDate}
            />
          )}
        />

        <Controller
          name='endDate'
          rules={{
            required: {
              value: true,
              message: 'Data final é obrigatória.',
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholderText='Data Final'
              className='w-full'
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
            />
          )}
        />
      </div>

      <Input
        {...register('guests', {
          required: { value: true, message: 'Número de hóspedes obrigatório' },
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className='mt-4'
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className='flex justify-between mt-3'>
        <p className='font-medium text-sm text-primaryDarker'>Total: </p>
        <p className='font-medium text-sm text-primaryDarker'>R$ 2500 </p>
      </div>
      <div className='pb-10 border-b border-grayLighter w-full'>
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          variant='primary'
          className='mt-3 w-full'
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
