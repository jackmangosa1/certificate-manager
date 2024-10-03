import { useState } from 'react';
import { ApiClient } from '../api/apiClient';

export const useParticipants = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const client = new ApiClient.Client(baseURL);

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

  const addParticipant = async (
    certificateId: number,
    participants: ApiClient.ParticipantDTO[],
  ) => {
    try {
      await client.addParticipantsToCertificate(certificateId, participants);
      setParticipants((prev) => [...prev, ...participants]);
    } catch (error) {
      console.error('Failed to add participants:', error);
      throw error;
    }
  };

  const removeParticipant = async (
    certificateId: number,
    participantId: number,
  ) => {
    try {
      await client.participants(certificateId, participantId);

      setParticipants((prev) =>
        prev.filter(
          (participant) => participant.participantId !== participantId,
        ),
      );
    } catch (error) {
      console.error('Failed to delete participant:', error);
      throw error;
    }
  };
  return {
    participants,
    searchParticipants,
    addParticipant,
    removeParticipant,
  };
};
