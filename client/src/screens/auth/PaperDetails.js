import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetPaperDetailsByIdQuery,
  useUpdatePaperStatusMutation,
} from "../../slices/paper/paperApiSlice";

const PaperDetails = () => {
  //misc
  const { paperId } = useParams();
  const { userInfo } = useSelector((state) => state.authReducer);
  const [updatePaperStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdatePaperStatusMutation();

  //queries n mutation
  const {
    data: paperDetails,
    error,
    isLoading,
  } = useGetPaperDetailsByIdQuery(paperId);

  //func
  const handleWithdraw = async () => {
    try {
      const result = await updatePaperStatus({
        id: paperId,
        body: { status: "withdrawn" },
      }).unwrap();
      console.log(result, "Paper status updated to withdrawn.");
    } catch (err) {
      console.error("Failed to update paper status:", err);
    }
  };

  return (
    <div>
      <h1 onClick={() => console.log({ userInfo, paperDetails })}>
        Paper Details
      </h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>An error occurred: {error.toString()}</p>}
      {paperDetails && paperDetails?.paper && (
        <div>
          <button onClick={() => handleWithdraw()}>withdrawn</button>
          <h3>{paperDetails?.paper?.title}</h3>
          <p>Abstract: {paperDetails?.paper?.abstract}</p>
          <p>Authors: {paperDetails?.paper?.authors.join(", ")}</p>
          <p>Status: {paperDetails?.paper?.status}</p>
          {/* <iframe
            src={paperDetails?.paper?.paperFilePath}
            width="100%"
            height="600px"
            title="Paper Preview"
          /> */}
          <p>Submitted By: {paperDetails?.paper?.submittedBy?.username}</p>
          <p>
            Date Submitted:{" "}
            {new Date(paperDetails?.paper?.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaperDetails;
