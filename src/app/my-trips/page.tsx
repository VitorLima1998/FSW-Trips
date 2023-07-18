'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Prisma, TripReservation } from '@prisma/client';
import UserReservationItem from './components/UserReservationItem';
import Button from '@/components/Button';
import Link from 'next/link';

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();

  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(
      `/api/user/${(data?.user as any)?.id}/reservations`
    );

    const json = await response.json();

    setReservations(json);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/');
    }

    fetchReservations();
  }, [status]);

  console.log(reservations);

  return (
    <div className='container mx-auto p-5'>
      <h1 className='font-semibold text-primaryDarker text-xl'>
        Minhas Viagens
      </h1>
      {reservations.length > 0 ? (
        reservations?.map((reservation) => (
          <UserReservationItem
            fetchReservations={fetchReservations}
            reservation={reservation}
            key={reservation.id}
          />
        ))
      ) : (
        <div className='flex flex-col'>
          <p className='font-medium text-primaryDarker mt-2'>
            Você ainda não tem nenhuma reserva! 🙁
          </p>
          <Link href='/'>
            <Button className='w-full mt-2' variant='primary'>
              Fazer Reserva
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
