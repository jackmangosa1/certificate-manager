import { useState } from 'react';
import { Comment } from '../../types/types';
import './CommentSection.css';

type CommentSectionProps = {
  currentUserId: number;
  currentUserName: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({
  currentUserId,
  currentUserName,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleNewCommentClick = () => {
    setShowCommentInput(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        userId: currentUserId,
        userName: currentUserName,
        text: newComment.trim(),
        timestamp: new Date(),
      };
      setComments((prevComments) => [...prevComments, comment]);
      setNewComment('');
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
          New comment
        </button>
      </div>

      <div className="comments">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="comment"
          >
            <div className="user">
              <span>User:</span>
              <span>{comment.userName}</span>
            </div>

            <div className="comment-text">
              <span>Comment:</span>
              <span>{comment.text}</span>
            </div>
          </div>
        ))}
      </div>

      {showCommentInput && (
        <div className="comment-input">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Comment"
          />
          <button onClick={handleSendComment}>Send</button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
