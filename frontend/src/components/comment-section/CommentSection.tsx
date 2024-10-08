import React, { useState, useEffect } from 'react';
import './CommentSection.css';
import { ApiClient } from '../../api/apiClient';
import { useLanguage } from '../../hooks/useLanguage';

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
  currentUserName,
  initialComments,
  onCommentsChange,
}) => {
  const { translations } = useLanguage();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] =
    useState<ApiClient.CommentDTO[]>(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleNewCommentClick = () => {
    if (showCommentInput) {
      setNewCommentText('');
    }
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(e.target.value);
  };

  const handleSendComment = () => {
    if (newCommentText.trim() && currentUserName) {
      const newCommentDTO = new ApiClient.CommentDTO({
        commentText: newCommentText.trim(),
        username: currentUserName,
      });

      const updatedComments = [...comments, newCommentDTO];
      setComments(updatedComments);
      onCommentsChange(updatedComments);
      setNewCommentText('');
      setShowCommentInput(false);
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-section-header">
        <button
          className="comment-btn"
          onClick={handleNewCommentClick}
        >
          {showCommentInput ? translations.cancel : translations.newComment}
        </button>
      </div>

      {comments.map((comment, index) => (
        <div
          key={comment.commentId || `temp-${index}`}
          className="comment"
        >
          <div className="user-info">
            {`${translations.user}:`} {comment.username}
          </div>
          <div className="comment-text">
            {`${translations.comment}:`} {comment.commentText}
          </div>
        </div>
      ))}

      {showCommentInput && (
        <div className="comment-input">
          <textarea
            value={newCommentText}
            onChange={handleCommentChange}
            placeholder={`${translations.commentPlaceHolder}...`}
          />
          <button
            onClick={handleSendComment}
            disabled={!newCommentText.trim()}
            className={!newCommentText.trim() ? 'disabled' : ''}
          >
            {translations.add}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
