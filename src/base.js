import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = {} // FIREBASE API CONFIG OBJECT

const base = Rebase.createClass(firebaseApp.database())
firebase.auth().signInAnonymously()

// This is a named export
export { firebaseApp }

// this is a default export
export default base
