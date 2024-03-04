import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetPaperDetailsByIdQuery,
  useUpdatePaperStatusMutation,
} from "../../slices/paper/paperApiSlice";

const PaperDetails = () => {
  //misc
  const selectableStatuses = ["under review", "accepted", "rejected"];
  const { paperId } = useParams();
  const { userInfo } = useSelector((state) => state.authReducer);
  const [updatePaperStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdatePaperStatusMutation();

  //queries n mutation
  const {
    data: paperDetails,
    error,
    isLoading,
    refetch: refetchPaperDetails,
  } = useGetPaperDetailsByIdQuery(paperId);

  //func
  const handleWithdraw = async () => {
    try {
      const result = await updatePaperStatus({
        id: paperId,
        body: { status: "withdrawn" },
      }).unwrap();
      refetchPaperDetails();
      console.log(result, "Paper status updated to withdrawn.");
    } catch (err) {
      console.error("Failed to update paper status:", err);
    }
  };

  const handleStatus = async (status) => {
    try {
      const result = await updatePaperStatus({
        id: paperId,
        body: { status },
      }).unwrap();
      refetchPaperDetails();
      console.log(result, `Paper status updated to ${status}.`);
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
          {userInfo?._id === paperDetails?.paper?.submittedBy._id &&
            paperDetails?.paper?.status !== "withdrawn" && (
              <button onClick={() => handleWithdraw()}>withdrawn</button>
            )}

          {userInfo?.role === "admin" && (
            <select
              value={paperDetails?.paper?.status}
              onChange={(e) => handleStatus(e.target.value)}
              disabled={isUpdating}
            >
              {selectableStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          )}

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
