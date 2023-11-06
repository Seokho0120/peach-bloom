// /utils/firebaseAdmin.ts
import admin from 'firebase-admin';
import serviceAccount from '../../../public/data/serviceAccountKey.json';

const serviceAccountKey = {
  projectId: serviceAccount.project_id,
  clientEmail: serviceAccount.client_email,
  privateKey: serviceAccount.private_key,
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export default admin;
