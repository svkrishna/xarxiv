import React, { useEffect, useState } from "react";
import {
  useGetMyPapersQuery,
  useSubmitPaperMutation,
} from "../../slices/paper/paperApiSlice";

const Home = () => {
  const [submitPaper, { isLoading }] = useSubmitPaperMutation();
  const { data: myPapers, isLoading: isLoadingPapers } = useGetMyPapersQuery();

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [abstract, setAbstract] = useState("");
  const [paperFile, setPaperFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("authors", authors);
    formData.append("abstract", abstract);
    if (paperFile) {
      formData.append("paperFile", paperFile);
    }

    try {
      await submitPaper(formData).unwrap();
      console.log("submitted");
    } catch (error) {
      console.error("Failed to submit the paper: ", error);
    }
  };

  useEffect(() => {
    console.log({ myPapers }, " myyyyyyyyyyyyyyyyyy");
  }, [myPapers]);

  return (
    <div>
      <h1>Submit Your Paper</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Authors:</label>
          <input
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Abstract:</label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Paper File:</label>
          <input
            type="file"
            onChange={(e) => setPaperFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
