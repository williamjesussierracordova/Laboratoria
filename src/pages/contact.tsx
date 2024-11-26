
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Footer from './parts/footer'
import Header from './parts/header'
import emailjs from 'emailjs-com'

interface FormData {
    name: string
    asunto: string
    email: string
    message: string
}

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        asunto: '',
        email: '',
        message: ''
    })
    const [sendMessage, setSendMessage] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSendMessage(true)

        // Configuración de EmailJS
        emailjs
          .send(
            'service_pnl3xw7', // Reemplaza con tu Service ID de EmailJS
            'template_kxefojl', // Reemplaza con tu Template ID de EmailJS
            {
              from_name: formData.name,
              subject: formData.asunto,
              email: formData.email,
              message: formData.message,
            },
            'jLh6jwU47Fbz_XZJi' // Reemplaza con tu User ID de EmailJS
          )
          .then(
            (response) => {
              console.log('Correo enviado con éxito:', response.status, response.text);
              alert('Correo enviado con éxito');
              setSendMessage(false)
            },
            (error) => {
              console.error('Error al enviar el correo:', error);
              alert('Hubo un error al enviar el correo. Intenta nuevamente.');
              setSendMessage(false)
            }
          );
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="min-h-screen flex flex-col mx-0 justify-center">
            {/* Header */}
            <div className="min-h-screen">
                <Header />

                {/* body */}
                <div className="min-h-screen flex flex-col items-center justify-center py-12 px-8 bg-white">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2">Contactanos</h1>
                        {/* <p className="text-xl text-muted-foreground px-4 lg:px-16 md:px-12 ">Si tienes alguna pregunta, feedback o comentario acerca de Laboratoria, no dudes en ponerte en contacto con nosotros. Puedes llenar el formulario a continuación o utilizar cualquiera de los métodos de contacto que te ofrecemos.</p> */}
                    </div>

                    <Card className="w-full max-w-md">
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombres</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Ingresar nombres"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="asunto">Asunto</Label>
                                    <Input
                                        id="asunto"
                                        name="asunto"
                                        placeholder="Ingresar asunto"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Ingresar email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Ingresar mensaje"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="min-h-[100px]"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                                    {sendMessage ? 'Enviando...' : 'Enviar'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Contact
