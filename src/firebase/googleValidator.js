// Code to validate the user with Google

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirebaseAuth } from '../Firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import { readUserFromEmail, writeUser } from '../firebase/userController.js';
import { v4 as uuidv4 } from 'uuid' 

export const HandleGoogleClick = async () => {
    const auth = getFirebaseAuth();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
        const resultsFromGoogle = await signInWithPopup(auth, provider);
        let userData = await readUserFromEmail(resultsFromGoogle._tokenResponse.email);

        if (userData === null) {
            writeUser(uuidv4(),resultsFromGoogle._tokenResponse.email,'')
            console.log('Usuario creado');
            navigate('/home');
        }
        else {
            console.log('Usuario ya existente');
            navigate('/home');
        }
    }
    catch (error) {
        console.error(error);
    }
}
