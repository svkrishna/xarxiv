import React from "react";
import { useParams } from "react-router-dom";
import { useGetPaperDetailsByIdQuery } from "../../slices/paper/paperApiSlice";

const PaperDetails = () => {
  //misc
  const { paperId } = useParams();

  //queries n mutation
  const {
    data: paperDetails,
    error,
    isLoading,
  } = useGetPaperDetailsByIdQuery(paperId);

  console.log({ paperDetails });

  return (
    <div>
      <h1>Paper Details</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>An error occurred: {error.toString()}</p>}
      {paperDetails && paperDetails?.paper && (
        <div>
          <h3>{paperDetails?.paper?.title}</h3>
          <p>Abstract: {paperDetails?.paper?.abstract}</p>
          <p>Authors: {paperDetails?.paper?.authors.join(", ")}</p>
          <p>Status: {paperDetails?.paper?.status}</p>
          <iframe
            src={paperDetails?.paper?.paperFilePath}
            width="100%"
            height="600px"
            title="Paper Preview"
          />
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
