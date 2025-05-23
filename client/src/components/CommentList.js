import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/commonHelper";

const CommentList = ({
  comments,
  paperId,
  handleEditComment,
  handleUpdateComment,
  editCommentId,
  editCommentText,
  handleEditCommentChange,
  handleDeleteComment,
}) => {
  const { userInfo } = useSelector((state) => state.authReducer);

  //

  const onEditClick = (comment) => {
    console.log(comment, " ccc");
    handleEditCommentChange(comment.text);
    handleEditComment(comment._id, comment.text);
  };

  const onSaveClick = (paperId, commentId) => {
    handleUpdateComment(paperId, commentId, editCommentText);
  };

  return (
    <div>
      {comments?.length ? (
        <ul>
          {comments?.map((comment) => {
            const { _id, text, commentedBy, createdAt, updatedAt } = comment;
            return (
              <li
                key={_id}
                style={{
                  marginBottom: "1em",
                  listStyleType: "none",
                  border: "1px solid green",
                  margin: "10px 0",
                }}
              >
                {editCommentId && editCommentId === _id ? (
                  <input
                    value={editCommentText}
                    onChange={(e) => handleEditCommentChange(e.target.value)}
                  />
                ) : (
                  <p>
                    <strong>Comment: </strong> {text}
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1em",
                    marginBottom: "0.5em",
                  }}
                >
                  <span>
                    <strong>By:</strong>{" "}
                    {userInfo?._id === commentedBy?._id
                      ? "You"
                      : commentedBy?.username}
                  </span>
                  <span>
                    <strong>On:</strong> {formatDate(createdAt)}
                  </span>
                  {updatedAt && (
                    <span>
                      <strong>Updated:</strong> {formatDate(updatedAt)}
                    </span>
                  )}

                  {userInfo?._id === commentedBy?._id && (
                    <>
                      {editCommentId === _id ? (
                        <button onClick={() => onSaveClick(paperId, _id)}>
                          SAVE
                        </button>
                      ) : (
                        <button onClick={() => onEditClick(comment)}>
                          UPDATE
                        </button>
                      )}
                      {/* <button onClick={() => console.log({ paperId, _id })}> */}
                      <button onClick={() => handleDeleteComment(paperId, _id)}>
                        DELETE
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <strong>No comments yet!!!</strong>
      )}
    </div>
  );
};

export default CommentList;
