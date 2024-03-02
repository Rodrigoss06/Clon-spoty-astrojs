"use client";

import React, { useState } from "react";
import { sha256, base64encode, generateParams, getToken } from "../lib/token";
import axios from "axios";
import { Button, Label, Modal } from "flowbite-react";

function AuthButton() {
  const [openModal, setOpenModal] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [alertModal, setAlertModal] = useState(false);
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [authUrl, setAuthUrl] = useState(
    new URL("https://accounts.spotify.com/authorize")
  );
  const [redirectUri, setRedirectUri] = useState(
    "http://localhost:4321/callback"
  );
  const [client_id, setClient_id] = useState(
    "bc0e88b2d2ec4e5f98620d3b3f0afd0b"
  );

  const handleChangeClient_id = (e: any) => {
    if (client_id !== "") {
      setDisabledSubmit(false);
    }
    setClient_id(e.target.value);
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("access_token");
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce(
      (acc, x) => acc + possible[x % possible.length],
      ""
    );
    const codeVerifier = randomString;
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const params = generateParams(codeChallenge, redirectUri, client_id);
    token;
    localStorage.setItem("code_verifier", codeVerifier);
    authUrl.search = new URLSearchParams(params).toString();
    localStorage.setItem("access_token", "n");
    window.location.href = authUrl.toString();
  };
  
  return (
    <>
      <button
        className="rounded px-2 py-1 bg-green-600 "
        onClick={() => setOpenModal(true)}
      >
        GetMyData
      </button>
      <Modal
        show={openModal}
        size="md"
        className=" h-auto  bg-[#00000080]   text-black"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header className=" max-w-md mb-0   p-[6px]" />
        <Modal.Body className="mx-1 px-1 max-w-md mt-0 py-2  flex flex-col justify-center items-center   ">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 ">
              Consigue tu access token
            </h3>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="client_id" value="Your client_id" />
              </div>
              <input
                type="text"
                id="client_id"
                placeholder="Your Client Id"
                className="p-1 w-[350px] border border-slate-600 border-solid rounded"
                required
                onChange={handleChangeClient_id}
              />
            </div>

            <div className="w-full">
              <input
                id="submitButton"
                type="submit"
                className="bg-cyan-700 rounded px-2 py-1 disabled:bg-slate-300"
                disabled={disabledSubmit}
                value="Get Access Code"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={alertModal}
        size="md"
        className=" bg-[#00000080] relative h-auto  text-black"
        onClose={() => setAlertModal(false)}
        dismissible
      >
        <Modal.Header className="max-w-md max-h-md mb-0  p-[6px]" />
        <Modal.Body className=" mx-auto max-w-md  max-h-md mt-0 pt-2">
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {messageAlert}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setAlertModal(false)}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AuthButton;
