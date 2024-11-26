import loader1 from '../../public/loader1.svg'
export default function LoaderPage() {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-white">
            <img src={loader1} alt="loader" className="w-1/4 h-1/4" />
        </div>
    )
}