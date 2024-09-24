import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { getAllFeedbacks } from "../services/dbService";  // Assuming you have a function to fetch all feedbacks

const DownloadCSV = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const headers = [
    { label: "Sender", key: "sender" },
    { label: "Q1: Give specific, honest feedback on something that they could improve.", key: "q1" },
    { label: "Q2: Highlight something they did really well to boost their confidence.", key: "q2" },
    { label: "Q3: Offer advice on how they can build on their strengths.", key: "q3" },
    { label: "Recipient", key: "recipient" }
  ];

  useEffect(() => {
    // Fetch all feedbacks from Firestore
    async function fetchFeedbacks() {
      const feedbackData = await getAllFeedbacks();  // Assuming this fetches feedbacks from Firestore
      console.log(feedbackData);
      if (feedbackData) {
        // Sort feedbacks alphabetically by sender's name
        const sortedFeedbacks = feedbackData.sort((a, b) => 
          a.from.name.localeCompare(b.from.name)
        );
        setFeedbacks(sortedFeedbacks);
      }
    }

    fetchFeedbacks();
  }, []);

  // CSV headers

  // Prepare CSV data
  const csvData = feedbacks.map(feedback => ({
    sender: `${feedback.from.name} (${feedback.from.email})`,
    q1: feedback.questions?.q1?.answer || "",  // Assuming q1, q2, q3 are present in the feedback object
    q2: feedback.questions?.q2?.answer || "",
    q3: feedback.questions?.q3?.answer || "",
    recipient: `${feedback.to.name} (${feedback.to.email})`
  }));

  return (
    <div className="w-full text-center p-2 bg-black my-4 text-white">
      {feedbacks.length > 0 ? (
        <CSVLink 
          data={csvData} 
          headers={headers} 
          filename="feedbacks.csv"
          className="btn btn-primary"
        >
          Download CSV
        </CSVLink>
      ) : (
        <p>No feedbacks to download</p>
      )}
    </div>
  );
};

export default DownloadCSV;
