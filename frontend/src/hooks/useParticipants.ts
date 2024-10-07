import { useState } from 'react';
import { useApi } from './useApi';
import { ApiClient } from '../api/apiClient';

export const useParticipants = () => {
  const client = useApi();

  const [participants, setParticipants] = useState<ApiClient.ParticipantDTO[]>(
    [],
  );

  const searchParticipants = async (
    participantId: number | undefined,
    name: string | undefined,
    firstName: string | undefined,
    department: string | undefined,
    plant: string | undefined,
  ) => {
    try {
      const response = await client.participantsAll(
        participantId,
        name,
        firstName,
        department,
        plant,
      );
      setParticipants(response);
      return response;
    } catch (error) {
      console.error('Failed to search participants:', error);
      return [];
    }
  };

  return {
    participants,
    searchParticipants,
  };
};
