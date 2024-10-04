import { useState } from 'react';
import { useApi } from './useApi';
import { ApiClient } from '../api/apiClient';

export const useComments = () => {
  const client = useApi();
  const [comments, setComments] = useState<ApiClient.CommentDTO[]>([]);

  const addComment = async (
    certificateId: number,
    comment: ApiClient.CommentDTO,
  ) => {
    try {
      await client.addCommentToCertificate(certificateId, comment);
      setComments((prev) => [...prev, comment]);
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
