import { useState } from "react";

export default function Feedback() {
  const [inputFields, setInputFields] = useState({ email: "", feedback: "" });

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
    return await response.json();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(inputFields);

    const result = addFeedback();
    console.log(await result);
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
    </>
  );
}
