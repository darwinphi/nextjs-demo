import { useState, useEffect } from "react";
import { buildFeedbackPath, extractFeedback } from "./api/feedback";

export default function Feedback({ feedbackData }) {
  const [inputFields, setInputFields] = useState({ email: "", feedback: "" });
  const [feedbacks, setFeedbacks] = useState(feedbackData);

  const addFeedback = async () => {
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: inputFields.email,
        feedback: inputFields.feedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setFeedbacks([...feedbacks, result.feedback]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    addFeedback();
  };

  const handleInputChange = (event) => {
    setInputFields({ ...inputFields, [event.target.name]: event.target.value });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputFields.email}
            onChange={(event) => handleInputChange(event)}
          />
          <input
            type="text"
            name="feedback"
            placeholder="Feedback"
            value={inputFields.feedback}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <button>Send</button>
      </form>
      <hr />
      <h1>Feedbacks</h1>
      {feedbacks &&
        feedbacks.map((feedback) => {
          return (
            <div key={feedback.id}>
              <p>{feedback.email}</p>
              <h2>{feedback.feedback}</h2>
            </div>
          );
        })}
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackData: data,
    },
    revalidate: 5,
  };
}
