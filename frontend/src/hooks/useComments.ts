import { useState } from 'react';
import axios from 'axios';
import { Comment } from '../types/types';
import { certificatesEndpoint } from '../endpoints/endpoints';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = async (certificateId: number, comment: Comment) => {
    try {
      const response = await axios.post(
        `${certificatesEndpoint}/${certificateId}/comments`,
        comment,
      );

      const newComment: Comment = response.data;
      setComments((prev) => [...prev, newComment]);
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    }
  };

  return {
    comments,
    addComment,
  };
};
