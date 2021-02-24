import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { onNewUser } from './firestore/onNewUser';
import { addEmails } from './routes/addEmails';
import { createEvent } from './routes/createEvent';
import { createUser } from './routes/createUser';
import { getEvent } from './routes/getEvent';
import { getUser } from './routes/getUser';
import { checkIfAuthenticated } from './utils/auth';

const app = express();
app.use(express.json());

app.use(cors({ origin: true }));

// Get events
app.get('/event/:eventId', checkIfAuthenticated, getEvent);
app.get('/user', checkIfAuthenticated, getUser);

// Post events
app.post('/event', checkIfAuthenticated, createEvent);
app.post('/event/add', checkIfAuthenticated, addEmails);
app.post('/createUser', createUser);

export const main = functions.region('europe-west1').https.onRequest(app);

export const createFirebaseUser = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(onNewUser);
