import React, { useState, useEffect } from 'react';
import './CommentSection.css';
import { useComments } from '../../hooks/useComments';
import { ApiClient } from '../../api/apiClient';

export type Comment = {
  commentId: number;
  username: string;
  commentText: string;
};

type CommentSectionProps = {
  certificateId: number;
  currentUserName: string | undefined;
  initialComments: ApiClient.CommentDTO[];
  onCommentsChange: (newComments: ApiClient.CommentDTO[]) => void;
};

const CommentSection: React.FC<CommentSectionProps> = ({
  certificateId,
  currentUserName,
  initialComments,
  onCommentsChange,
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState<ApiClient.CommentDTO[]>(initialComments);
  const { addComment } = useComments();

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleNewCommentClick = () => {
    setShowCommentInput(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(e.target.value);
  };

  const handleSendComment = async () => {
    if (newCommentText.trim()) {
      const newCommentDTO = ApiClient.CommentDTO.fromJS({
        commentId: undefined, 
        username: currentUserName,
        commentText: newCommentText.trim(),
      });
  
      try {
        await addComment(certificateId, newCommentDTO);
        const updatedComments = [...comments, newCommentDTO];
        setComments(updatedComments);
        onCommentsChange(updatedComments);
        setNewCommentText('');
        setShowCommentInput(false);
      } catch (error) {
        console.error('Failed to send comment:', error);
      }
    }
  };
  

  return (
    <div className="comment-section">
      <div className="comment-section-header">
        <button
          className="comment-btn"
          onClick={handleNewCommentClick}
        >
          New comment
        </button>
      </div>

      {comments.map((comment) => (
        <div
          key={comment.commentId}
          className="comment"
        >
          <div className="user-info">User: {comment.username}</div>
          <div className="comment-text">Comment: {comment.commentText}</div>
        </div>
      ))}

      {showCommentInput && (
        <div className="comment-input">
          <textarea
            value={newCommentText}
            onChange={handleCommentChange}
            placeholder="Type your comment here..."
          />
          <button
            onClick={handleSendComment}
            disabled={!newCommentText.trim()}
            className={!newCommentText.trim() ? 'disabled' : ''}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
