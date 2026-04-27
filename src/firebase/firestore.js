import { db } from './config';
import {
    collection, doc, addDoc, updateDoc,
    deleteDoc, getDocs, onSnapshot
} from 'firebase/firestore';

// ── Platos ──────────────────────────────────────────
export const getPlates = (callback) => {
    return onSnapshot(collection(db, 'plates'), 
        (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            callback(data);
        },
        (error) => console.error("Error fetching plates:", error)
    );
};

export const addPlate = (plate) =>
    addDoc(collection(db, 'plates'), plate);

export const updatePlate = (id, data) =>
    updateDoc(doc(db, 'plates', id), data);

export const deletePlate = (id) =>
    deleteDoc(doc(db, 'plates', id));

// ── Categorías ───────────────────────────────────────
export const getCategories = (callback) => {
    return onSnapshot(collection(db, 'categories'), 
        (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            callback(data);
        },
        (error) => console.error("Error fetching categories:", error)
    );
};

export const addCategory = (cat) =>
    addDoc(collection(db, 'categories'), cat);

export const deleteCategory = (id) =>
    deleteDoc(doc(db, 'categories', id));

// ── Config del restaurante ───────────────────────────
export const getConfig = (callback) => {
    return onSnapshot(doc(db, 'config', 'restaurant'), 
        (snap) => {
            callback(snap.data());
        },
        (error) => console.error("Error fetching config:", error)
    );
};

export const updateConfig = (data) =>
    updateDoc(doc(db, 'config', 'restaurant'), data);