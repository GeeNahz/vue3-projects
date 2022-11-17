import { useBoardStore } from '~/stores/boardStore'
import { storeToRefs } from 'pinia'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, addDoc, setDoc, getDoc, getDocs, doc, query, where, deleteDoc, onSnapshot } from "firebase/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBveNXuYFZYyxbLEcWiJHgcz44a8p3TWIQ',
  authDomain: 'project-management-storage.firebaseapp.com',
  projectId: 'project-management-storage',
  storageBucket: 'project-management-storage.appspot.com',
  messagingSenderId: '155377243525',
  appId: '1:155377243525:web:8f30b539d3eb0f5584e0ec'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)





export const readDoc = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id)
    const querySnapshot = await getDoc(docRef)

    console.log(querySnapshot.data())
    return querySnapshot.data()
  } catch (error) {
    console.log(error)
    return error
  }
}



// export const tasksSnapShot = () => {
//   // store reference
//   const store = useBoardStore()
//   const { tasks } = storeToRefs(store)
  
//   const colRef = collection(db, 'tasks')
//   let tasksList = new Array()
//   onSnapshot(colRef, querySnapshot => {
//     querySnapshot.forEach(doc => {
//       tasksList.push({
//         id: doc.id,
//         ...doc.data()
//       })
//     })

//     tasks.value = tasksList
//   })

//   return tasksList
// }

// export const boardsSnapShot = () => {
//   // store reference
//   const store = useBoardStore()
//   const { boards } = storeToRefs(store)
  
//   const colRef = collection(db, 'boards')
//   let boardsList = new Array()
//   onSnapshot(colRef, querySnapshot => {
//     querySnapshot.forEach(doc => {
//       boardsList.push({
//         ...doc.data(),
//         id: doc.id
//       })
//     })

//     boards.value = boardsList
//   })

//   return boardsList
// }

export const saveDoc = async (collectionName, data) => {
  const colRef = collection(db, collectionName)
  const docRef = doc(colRef, data.id)
  try {
    await setDoc(docRef, data)
    console.log("Document written with ID: ", data.id)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const updateDoc = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id)
  const docToUpdate = await getDoc(docRef)

  // when you're done with setting up the whole system, attempt using try-catch for the below if-else statement
  if (docToUpdate.exists()) {
    await setDoc(docRef, data, { merge: true })
    return data.id
  } else {
    console.log('No item found for the id provided')
  }
}

export const getSingleDocById = async (collectionName, id) => {
  const docItems = []
  const q = query(collection(db, collectionName), where('id', '==', id))

  const querySnapshots = await getDocs(q)
  querySnapshots.forEach(doc => docItems.push({
    ...doc.data()
  }))

  return docItems
}

export const getMultipleDocsByKeyValue = async (collectionName, key, value) => {
  const docItems = []
  const q = query(collection(db, collectionName), where(`${key}`, '==', `${value}`))

  const querySnapshots = await getDocs(q)
  querySnapshots.forEach(doc => docItems.push({
    ...doc.data(),
    id: doc.id
  }))

  if (docItems.length !== 0) {
    console.log(docItems)
    return docItems
  } else {
    console.log('No item found for the query field provided')
    return
  }
}

export const getAllDocs = async (collectionName) => {
  const colRef = collection(db, collectionName)
  try {
    const docItems = []
    const querySnapshots = await getDocs(colRef)
    querySnapshots.forEach(doc => docItems.push({
      ...doc.data()
    }))
    return docItems
  } catch (error) {
    console.log(error)
    return error
  }
}

export const delDoc = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.log('No item found for the query field provided')
    console.log(error)
  }
}
