import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAZs-BfYZv3sLou5UnC3kuWx_uohLssQWg',
  authDomain: 'buzzer-quiz.firebaseapp.com',
  databaseURL: 'https://buzzer-quiz.firebaseio.com',
  projectId: 'buzzer-quiz',
  storageBucket: 'buzzer-quiz.appspot.com',
  messagingSenderId: '179847450526',
  appId: '1:179847450526:web:78320e90d1d94705edd08f'
})

const base = Rebase.createClass(firebaseApp.database())
firebase.auth().signInAnonymously()

// This is a named export
export { firebaseApp }

// this is a default export
export default base
