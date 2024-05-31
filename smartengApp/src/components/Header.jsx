import ButtonComponent from './ButtonComponent.jsx';
import menuImage from '../assets/menu-dots-svgrepo-com.svg';
import profileImageSrc from '../assets/perfil.jpeg'

export function Header({route}) {
    return(
        <header className="bg-indigo-800 sticky top-0 z-10 p-4 flex items-center justify-between h-16 shadow-md">
            <img className="size-10 rounded-2xl" src={profileImageSrc} alt="Profile Image" />
            <nav className="items-center gap-3">
                <a id="home-tab" href="/" onClick={route} className="cursor-pointer px-2 text-base text-indigo-50 hover:text-white hover:font-medium">Home</a>
                <a id="client-tab" href="/cliente" onClick={route} className="cursor-pointer px-2 text-base text-indigo-50 hover:text-white hover:font-medium">Cliente</a>
                <a id="budget-tab" href="/orcamento" onClick={route} className="cursor-pointer px-2 text-base text-indigo-50 hover:text-white hover:font-medium">Orçamento</a>
                <a id="stages-tab" href="/etapas" onClick={route} className="cursor-pointer px-2 text-base text-indigo-50 hover:text-white hover:font-medium">Etapas</a>
                <a id="bdi-tab" href="/bdi" onClick={route} className="cursor-pointer px-2 text-base text-indigo-50 hover:text-white hover:font-medium">BDI</a>
                <a id="bases-tab" href="/bases" onClick={route} className="cursor-pointer px-2 text-base text-indigo-50 hover:text-white hover:font-medium">Bases</a>
            </nav>
            
            <div id="" className="size-10 rounded-2xl hidden sm:flex"></div>

            {/* <Button content="" imgSrc={menuImage}></Button> */}
            
            {/* <div id="mobile-nav" className="absolute flex flex-col gap-3 right-2 top-24 z-10">
            <button id="home-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><a href="/">Home</a></button>
            <button id="client-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><a href="/cliente">Cliente</a></button>
            <button id="budget-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><a href="/orcamento">Orçamento</a></button>
            <button id="stages-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><a href="/etapas">Etapas</a></button>
            <button id="bdi-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><a href="/bdi">BDI</a></button>
            <button id="bases-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><a href="/bases">Bases</a></button>
            </div> */}
      </header>
    )
}