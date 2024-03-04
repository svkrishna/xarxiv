import React from "react";

const AddCommentComponent = ({
  commentTexts,
  paperId,
  handleAddComment,
  handleCommentChange,
}) => {
  return (
    <div>
      <div>
        <input
          type="text"
          value={commentTexts[paperId] || ""}
          onChange={(e) => handleCommentChange(paperId, e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={() => handleAddComment(paperId)}>Add Comment</button>
      </div>
    </div>
  );
};

export default AddCommentComponent;
