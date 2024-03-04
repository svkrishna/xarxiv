import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/commonHelper";

const CommentList = ({ comments }) => {
  //misc
  const { userInfo } = useSelector((state) => state.authReducer);

  return (
    <div>
      {comments?.length ? (
        <ul>
          {comments?.map((comment) => {
            const { _id, text, commentedBy, createdAt, updatedAt } = comment;
            return (
              <li key={_id}>
                <p>
                  <strong>Comment: </strong> {text}
                </p>
                <p>
                  <strong>Commented By:</strong>{" "}
                  {userInfo?._id === commentedBy?._id
                    ? "You"
                    : commentedBy?.username}
                </p>
                <p>
                  <strong>Commented On:</strong> {formatDate(createdAt)}
                </p>
                {updatedAt && (
                  <p>
                    <strong>Last Updated:</strong> {formatDate(updatedAt)}
                  </p>
                )}
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
