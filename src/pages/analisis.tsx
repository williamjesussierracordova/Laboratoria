import Footer from "./parts/footer"
import Header from "./parts/header"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { IoMdClose } from "react-icons/io";
import { UploadFile} from "../firebase/fileStorage"
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from "react-router-dom"

const Analisis = () => {
    const [fileError, setFileError] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validExtensions = ["txt", "fasta","csv"];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();

            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                setFileError("Los archivos aceptados son .txt, .fasta, .csv.");
                setShowAlert(true); // Mostrar la alerta
                event.target.value = ""; // Limpiar el input si el archivo no es válido
            } else {
                setFileError("");
                setFile(file);
                setShowAlert(false); // Ocultar la alerta si el archivo es válido
            }
        }
    };

    const handleUpload = async () => {
        // Lógica para subir el archivo a la API
        if(file){
            const code_file = uuidv4();
            await UploadFile(file, code_file);
            alert("Archivo subido correctamente");
            navigate(`/resultados/${code_file}`);
        }
        else{
            console.log("No se ha seleccionado un archivo");
        }
    }


    return (
        <div className="min-h-screen flex flex-col mx-0 justify-center">
            {/* Header */}
            <div className="max-h-screen">
                <Header />

                {/* Hero Section */}
                <main className="flex-1 min-h-screen flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl font-bold mb-4">Ingresar cadena genomica</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Los archivos soportados son .txt .fasta .csv
                    </p>
                    <div className="space-x-4 flex flex-row items-center justify-center">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                                id="file"
                                type="file"
                                accept=".txt,.fasta,.csv"
                                onChange={handleFileChange}
                            />
                            {showAlert && (
                                <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
                                    <div className="flex items-start">
                                        <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                                        <div>
                                            <AlertTitle className="font-bold">Error tipo de archivo</AlertTitle>
                                            <AlertDescription className="text-pretty">
                                                Los archivos aceptados son .txt .fasta .csv . No se permiten archivos con múltiples secuencias.
                                            </AlertDescription>
                                        </div>
                                        <button
                                            className="ml-4 bg-transparent hover:bg-white"
                                            onClick={() => setShowAlert(false)}
                                        >
                                            <IoMdClose />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button
                        disabled={!file}
                        onClick={handleUpload}
                        className="text-white hover:text-white"
                        >
                                Analizar   
                        </Button>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Analisis