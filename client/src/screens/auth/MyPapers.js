import React from "react";
import { useGetMyPapersQuery } from "../../slices/paper/paperApiSlice";

const MyPapers = () => {
  const { data: myPapers, isLoading, isError, error } = useGetMyPapersQuery();

  console.log({ myPapers });
  return (
    <div>
      <h1>My Papers</h1>
      <ul>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching papers.</div>}
        {myPapers &&
          myPapers.data.map((paper, index) => {
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
                <iframe
                  src={paperFilePath}
                  width="100%"
                  height="600px"
                  title="Paper Preview"
                />
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
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MyPapers;
