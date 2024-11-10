import { addFeedback, searchParticipantByCode, addParticipant, deleteFeedback, deleteParticipant, updateFeedbackDB, updateFeedbackReceivedCount, updateFeedbackSentCount, updateParticipantCount } from "../services/dbService";


export var DB = {

    loginParticipant: async (name, code) => {
        try {
            const existingParticipants = await searchParticipantByCode(code);
            

            if (existingParticipants.length > 0) {
                let participantDoc;
                // Participant exists
                participantDoc = existingParticipants[0];
                participantDoc = { id: participantDoc.id, ...participantDoc };
                return participantDoc;
            }

            return false;


        } catch (err) {
            console.error(err);
            return false;
        }


    },
    addParticipant: async (name, code) => {
        try {
            // const existingParticipants = await searchParticipantByCode(code);
            let participantDoc;

            // if (existingParticipants.length > 0) {
            //     // Participant exists
            //     return false;
            // } else {
                // Participant doesn't exist, add new participant
                const newParticipantData = {
                    name: name,
                    code: code,
                    fbReceived: 0,
                    fbSent: 0,
                };

                participantDoc = await addParticipant(newParticipantData);
                await updateParticipantCount(1);
                //   participantDoc = { id: participantDoc.id, ...newParticipantData }; // Merge ID with new participant data

            // }
            participantDoc = { id: participantDoc.id, ...participantDoc };
            return participantDoc;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    addNewFeedback: async (fromParticipant, toParticipant, feedbackText) => {
        try {

            const questions = {
                q1: {
                    question: "Give specific, honest feedback on something that they could improve.",
                    answer: feedbackText.q1,
                },
                q2: {
                    question: "Highlight something they did really well to boost their confidence.",
                    answer: feedbackText.q2,
                },
                q3: {
                    question: "Offer advice on how they can build on their strengths.",
                    answer: feedbackText.q3,
                },
            }

            const newFb = await addFeedback(fromParticipant, toParticipant, questions);

            updateFeedbackSentCount(fromParticipant.id, 1);;
            updateFeedbackReceivedCount(toParticipant.id, 1);

            return newFb;
        } catch (err) {
            console.error(err)
            return false;
        }
    },

    updateFeedback: async (feedbackId, feedbackText) => {
        try {

            const questions = {
                q1: {
                    question: "Give specific, honest feedback on something that they could improve.",
                    answer: feedbackText.q1,
                },
                q2: {
                    question: "Highlight something they did really well to boost their confidence.",
                    answer: feedbackText.q2,
                },
                q3: {
                    question: "Offer advice on how they can build on their strengths.",
                    answer: feedbackText.q3,
                },
            }

            const newFb = await updateFeedbackDB(feedbackId, questions);
            return newFb;
        } catch (err) {
            console.error(err)
            return false;
        }
    },

    deleteFeedback: async (feedback) => {
        try {

            await deleteFeedback(feedback.id);

            updateFeedbackSentCount(feedback.from.id, -1);;
            updateFeedbackReceivedCount(feedback.to.id, -1);

            return true;
        } catch (err) {
            console.error(err)
            return false;
        }
    },

    deleteParticipant: async (participantId) => {
        await deleteParticipant(participantId);
        await updateParticipantCount(-1);
    }
}

export function formatTime(timestamp) {
    const date = timestamp.toDate(); // Convert Firestore Timestamp to JS Date
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    
    return date.toLocaleString('en-US', options).replace(',', '');
  }

