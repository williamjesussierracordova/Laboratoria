// import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { validateEmail, validatePassword } from "../util/validator.js"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirebaseAuth } from "../firebase/firebase.js"
import { writeUser } from "../firebase/userController.js"
import { readUserFromEmail } from '../firebase/userController.js';
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const auth = getFirebaseAuth()

export default function SignUp() {

    const navigate = useNavigate()
    const [isFormValid, setIsFormValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        code: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        code: "",
    });


    useEffect(() => {
        // Verificar si todos los campos son válidos
        const areAllFieldsValid = 
          !errors.email && 
          !errors.password && 
          !errors.code && 
          formData.email && 
          formData.password && 
          formData.code;
    
        setIsFormValid(areAllFieldsValid);
      }, [formData, errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.name == "code"){
            e.target.value = e.target.value.replace(/[^0-9]/g, '')
            if(e.target.value.length > 6){
                e.target.value = e.target.value.slice(0, 6)
            }
        }
        
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
            case "code":
                if (e.target.value.length < 6) {
                    error = "Codigo invalido"
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
        setIsLoading(true)
        try{
            await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            writeUser(uuidv4(), formData.email, formData.code)
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  console.log('Usuario creado');
                  alert("Usuario creado")
                  setIsLoading(false)
                  navigate('/home');
                } else {
                  console.log('Usuario no creado');
                  alert("Usuario no creado")
                  setIsLoading(false)
                }
            });
        } catch (error){
            console.log(error)
            setIsLoading(false)
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
                    href="/"
                    className="text-sm text-gray-400 hover:text-white transition-colors "
                >
                    Sign In
                </a>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-80px)]">
                <div className="hidden lg:flex flex-col justify-center p-8 lg:p-16">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            " Este servicio web permite identificar el tipo de virus al que pertenece una secuencia genómica proporcionada. Puede recibir archivos en formato csv, fasta o un archivo de texto que contenga la cadena genomica a analizar. El servicio es capaz de reconocer virus como MERS, SARS, Hepatitis, Dengue e Influenza, y devolverá el tipo correspondiente según la secuencia ingresada. "
                        </p>
                        <footer className="text-sm text-gray-400">Equipo de desarrollo</footer>
                    </blockquote>
                </div>

                <div className="flex items-center justify-center p-8">
                    <div className="max-w-sm w-full space-y-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign Up
                            </h1>
                            <p className="text-sm text-gray-400">
                                Ingresa tu correo electronico y crea una contraseña para crear una cuenta
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
                                <Input
                                    type="code"
                                    name="code"
                                    placeholder="Codigo de referencia"
                                    className="bg-transparent border-gray-800 focus:border-gray-600"
                                    value={formData.code}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button className="w-full bg-white text-black hover:bg-gray-200" disabled={!isFormValid} onClick={ handleSubmit} >
                                Registrar
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-800"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-black px-2 text-gray-400">
                                        o continuar con 
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

                        <p className="text-center text-sm text-gray-400">
                            Dandole click a registar, aceptara nuestros {" "}
                            <a href="/" className="underline hover:text-white">
                                Terminos de Servicio
                            </a>{" "}
                            y{" "}
                            <a href="/" className="underline hover:text-white">
                                Politica de Privacidad
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}