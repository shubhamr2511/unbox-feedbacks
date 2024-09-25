import { db } from '../config/firebase_config'; // import your firebase config
import { collection, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, getDocs, increment, onSnapshot, Timestamp } from 'firebase/firestore';

// Set the constant eventId
const eventId = "event-for-single-event-app";

export const listenToEventDetails = async (callback) => {
  const eventDoc = doc(db, 'events', eventId);
  return onSnapshot(eventDoc, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = { id: eventDoc.id, ...docSnapshot.data() };
      callback(data);  // Pass the fb_sent value to the callback
    }
  });
};

// Get event details by id (eventId is constant)
export const getEventDetails = async () => {
  const eventDoc = doc(db, 'events', eventId);
  const eventSnapshot = await getDoc(eventDoc);
  return eventSnapshot.exists() ? eventSnapshot.data() : null;
};

export const updateParticipantCount = async (newCount) => {
  const eventDoc = doc(db, 'events', eventId);
  await updateDoc(eventDoc, { participantCount: increment(newCount) });
};

// Get participant details by id
export const getParticipantDetails = async (participantId) => {
  const participantDoc = doc(db, 'events', eventId, 'participants', participantId);
  const participantSnapshot = await getDoc(participantDoc);
  return participantSnapshot.exists() ? { id: participantId, ...participantSnapshot.data() } : null;
};

export const listenToParticipantDetails = async (participantId, callback) => {
  const participantDoc = doc(db, 'events', eventId, 'participants', participantId);
  return onSnapshot(participantDoc, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = { id: participantId, ...docSnapshot.data() };
      callback(data);  // Pass the fb_sent value to the callback
    }
  });
};

export const listenToSubmittedFeedback = (participantId, callback) => {
  try {
    const feedbackQuery = query(
      collection(db, 'events', eventId, 'feedbacks'),
      where('from.id', '==', participantId)
    );

    // Listen to feedback updates in real-time
    const unsubscribe = onSnapshot(feedbackQuery, (querySnapshot) => {
      const feedbacks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(feedbacks); // Pass the received feedbacks to the callback
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
  } catch (error) {
    console.error("Error listening to received feedback:", error);
  }
};

// Get all feedback submitted by a participant
export const getFeedbacksSubmitted = async (participantId) => {
  const feedbackQuery = query(
    collection(db, 'events', eventId, 'feedbacks'),
    where('from.id', '==', participantId)
  );
  const feedbackSnapshot = await getDocs(feedbackQuery);
  return feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};



export const listenToReceivedFeedback = (participantId, callback) => {
  try {
    const feedbackQuery = query(
      collection(db, 'events', eventId, 'feedbacks'),
      where('to.id', '==', participantId)
    );

    // Listen to feedback updates in real-time
    const unsubscribe = onSnapshot(feedbackQuery, (querySnapshot) => {
      const feedbacks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(feedbacks); // Pass the received feedbacks to the callback
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
  } catch (error) {
    console.error("Error listening to received feedback:", error);
  }
};
// Get all feedback received by a participant
export const getFeedbacksReceived = async (participantId) => {
  const feedbackQuery = query(
    collection(db, 'events', eventId, 'feedbacks'),
    where('to.id', '==', participantId)
  );
  const feedbackSnapshot = await getDocs(feedbackQuery);
  return feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add new participant
export const addParticipant = async (participantData) => {
  const participantsCollection = collection(db, 'events', eventId, 'participants');
  const participantDoc = await addDoc(participantsCollection, participantData);
  return { id: participantDoc.id, ...participantData };
};

// Add new feedback
export const addFeedback = async (fromParticipant, toParticipant, questions) => {
  try {
    const feedbackCollection = collection(db, 'events', eventId, 'feedbacks');
    const feedbackDoc = {
      from: {
        name: fromParticipant.name,
        id: fromParticipant.id
      },
      to: {
        name: toParticipant.name,
        id: toParticipant.id
      },
      questions: questions,
      // text: feedbackText,
      // feedbackText,
      time: Timestamp.now()
    };
    const fbDoc = await addDoc(feedbackCollection, feedbackDoc);
    return { id: fbDoc.id, ...feedbackDoc };
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateFeedbackDB = async (feedbackId, questions) => {
  try {
    const feedbackRef = doc(db, 'events', eventId, 'feedbacks', feedbackId);

    await updateDoc(feedbackRef, {
      questions: questions,
      time: Timestamp.now()
    });

    return true;
  } catch (error) {
    console.error('Error updating feedback:', error);
    return false;
  }
};

// Search participant by email
export const searchParticipantByEmail = async (email) => {
  const participantQuery = query(
    collection(db, 'events', eventId, 'participants'),
    where('email', '==', email)
  );
  const participantSnapshot = await getDocs(participantQuery);
  return participantSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const searchParticipantByCode = async (code) => {
  console.log(`Searching for ${code}`)
  const participantQuery = query(
    collection(db, 'events', eventId, 'participants'),
    where('code', '==', code)
  );
  const participantSnapshot = await getDocs(participantQuery);
  console.log(`${participantSnapshot.docs.length} Docs found.`)
  return participantSnapshot.docs.map(doc => {
    console.log(doc.data);
    return ({ id: doc.id, ...doc.data() });
  });
};


export const getLiveParticipants = (callback) => {
  const participantsRef = collection(db, 'events', eventId, 'participants'); // Reference to participants collection

  // Set up a real-time listener
  const unsubscribe = onSnapshot(participantsRef, (snapshot) => {
    const participants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(participants); // Send the participants' list to the callback
  });

  return unsubscribe; // Return the unsubscribe function to stop the listener when needed
};

// Get all participants
export const getAllParticipants = async () => {
  const participantsCollection = collection(db, 'events', eventId, 'participants');
  const participantSnapshot = await getDocs(participantsCollection);
  return participantSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllFeedbacks = async () => {
  try {
    const feedbacksCollection = collection(db, 'events',eventId, 'feedbacks');
    const feedbackSnapshot = await getDocs(feedbacksCollection);
    return feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching feedbacks: ", error);
    return null;
  }
};

// Delete feedback by id
export const deleteFeedback = async (feedbackId) => {
  const feedbackDoc = doc(db, 'events', eventId, 'feedbacks', feedbackId);
  await deleteDoc(feedbackDoc);
};

// Delete participant by id
export const deleteParticipant = async (participantId) => {
  const participantDoc = doc(db, 'events', eventId, 'participants', participantId);
  await deleteDoc(participantDoc);
};

// Update feedback received count
export const updateFeedbackReceivedCount = async (participantId, newCount) => {
  const participantDoc = doc(db, 'events', eventId, 'participants', participantId);
  await updateDoc(participantDoc, { fbReceived: increment(newCount) });

  console.log(`updateFeedbackReceivedCount ${participantId}`)
};

// Update feedback sent count
export const updateFeedbackSentCount = async (participantId, newCount) => {
  const participantDoc = doc(db, 'events', eventId, 'participants', participantId);
  await updateDoc(participantDoc, { fbSent: increment(newCount) });
  console.log(`updateFeedbackSentCount ${participantId}`)
};

// Set event status (ended or running)
export const setEventStatus = async (isEnded) => {
  const eventDoc = doc(db, 'events', eventId);
  await updateDoc(eventDoc, { isEnded: isEnded });
};

export function addParticipantsToFirestore(participants) {
  const participantsCollection = collection(db, 'events', eventId, 'participants');

  try {
    participants.forEach(async (participant) => {
      await addDoc(participantsCollection, participant);
      console.log("Document written with ID: ", participant.name);
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



// Function to get all feedbacks from Firestore
