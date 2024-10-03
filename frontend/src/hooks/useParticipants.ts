import { useState } from 'react';
import axios from 'axios';
import { Participant } from '../types/types';
import {
  certificatesEndpoint,
  participantEndpoint,
} from '../endpoints/endpoints';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const searchParticipants = async (criteria: Partial<Participant>) => {
    try {
      const response = await axios.get(participantEndpoint, {
        params: criteria,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search participants:', error);
      return [];
    }
  };

  const addParticipant = async (
    certificateId: number,
    participants: Participant[],
  ) => {
    try {
      const response = await axios.post(
        `${certificatesEndpoint}/${certificateId}/participants`,
        participants,
      );
      setParticipants((prev) => [...prev, ...response.data]);
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
      await axios.delete(
        `${certificatesEndpoint}/${certificateId}/participants/${participantId}`,
      );
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
