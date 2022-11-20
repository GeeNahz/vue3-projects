import { useBoardStore } from '~/stores/boardStore'
import { storeToRefs } from 'pinia'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, setDoc, getDoc, getDocs, doc, query, where, deleteDoc } from "firebase/firestore"
import { getStorage, ref, uploadString, getDownloadURL, getMetadata } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
// Initialize Cloud Firestore and get a reference to the service
const storage = getStorage(app)

export const saveFile = async (fullPath, file) => {
  // Create a storage reference from our storage service
  const storageRef = ref(storage, fullPath)
  const snapshot = await uploadString(storageRef, file, "data_url")

  if(snapshot) {
    const downloadUrl = await getDownloadURL(snapshot.ref)
    const metadata = await getMetadata(storageRef)
    return { snapshot, downloadUrl, metadata }
  }
}

export const uploadFile = async (file) => {
  return await new Promise(function (resolve, reject) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async (e) => {
      const result = reader.result

      const { snapshot, downloadUrl, metadata } = await saveFile(`images/${file.name}`, result)

      if(snapshot) {
        resolve({ snapshot, downloadUrl, metadata })
      } else {
        reject()
      }
    }
  })
}

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
