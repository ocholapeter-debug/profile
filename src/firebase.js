
// Import Firebase initialization function
import { initializeApp } from 'firebase/app';
// Import all authentication functions needed for email/password and Google signin
import { 
  getAuth,                          // Initialize Firebase Authentication
  createUserWithEmailAndPassword,   // Create new user with email and password
  signInWithEmailAndPassword,       // Sign in existing user with email and password
  signOut,                          // Sign out current user
  updateProfile,                    // Update user profile (name, photo, etc)
  GoogleAuthProvider,               // Google OAuth provider
  signInWithPopup,                  // Sign in using a popup window
  onAuthStateChanged                // Listen to authentication state changes
} from 'firebase/auth';

// Firebase configuration object from your Firebase project
// These credentials are provided by Firebase console
// apiKey: Public key for API requests
// authDomain: Domain for authentication
// projectId: Unique identifier for your Firebase project
// storageBucket: Cloud storage bucket
// messagingSenderId: For Cloud Messaging
// appId: Firebase App ID
// measurementId: For Google Analytics
const firebaseConfig = {
  apiKey: "AIzaSyBJAq7QZunDDH3wvwAcZ-UVe5V0RL0ImQw",
  authDomain: "choltech.firebaseapp.com",
  projectId: "choltech",
  storageBucket: "choltech.firebasestorage.app",
  messagingSenderId: "534603991476",
  appId: "1:534603991476:web:4596f850dc9db296714ae1",
  measurementId: "G-SWNR9PYP87"
};

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// This creates the auth object that will be used for all authentication operations
export const auth = getAuth(app);

// Create a Google Auth Provider instance
// This configures Google OAuth 2.0 for sign-in/sign-up
// GoogleAuthProvider handles the connection between your app and Google's OAuth service
export const googleProvider = new GoogleAuthProvider();

// Export all authentication functions so they can be used in other components
export {
  createUserWithEmailAndPassword,  // Used for: new user registration with email/password
  signInWithEmailAndPassword,      // Used for: existing user login with email/password
  signOut,                         // Used for: user logout
  updateProfile,                   // Used for: updating user display name, photo, etc
  signInWithPopup,                 // Used for: opening Google OAuth popup window
  onAuthStateChanged              // Used for: monitoring if user is logged in
};