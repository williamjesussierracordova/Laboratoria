import { GetFirebaseStorage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

const storage = GetFirebaseStorage();

export async function UploadFile(file, code) {
    const storageRef = ref(storage, 'files/' + code);
    const uploadTask = await uploadBytes(storageRef, file);
    return uploadTask; // Retorna el resultado de la subida.
}


export async function downloadFile(code) {
    const storageRef = ref(storage, 'files/' + code );
    const url = await getDownloadURL(storageRef);
    return url;
}

