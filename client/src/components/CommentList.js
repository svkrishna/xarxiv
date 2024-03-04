import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/commonHelper";

const CommentList = ({ comments }) => {
  const { userInfo } = useSelector((state) => state.authReducer);

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
                <p>
                  <strong>Comment: </strong> {text}
                </p>
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
                    <button>UPDATE</button>
                  )}
                  {userInfo?._id === commentedBy?._id && (
                    <button>DELETE</button>
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
