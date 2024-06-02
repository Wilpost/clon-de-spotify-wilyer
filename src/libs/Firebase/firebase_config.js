// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD4WcsgMsxjqGvtQSJg5yAs0Q53L7wZkaU',
  authDomain: 'spotify-clon-proyect.firebaseapp.com',
  projectId: 'spotify-clon-proyect',
  storageBucket: 'spotify-clon-proyect.appspot.com',
  messagingSenderId: '84615999000',
  appId: '1:84615999000:web:04dd74909b9c9fe9025d6d',
  measurementId: 'G-XS9W2L15B1'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
