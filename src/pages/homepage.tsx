import { Button } from '@/components/ui/button'
import Header from './parts/header'
import Footer from './parts/footer'


export default function HomePage() {

    return (
        <div className="min-h-screen flex flex-col mx-0 justify-center ">
            {/* Header */}
            <div className='max-h-screen' >
            <Header />

            {/* Hero Section */}
            <main className="flex-1 min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-bold mb-4">Laboratoria</h1>
                <p className="text-xl text-muted-foreground mb-8">Software para la detección de virus a partir de su cadena genomica</p>
                <div className="space-x-4">
                    <Button variant="outline"><a href='/documentacion' className='text-black hover:text-black'>Documentación</a></Button>
                    <Button><a href='/analisis' className='text-white hover:text-white'>Empezar</a></Button>
                </div>
            </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}