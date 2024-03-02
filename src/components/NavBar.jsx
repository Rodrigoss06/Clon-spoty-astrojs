import React from "react";
import AuthButton from "./AuthButton";

const Avanzar = ({ className }) => (
  <svg
    className={className}
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="white"
  >
    <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
  </svg>
);
const Retroceder = ({ className }) => (
  <svg
    className={className}
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="white"
  >
    <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
  </svg>
);
const Novedades = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="white"
  >
    <path d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4zm-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569V5.5zm4.5 8a1 1 0 1 0 2 0H7z"></path>
  </svg>
);

function NavBar() {

  const getPreviousPath= ()=>{
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }
  const getNextPath=()=>{
    if (typeof window !== 'undefined') {
      window.history.forward();
    }
  }

  return (
    <nav className="flex justify-between items-center px-6 pt-3 mb-4 ">
      <div className="flex m-1 gap-x-1">
        <button onClick={getPreviousPath} className="rounded-full p-2 bg-[#141414]"  >
          <Retroceder />
        </button>
        <button onClick={getNextPath} className="rounded-full p-2  bg-[#141414]" >
          <Avanzar />
        </button>
      </div>
      <div className=" flex gap-x-4 items-center mx-2">
        <AuthButton/>
        <button className="rounded-full p-2 bg-[#07080C] hover:scale-105 transition"><Novedades/></button> <button className="rounded-full p-1 bg-[#07080C] hover:scale-105 transition"><span className="rounded-full px-[7px] py-1 bg-[#4F99F2] text-black font-semibold text-sm">R</span></button>
      </div>
    </nav>
  );
}

export default NavBar;
