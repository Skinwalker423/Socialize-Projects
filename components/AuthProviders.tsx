"use client";
import React, { use, useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signInUrl?: string;
  callbackUrl: string;
  signInUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] =
    useState<Providers | null>(null);

  const fetchProviders = async () => {
    const res = await getProviders();
    console.log(res);

    setProviders(res);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleClick = () => {
    signIn();
  };

  if (!providers) {
    return "Loading...";
  }

  if (providers) {
    return (
      <div>
        {Object.values(providers).map(
          (provider: Provider, i) => {
            console.log("provider:", provider);
            return (
              <button key={i} onClick={handleClick}>
                {provider.id}
              </button>
            );
          }
        )}
      </div>
    );
  }
};

export default AuthProviders;
