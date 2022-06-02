import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC4U1qpjIvhvCTXIGebNR3OBt9p3Q4QALY",
    authDomain: "work-hub-proj.firebaseapp.com",
    projectId: "work-hub-proj",
    storageBucket: "work-hub-proj.appspot.com",
    messagingSenderId: "1047397205106",
    appId: "1:1047397205106:web:2d5c87360f797ae7f12eeb"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// Set up timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }