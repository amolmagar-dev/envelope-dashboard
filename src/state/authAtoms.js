// src/state/authAtoms.js
import { atom } from 'jotai';

// Atom to track authentication mode (SignIn or SignUp)
export const authModeAtom = atom('signin');

// Atom to store user information after authentication
export const userAtom = atom(null);