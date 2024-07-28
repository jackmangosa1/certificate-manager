import { useState } from 'react';
import { Participant } from '@/types/types';
import {
  addParticipant as addParticipantToDB,
  getParticipants,
  updateParticipant as updateParticipantInDB,
  deleteParticipant as deleteParticipantInDB,
  initializeDatabase,
  searchParticipants as searchParticipantsInDB,
} from '../utils/indexed-db/indexedDb';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const initializeAndFetchParticipants = async () => {
    try {
      await initializeDatabase();
      const fetchedParticipants = await getParticipants();
      setParticipants(fetchedParticipants);
      return fetchedParticipants;
    } catch (error) {
      console.error('Failed to initialize and fetch participants:', error);
      return [];
    }
  };

  const addParticipant = async (participant: Omit<Participant, 'id'>) => {
    try {
      const id = await addParticipantToDB(participant);
      setParticipants((prev) => [...prev, { id, ...participant }]);
      return id;
    } catch (error) {
      console.error('Failed to add participant:', error);
      throw error;
    }
  };

  const updateParticipant = async (
    id: number,
    updatedParticipant: Omit<Participant, 'id'>,
  ) => {
    try {
      await updateParticipantInDB(id, updatedParticipant);
      setParticipants((prev) =>
        prev.map((participant) =>
          participant.id === id ? { id, ...updatedParticipant } : participant,
        ),
      );
    } catch (error) {
      console.error('Failed to update participant:', error);
      throw error;
    }
  };

  const deleteParticipant = async (id: number) => {
    try {
      await deleteParticipantInDB(id);
      setParticipants((prev) =>
        prev.filter((participant) => participant.id !== id),
      );
    } catch (error) {
      console.error('Failed to delete participant:', error);
      throw error;
    }
  };

  const searchParticipants = async (criteria: Partial<Participant>) => {
    try {
      const results = await searchParticipantsInDB(criteria);
      return results;
    } catch (error) {
      console.error('Failed to search participants:', error);
      throw error;
    }
  };

  const refreshParticipants = async () => {
    try {
      const fetchedParticipants = await getParticipants();
      setParticipants(fetchedParticipants);
      return fetchedParticipants;
    } catch (error) {
      console.error('Failed to refresh participants:', error);
      return [];
    }
  };

  return {
    participants,
    addParticipant,
    updateParticipant,
    deleteParticipant,
    searchParticipants,
    refreshParticipants,
    initializeAndFetchParticipants,
  };
};
