import { db } from '../config/firebase_config'; // import your firebase config
import { collection, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, getDocs, increment, onSnapshot, Timestamp, setDoc } from 'firebase/firestore';

// Set the constant id
let dbEventId = "event-for-single-event-app";

export const setEventId = async (id) => {
  dbEventId = id;
}

export const listenToEventDetails = async (callback, id=dbEventId) => {
  const eventDoc = doc(db, 'events', id);
  return onSnapshot(eventDoc, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = { id: eventDoc.id, ...docSnapshot.data() };
      callback(data); 
    } else {
      callback(null);
    }
  });
};

export function listenToEvents(callback) {
  const eventsRef = collection(db, "events");

  const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(events);
  }, (error) => {
    console.error("Error fetching real-time events:", error);
  });

  return unsubscribe; // Call this function to stop listening
}

export async function addEvent(eventData) {
  try {
    // Reference to the event document with a specific ID in the 'events' collection
    const eventRef = doc(db, "events", eventData.id);
    
    // Set the document with the provided event data
    await setDoc(eventRef, eventData);
    
    // Return the data as confirmation
    return eventData;
  } catch (error) {
    console.error("Error adding event:", error);
    return null;
  }
}

export const deleteEvent = async (id) => {
  const eventDoc = doc(db, 'events', id);
  await deleteDoc(eventDoc);
};

// Get event details by id (eventId is constant)
export const getEventDetails = async (id=dbEventId) => {
  const eventDoc = doc(db, 'events', id);
  const eventSnapshot = await getDoc(eventDoc);
  return eventSnapshot.exists() ? eventSnapshot.data() : null;
};

export const updateParticipantCount = async (newCount, id=dbEventId) => {
  const eventDoc = doc(db, 'events', id);
  await updateDoc(eventDoc, { participantCount: increment(newCount) });
};

// Get participant details by id
export const getParticipantDetails = async (participantId, id=dbEventId) => {
  const participantDoc = doc(db, 'events', id, 'participants', participantId);
  const participantSnapshot = await getDoc(participantDoc);
  return participantSnapshot.exists() ? { id: participantId, ...participantSnapshot.data() } : null;
};

export const listenToParticipantDetails = async (participantId, callback, id=dbEventId) => {
  const participantDoc = doc(db, 'events', id, 'participants', participantId);
  return onSnapshot(participantDoc, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = { id: participantId, ...docSnapshot.data() };
      callback(data);  // Pass the fb_sent value to the callback
    }
  });
};

export const listenToSubmittedFeedback = (participantId, callback, id=dbEventId) => {
  try {
    const feedbackQuery = query(
      collection(db, 'events', id, 'feedbacks'),
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
export const getFeedbacksSubmitted = async (participantId, id=dbEventId) => {
  const feedbackQuery = query(
    collection(db, 'events', id, 'feedbacks'),
    where('from.id', '==', participantId)
  );
  const feedbackSnapshot = await getDocs(feedbackQuery);
  return feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};



export const listenToReceivedFeedback = (participantId, callback, id=dbEventId) => {
  try {
    const feedbackQuery = query(
      collection(db, 'events', id, 'feedbacks'),
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
export const getFeedbacksReceived = async (participantId, id=dbEventId) => {
  const feedbackQuery = query(
    collection(db, 'events', id, 'feedbacks'),
    where('to.id', '==', participantId)
  );
  const feedbackSnapshot = await getDocs(feedbackQuery);
  return feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add new participant
export const addParticipant = async (participantData, id=dbEventId) => {
  const participantsCollection = collection(db, 'events', id, 'participants');
  const participantDoc = await addDoc(participantsCollection, participantData);
  return { id: participantDoc.id, ...participantData };
};

// Add new feedback
export const addFeedback = async (fromParticipant, toParticipant, questions, id=dbEventId) => {
  try {
    const feedbackCollection = collection(db, 'events', id, 'feedbacks');
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

export const updateFeedbackDB = async (feedbackId, questions, id=dbEventId) => {
  try {
    const feedbackRef = doc(db, 'events', id, 'feedbacks', feedbackId);

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
export const searchParticipantByEmail = async (email, id=dbEventId) => {
  const participantQuery = query(
    collection(db, 'events', id, 'participants'),
    where('email', '==', email)
  );
  const participantSnapshot = await getDocs(participantQuery);
  return participantSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const searchParticipantByCode = async (code, id=dbEventId) => {
  console.log(`Searching for ${code}`)
  const participantQuery = query(
    collection(db, 'events', id, 'participants'),
    where('code', '==', code)
  );
  const participantSnapshot = await getDocs(participantQuery);
  console.log(`${participantSnapshot.docs.length} Docs found.`)
  return participantSnapshot.docs.map(doc => {
    console.log(doc.data);
    return ({ id: doc.id, ...doc.data() });
  });
};


export const getLiveParticipants = (callback, id=dbEventId) => {
  const participantsRef = collection(db, 'events', id, 'participants'); // Reference to participants collection

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

export const getLiveFeedbacks = (callback, id=dbEventId) => {
  const feedbacksCollection = collection(db, 'events',id, 'feedbacks');
  // Set up a real-time listener
  const unsubscribe = onSnapshot(feedbacksCollection, (snapshot) => {
    const feedbacks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(feedbacks); // Send the participants' list to the callback
  });

  return unsubscribe; // Return the unsubscribe function to stop the listener when needed
};

// Get all participants
export const getAllParticipants = async ( id=dbEventId) => {
  const participantsCollection = collection(db, 'events', id, 'participants');
  const participantSnapshot = await getDocs(participantsCollection);
  return participantSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllFeedbacks = async ( id=dbEventId) => {
  try {
    const feedbacksCollection = collection(db, 'events',id, 'feedbacks');
    const feedbackSnapshot = await getDocs(feedbacksCollection);
    return feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching feedbacks: ", error);
    return null;
  }
};

// Delete feedback by id
export const deleteFeedback = async (feedbackId, id=dbEventId) => {
  const feedbackDoc = doc(db, 'events', id, 'feedbacks', feedbackId);
  await deleteDoc(feedbackDoc);
};

// Delete participant by id
export const deleteParticipant = async (participantId, id=dbEventId) => {
  const participantDoc = doc(db, 'events', id, 'participants', participantId);
  await deleteDoc(participantDoc);
};

// Update feedback received count
export const updateFeedbackReceivedCount = async (participantId, newCount, id=dbEventId) => {
  const participantDoc = doc(db, 'events', id, 'participants', participantId);
  await updateDoc(participantDoc, { fbReceived: increment(newCount) });

  console.log(`updateFeedbackReceivedCount ${participantId}`)
};

// Update feedback sent count
export const updateFeedbackSentCount = async (participantId, newCount, id=dbEventId) => {
  const participantDoc = doc(db, 'events', id, 'participants', participantId);
  await updateDoc(participantDoc, { fbSent: increment(newCount) });
  console.log(`updateFeedbackSentCount ${participantId}`)
};

// Set event status (ended or running)
export const setEventStatus = async (isEnded, id=dbEventId) => {
  const eventDoc = doc(db, 'events', id);
  await updateDoc(eventDoc, { isEnded: isEnded });
};

export function addParticipantsToFirestore(participants, id=dbEventId) {
  const participantsCollection = collection(db, 'events', id, 'participants');

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
