// import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { validateEmail, validatePassword } from "../util/validator.js"
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/firebase.js"
import { writeUser } from "../firebase/userController.js"
import { readUserFromEmail } from '../firebase/userController.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid'

const auth = getFirebaseAuth()

export default function SignIn() {

    const navigate = useNavigate()
    const [isFormValid, setIsFormValid] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });


    useEffect(() => {
        // Verificar si todos los campos son válidos
        const areAllFieldsValid = 
          !errors.email && 
          !errors.password && 
          formData.email && 
          formData.password;
    
        setIsFormValid(areAllFieldsValid);
      }, [formData, errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

        let error = '';

        switch(e.target.name){
            case "email":
                if (!validateEmail(e.target.value)) {
                    error = "Correo invalido"
                }
                break
            case "password":
                if (!validatePassword(e.target.value)) {
                    error = "Contraseña invalida"
                }
                break
            default:
                break
            }

        setErrors(prevErrors => ({
            ...prevErrors,
            [e.target.name]: error
            }));
    }


    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try{
            if(isFormValid){
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                onAuthStateChanged(auth, (user) => {
                    if (user){
                        console.log(user)
                        navigate("/home")
                    }
                    else{
                        console.log("No user")
                    }
                }
                )
            }
            else{
                console.log("Formulario invalido")	
            }
        }
        catch (error){
            console.log(error)
        }

    }

    const HandleGoogleClick = async () => {
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

    return (
        <div className="min-h-screen w-full bg-black text-white">
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <span className="text-lg font-semibold">Laboratoria</span>
                </div>
                <a
                    href="/signUp"
                    className="text-sm text-gray-400 hover:text-white transition-colors "
                >
                    Sign Up
                </a>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-80px)]">
                <div className="hidden lg:flex flex-col justify-center p-8 lg:p-16">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            " Este servicio web permite identificar el tipo de virus al que pertenece una secuencia genómica proporcionada. Puede recibir archivos en formato csv, fasta o un archivo de texto que contenga la cadena genomica a analizar. El servicio es capaz de reconocer virus como MERS, SARS, Hepatitis, Dengue e Influenza, y devolver el tipo correspondiente según la secuencia ingresada. "
                        </p>
                        <footer className="text-sm text-gray-400">Equipo de desarrollo</footer>
                    </blockquote>
                </div>

                <div className="flex items-center justify-center p-8">
                    <div className="max-w-sm w-full space-y-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign In
                            </h1>
                            <p className="text-sm text-gray-400">
                                Ingresar correo electronico y contraseña para ingresar
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="nombre@ejemplo.com"
                                    className="bg-transparent border-gray-800 focus:border-gray-600"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    className="bg-transparent border-gray-800 focus:border-gray-600"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button className="w-full bg-white text-black hover:bg-gray-200" onClick={handleSubmit} disabled={!isFormValid}>
                                Ingresar
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-800"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-black px-2 text-gray-400">
                                        o ingresar con
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full border-gray-800 bg-transparent hover:bg-white hover:text-black"
                                onClick={HandleGoogleClick}
                            >
                                <FcGoogle className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}