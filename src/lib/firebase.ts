import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB5aBqE6xHXUkoACGs9LU5i0D1BGeKsnk0',
  authDomain: 'codeway-be-a7634.firebaseapp.com',
  projectId: 'codeway-be-a7634',
  storageBucket: 'codeway-be-a7634.firebasestorage.app',
  messagingSenderId: '862781738719',
  appId: '1:862781738719:web:4fda9ec1d0465d040de36a',
  measurementId: 'G-1F9MZQDGGF'
}

const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig)
  getAuth(app)
}

initializeFirebase()
