import React, { useState } from "react";
import {
  useAddCommentToPaperMutation,
  useDeleteCommentMutation,
  useGetAllPapersQuery,
  useUpdateCommentMutation,
} from "../../slices/paper/paperApiSlice";
import AddCommentComponent from "../../components/AddCommentComponent";
import CommentList from "../../components/CommentList";

const Home = () => {
  //state
  const [commentTexts, setCommentTexts] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  //queries n mutation
  const {
    data: papers,
    error,
    isLoading,
    refetch: refetchPapers,
  } = useGetAllPapersQuery();
  const [addCommentToPaper] = useAddCommentToPaperMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  //func
  const handleCommentChange = (paperId, text) => {
    setCommentTexts({ [paperId]: text });
  };

  const handleAddComment = async (paperId) => {
    if (commentTexts[paperId]) {
      try {
        const result = await addCommentToPaper({
          id: paperId,
          data: { text: commentTexts[paperId] },
        }).unwrap();
        console.log(result, "Comment added successfully");
        handleCommentChange({});
        refetchPapers();
      } catch (error) {
        console.error("Failed to add comment", error);
      }
    }
  };

  const handleEditCommentChange = (text) => {
    setEditCommentText(text);
  };

  const handleUpdateComment = async (paperId) => {
    if (editCommentId && editCommentText) {
      try {
        const result = await updateComment({
          paperId,
          commentId: editCommentId,
          data: { text: editCommentText },
        }).unwrap();
        console.log(result, "Comment updated successfully");
        // Reset editing state
        setEditCommentId(null);
        setEditCommentText("");
        refetchPapers();
      } catch (error) {
        console.error("Failed to update comment", error);
      }
    }
  };

  const handleEditComment = (commentId, text) => {
    setEditCommentId(commentId);
    setEditCommentText(text);
  };

  const handleDeleteComment = async (paperId, commentId) => {
    try {
      const result = await deleteComment({
        paperId,
        commentId,
      }).unwrap();
      console.log(result, "Comment deleted successfully");
      refetchPapers();
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching papers.</div>}
      {papers && (
        <div>
          <h2
            onClick={() =>
              console.log({
                editCommentId,
                editCommentText,
              })
            }
          >
            All Papers
          </h2>
          <ul>
            {papers.data.map((paper, index) => {
              const {
                _id: paperId,
                title,
                abstract,
                authors,
                status,
                paperFilePath,
                submittedBy,
                createdAt,
                comments,
              } = paper;
              return (
                <li
                  key={paperId}
                  style={{
                    border: "1px solid red",
                  }}
                >
                  <h3>{title}</h3>
                  <p>Abstract: {abstract}</p>
                  <p>Authors: {authors.join(", ")}</p>
                  <p>Status: {status}</p>
                  {/* <iframe
                  src={paperFilePath}
                  width="100%"
                  height="600px"
                  title="Paper Preview"
                /> */}
                  <a
                    href={paperFilePath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Paper
                  </a>
                  <p>Submitted By: {submittedBy?.username}</p>
                  <p>
                    Date Submitted: {new Date(createdAt).toLocaleDateString()}
                  </p>
                  <AddCommentComponent
                    commentTexts={commentTexts}
                    paperId={paperId}
                    handleAddComment={handleAddComment}
                    handleCommentChange={handleCommentChange}
                  />

                  {/* <CommentList comments={comments} /> */}

                  <CommentList
                    comments={comments}
                    paperId={paperId}
                    handleEditComment={handleEditComment}
                    handleUpdateComment={handleUpdateComment}
                    editCommentId={editCommentId}
                    editCommentText={editCommentText}
                    handleEditCommentChange={handleEditCommentChange}
                    handleDeleteComment={handleDeleteComment}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
