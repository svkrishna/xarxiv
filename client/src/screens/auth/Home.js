import React from "react";
import { useGetAllPapersQuery } from "../../slices/paper/paperApiSlice";

const Home = () => {
  const { data: papers, error, isLoading } = useGetAllPapersQuery();

  return (
    <div>
      <h1>Home</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching papers.</div>}
      {papers && (
        <div>
          <h2>All Papers</h2>
          <ul>
            {papers.data.map((paper, index) => (
              <li key={paper._id || index}>
                <h3>{paper.title}</h3>
                <p>Abstract: {paper.abstract}</p>
                <p>Authors: {paper.authors.join(", ")}</p>
                <p>Status: {paper.status}</p>
                <a
                  href={paper.paperFilePath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Paper
                </a>
                <p>Submitted By: {paper.submittedBy?.username}</p>
                <p>
                  Date Submitted:{" "}
                  {new Date(paper.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
