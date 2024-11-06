// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_DaXxNM7jLGK0qxyNKhiY5TsZ10jqq3k",
  authDomain: "laboratoria-40ada.firebaseapp.com",
  databaseURL: "https://laboratoria-40ada-default-rtdb.firebaseio.com",
  projectId: "laboratoria-40ada",
  storageBucket: "laboratoria-40ada.firebasestorage.app",
  messagingSenderId: "122380954935",
  appId: "1:122380954935:web:aa522aa5169bb708adfeb2"
};

let app;
let db;
let auth;
let storage;

export function initializeFirebase() {
  if (!app) {
    try{
      app = initializeApp(firebaseConfig);
      db = getDatabase(app);
      auth = getAuth(app);
      storage = getStorage(app);
    }
     catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }
  return { app, db, auth };
}

export function getFirebaseDb() {
  if (!db) {
    initializeFirebase();
  }
  return db;
}

export function getFirebaseAuth() {
  if (!auth) {
    initializeFirebase();
  }
  return auth;
}

export function GetFirebaseStorage() {
  if (!storage) {
    storage = getStorage(app);
  }
  return storage;
}