import { useState } from 'react';
import { ApiClient } from '../api/apiClient';

export const useComments = () => {
  const baseURL = process.env.REACT_APP_API_URL
  const [comments, setComments] = useState<ApiClient.CommentDTO[]>([]);

  const apiClient = new ApiClient.Client(baseURL);

  const addComment = async (
    certificateId: number,
    comment: ApiClient.CommentDTO,
  ) => {
    try {
      await apiClient.addCommentToCertificate(certificateId, comment);

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
