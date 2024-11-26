import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "./parts/footer"
import Header from "./parts/header"
import { Bold } from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export default function Documentacion() {
  return (
    <div className="min-h-screen flex flex-col mx-0 justify-center ">
            {/* Header */}
            
            <Header />
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-8 bg-white max-w-3xl">
      
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Documentación
          </h1>
          <p className="text-xl text-muted-foreground">Descripción general y guía de uso
          </p>
        </header>

        <Tabs defaultValue="overview" >
          <TabsList className="grid w-full grid-cols-3 flex-col">
            <TabsTrigger value="overview" className="bg-black text-white border-black hover:bg-white hover:text-black">Descripción</TabsTrigger>
            {/* <TabsTrigger value="components" className="bg-black text-white border-black hover:bg-white hover:text-black">Componentes</TabsTrigger> */}
            <TabsTrigger value="usage" className="bg-black text-white border-black hover:bg-white hover:text-black">Guia de uso</TabsTrigger>
            <TabsTrigger value="api" className="bg-black text-white border-black hover:bg-white hover:text-black">API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Descripción del proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  El proyecto de análisis de genoma de virus es una aplicación web basada en React que visualiza los resultados de la clasificación de aprendizaje profundo en secuencias genomicas de virus. Proporciona una interfaz fácil de usar para mostrar la clasificación de virus, estadísticas del genoma y distribución de nucleótidos.
                </p>
                <h3 className="text-lg font-semibold">Puntos clave:</h3>
                <ul className="flex flex-col justify-start text-left list-disc pl-5 space-y-2">
                  <li>
                    Clasificación de virus con puntuación de confianza sobre la clasificación
                  </li>
                  <li>
                    Estadísticas del genoma que incluyen longitud de secuencia, contenido de GC y recuento de regiones codificantes y no codificantes
                  </li>
                  <li>
                    Gráfico interactivo para la distribución de nucleótidos
                  </li>
                  <li>
                    Descargas opcionales sobre insights adicionales del virus analizado como el ARN, cadena de aminoacidos, ADN complementario y el informe completo.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
{/* 
          <TabsContent value="components">
            <Card>
              <CardHeader>
                <CardTitle>Main Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">VirusDNAAnalysis</h3>
                <p>
                  The main component that renders the entire analysis page. It includes the following sections:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Header with title and subtitle</li>
                  <li>Virus Classification card</li>
                  <li>DNA Statistics card</li>
                  <li>Nucleotide Distribution chart</li>
                  <li>Additional Insights card</li>
                </ul>
                <h3 className="text-lg font-semibold">Subcomponents</h3>
                <p>
                  The application uses several shadcn/ui components for consistent styling:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Card, CardContent, CardHeader, CardTitle: For structured content sections</li>
                  <li>Badge: To display the virus subtype</li>
                  <li>BarChart (from recharts): For visualizing nucleotide distribution</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent> */}

          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Guia de uso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Carga de archivo</h3>
                <a>
                  Los archivos soportados actualmente son .fasta, .txt y .csv para la carga de datos genomicos de virus.
                </a>
                <p className="bold ">Consideraciones adicionales:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>El archivo fasta solo debe contener un registro genomico, de lo contrario los resultados mostrados seran erroneos.</li>
                  <li> 
                    El archivo csv debe tener como cabecera la columna "sequence" y debe contener unicamente una secuencia genomica. De tener mas de una secuencia, se tomara la primera de estas.
                  </li>
                  <li>
                    El archivo txt debe contener una secuencia genomica, sin cabecera y sin ningun otro contenido. Laboratoria eliminara cualquier caracter especial o espacio en blanco que contenga el archivo.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold">Procesamiento</h3>
                <p>
                  El procesamiento de la cadena genomica ingresado en laboratoria se realiza en un servidor remoto, por lo que el tiempo de respuesta puede variar dependiendo del tamaño de la cadena genomica. Asimismo, los archivos ingresados son subidos a un servidor de archivos para su analisis, Laboratoria asegura la eliminación del archivo en un plazo no mayor al de 7 dias. Ademas, el procesamiento incluye los siguientes pasos:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Descarga y Preprocesamiento del archivo
                  </li>
                  <li>
                    Codificación y alineamiento de la secuencia
                  </li>
                  <li>
                    Análisis genomico completo
                  </li>
                  <li>
                    Predicción con el modelo de clasificación
                  </li>
                  <li>
                    Presentación de resultados
                  </li>
                </ul>

                <h3 className="text-lg font-semibold">Resultados</h3>
                <p>
                  Los resultados mostrados en la interfaz de usuario son generados por el servidor de laboratoria y son presentados en tiempo real. Los resultados incluyen la clasificación del virus, estadísticas del genoma y distribución de nucleótidos. Adicionalmente, se proporcionan insights adicionales sobre el virus analizado. 
                </p>
                <p>
                  Para asegurar la transparencia y la precision de los resultados mostrados. Laboratoria proporciona acceso al repositorio publico del proyecto en <a href="https://github.com/williamjesussierracordova/classification_viruses" target="_blank">GitHub</a>, donde se puede revisar el codigo fuente y los modelos utilizados para el analisis.
                </p>
                <p>
                  El uso de la aplicación es completamente gratuito con el fin de fomentar la educación y la investigación en el campo de la bioinformática.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>Referencias de la API</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Laboratoria utiliza una API RESTful para el procesamiento de datos y la clasificación de virus. La API proporciona endpoints para cargar archivos, procesar secuencias genomicas y obtener resultados de clasificación.
                </p>

                <p>
                  Por el momento la API no esta disponible para el uso publico, sin embargo, se puede acceder al repositorio publico del proyecto en <a href="https://github.com/williamjesussierracordova/classification_viruses" target="_blank">GitHub</a> para revisar el codigo fuente y los modelos utilizados.
                </p>
                <p>
                  Para obtener mas información sobre la API, por favor contactar al desarrollador del proyecto a través del siguiente <a href="mailto:williamjsc@hotmail.com">
                    correo electronico
                  </a>.

                </p>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      
    </div>

    <Footer />
    </div>
  )
}