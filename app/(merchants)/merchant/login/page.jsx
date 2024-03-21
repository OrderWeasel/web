"use client";
import React, {useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useLoginAPI from '../../../../hooks/useLoginAPI';
import useMerchantAPI from '../../../../hooks/useMerchantAPI';

function LoginButton() {
  const {resetFields, login} = useLoginAPI();
  const router = useRouter();

  let handleLogin = async (e) => {
    e.preventDefault();
    let href = e.target.href;

    try {
      await login();
      router.push(href);
      resetFields();
    } catch (error) {
      if (error.message.includes('email')) {
        resetFields('email');
      } else {
        resetFields();
      }
      alert(error.message);
    }
  };

  return (
    <Link
      className="bg-white text-black hover:bg-indigo-300 hover:text-black px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-md"
      href="/orders"
      onClick={handleLogin}
    >
      Log In
    </Link>
  );
}

export default function Login(){
  const {credentials, updateCredentials} = useLoginAPI();
  const {getMerchants, merchants} = useMerchantAPI();

  useEffect(() => {
    (async function () {
      try {
        await getMerchants();
      } catch (e) {
        alert(e.message);
      }
    })();
  });

  let handleLoginCredentials = (text, type) => {
    switch(type) {
      case('email'):
        updateCredentials('email', text);
        break;
      case('password'):
        updateCredentials('password', text);
        break;
      default:
        let invalidType = type;
        throw new Error(`Invalid type ${invalidType} (at handleLogin)`);
        break;
    }
  };

  return (
    <main>
      <section>
        <h2>Log in to OrderWeasel</h2>
          <form className='m-20'>
            <div className="border-b border-gray-900/10 pb-[2rem]">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-8">
                <div className="sm:col-span-5">
                  <label htmlFor="email" className="block text-sm font-medium leading-6">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={credentials["email"]}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={225}
                      onChange={(e) => {
                        handleLoginCredentials(e.target.value, "email");
                      }}
                    />
                  </div>
                </div>

                <div className="sm:col-span-5">
                  <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={credentials["password"]}
                      autoComplete="password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={225}
                      onChange={(e) => {
                        handleLoginCredentials(e.target.value, "password");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-[1rem] justify-end">
              <LoginButton />
            </div>
          </form>
      </section>
    </main>
  );
}
