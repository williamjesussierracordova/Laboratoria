
const Header = () => {
    return(
        // header
        <header className="flex justify-between items-center p-4 border-b">
            <div className="text-2xl font-bold">
                <a href='/'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                        color='black'
                    >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                </a>
            </div>
            <nav className="space-x-6 ">
                <a href="/analisis" className='text-black hover:text-blue-800'>Analisis</a>
                <a href="/documentacion" className='text-black hover:text-blue-800'>Documentación</a>
                <a href="/contact" className='text-black hover:text-blue-800'>Contacto</a>
            </nav>
        </header>
    )
}

export default Header