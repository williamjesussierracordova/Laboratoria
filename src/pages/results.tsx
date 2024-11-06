'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Header from "./parts/header"
import Footer from "./parts/footer"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from 'axios';
import { useState } from "react"
import { downloadFile } from "../firebase/fileStorage"
import LoaderPage from "./loaderPage"


export default function VirusDNAAnalysis() {
    const {idFile} = useParams()
    const [urlFile, setUrlFile] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // Primer useEffect: descargar el archivo y establecer el URL
    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlfile = await downloadFile(idFile);
                if (urlfile) {
                    setUrlFile(urlfile);
                }
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [idFile]);

    // Segundo useEffect: solo llamar a prediction si urlFile tiene un valor válido
    useEffect(() => {
        if (urlFile) { // Asegurarse de que urlFile no esté vacío
            setLoading(true);
            prediction();
        }
    }, [urlFile]);

    const prediction = async () => {
        console.log("URL siendo enviada:", urlFile); // Para verificar la URL
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                url: urlFile
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log("Respuesta exitosa:", response.data);
            setData(response.data);
            
        } catch (error) {
            console.log("Error en la petición:", error);
        } finally {
            setLoading(false);
        }
    }

    const nucleotideData = [
        { name: 'A', count: data.a },
        { name: 'T', count: data.t },
        { name: 'C', count: data.c },
        { name: 'G', count: data.g },
        { name: 'N', count: data.n }
    ]

    if (loading) {
        return <LoaderPage />
    }

    // Función para descargar archivos

    const handleDownload = (contenido) => {
        if (!data) {
            console.error('No hay datos disponibles para descargar');
            return;
        }

        let fileName = 'archivo.txt';
        let content = "";

        switch(contenido) {
            case "complemento":
                content = data.complement;
                fileName = 'complemento.txt';
                break;
            case "arn":
                content = data.transcribe;
                fileName = 'transcripcion_arn.txt';
                break;
            case "traduccion":
                content = data.aminoacidos;
                fileName = 'aminoacidos.txt';
                break;
            case "completo":
                content = JSON.stringify(data, null, 2);
                fileName = 'analisis_completo.json';
                break;
        }
        
        try {
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);

        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };


    return (
        <div className="min-h-screen flex flex-col mx-0 justify-center">
            {/* Header */}
            <div className="min-h-screen">
                <Header />
                <div className="min-h-screen bg-white p-8">
                    <div className="max-w-4xl mx-auto">
                        <header className="text-center mb-12">
                            <h1 className="text-4xl font-bold mb-2">
                                Resultados del Análisis de Genoma del Virus</h1>
                            <p className="text-xl text-muted-foreground">Deep Learning Classification y Estadisticas
                            </p>
                        </header>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="bg-gray-50">
                                <CardHeader>
                                    <CardTitle>Clasificación de Virus</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-semibold mb-2">
                                        {String(data.predicted_class).toUpperCase()}
                                    </div>
                                    {/* <Badge variant="secondary" className="bg-gray-200">H1N1 Subtype</Badge> */}
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        Confianza de la clasificación: {data.confidence}%
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-50">
                                <CardHeader>
                                    <CardTitle>
                                        Estadisticas del Genoma
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <dt className="font-medium">
                                                Longitud
                                            </dt>
                                            <dd>
                                                {data.length}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium">
                                                Representación de GC 
                                            </dt>
                                            <dd>
                                                {data.gc}%
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium">Regiones codificantes</dt>
                                            <dd>
                                                {data.coding_regions}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium">Regiones no codificantes</dt>
                                            <dd>
                                                {data.noncoding_regions}
                                            </dd>
                                        </div>
                                    </dl>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="mt-6 bg-gray-50">
                            <CardHeader>
                                <CardTitle>Distribución de Nucleotidos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={nucleotideData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* <Card className="mt-6 bg-gray-50">
                            <CardHeader>
                                <CardTitle>Información Adicional</CardTitle>
                            </CardHeader>
                            <CardContent >
                                <ul className="list-disc pl-5 space-y-2 justify-items-start" >
                                    <li>Mutation rate: 2.3 × 10^-3 substitutions per site per year</li>
                                    <li>Closest known relative: A/California/07/2009 (H1N1)</li>
                                    <li>Estimated divergence time: 3.5 years ago</li>
                                    <li>Potential drug resistance mutations detected: M2 S31N</li>
                                </ul>
                            </CardContent>
                        </Card> */}

                        <Card className="mt-6 bg-gray-50">
                            <CardHeader>
                                <CardTitle>Descargas opcionales</CardTitle>
                            </CardHeader>
                            <CardContent >
                                <div className="flex flex-row justify-between mt-4 items-center ">
                                    <p>Cadena complementaria de ADN</p>
                                    <Button variant="outline" className="hover:bg-black hover:text-white"
                                    onClick={() => handleDownload("complemento")}
                                    >Descargar</Button>
                                </div>
                                <div className="flex flex-row justify-between mt-4 items-center">
                                    <p>Cadena de ARN</p>
                                    <Button variant="outline" className="hover:bg-black hover:text-white" 
                                    onClick={() => handleDownload("arn")}
                                    >Descargar</Button>
                                </div>
                                <div className="flex flex-row justify-between mt-4 items-center">
                                    <p>Traducción del ADN</p>
                                    <Button variant="outline" className="hover:bg-black hover:text-white" 
                                    onClick={() => handleDownload("traduccion")}
                                    >Descargar</Button>
                                </div>
                                <div className="flex flex-row justify-between mt-4 items-center">
                                    <p>Reporte completo en JSON</p>
                                    <Button variant="outline" className="hover:bg-black hover:text-white" 
                                    onClick={() => handleDownload("completo")}
                                    >Descargar</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}