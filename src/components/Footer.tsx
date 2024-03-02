import React from "react";
const IconLinkedln = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-divand-linkedin"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
    <path d="M8 11l0 5" />
    <path d="M8 8l0 .01" />
    <path d="M12 16l0 -5" />
    <path d="M16 16v-3a2 2 0 0 0 -4 0" />
  </svg>
);
const IconGithub = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-brand-github"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
  </svg>
);
interface Props {
  className?: string
}
function Footer({className}: Props) {
  return (
    <footer className={`${className} bg-[#121212] text-[#868686] flex-shrink-0 flex flex-col items-center pt-10 px-8 pb-4 relative  bottom-0 w-full`}>
      <section className="flex flex-1 justify-between items-start pt-10 px-8 pb-10 gap-x-10">
      <div className="flex justify-between gap-20">
        
        
        <ul className="flex flex-col gap-2">
          <h2 className="text-white font-semibold">Mis Proyectos</h2>
          <a href="#" className="hover:text-white/80 hover:underline">Portfolio</a>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <a href="https://www.linkedin.com/in/rodrigo-sucapuca-santamarina-329515211/" target="_blank" className="rounded-full p-2 bg-slate-800/80 text-white">
          <IconLinkedln />
        </a >
        <a href="https://github.com/Rodrigoss06" target="_blank" className="rounded-full p-2 bg-slate-800/80 text-white">
          <IconGithub />
        </a >
      </div>
      
    </section>
    <div className="h-[1px] bg-[#868686]  w-full mt-2"/>
    <p className="text-center">Este proyecto es un clon de Spotify creado con fines de aprendizaje y como parte de mi portafolio.</p>

    </footer>
  );
}

export default Footer;
