"use client"
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, signIn, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const page = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [provider, setProvider] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    if (session) return router.push('/');
  }, [session])

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setProviders();
  }, []);
  return (
    <div className='h-screen flex justify-center items-center'>
      {provider &&
        Object.values(provider).map((prov) => (
          <button
            type="button"
            key={prov.name}
            onClick={() => {
              signIn(prov.id);
            }}
            className="black_btn"
          >
            Sign with {prov.name}
          </button>
        ))}
    </div>
  )
}

export default page