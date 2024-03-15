"use client";
import useLoginAPI from '../../../../hooks/useLoginAPI';
import useMerchantAPI from '../../../../hooks/useMerchantAPI';
import NavButton from '../../../ui/navButton';

export default function Login(){
  const {credentials, updateCredentials} = useLoginAPI();
  const {getMerchants, merchants} = useMerchantAPI();

  return (
    <main>
      <section>
        <h2>Log in to OrderWeasel</h2>
          <form className='flex-4'>
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
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={225}
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
                      autoComplete="password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={225}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-[1rem] justify-end">
              <button 
                className="bg-white text-black hover:bg-indigo-300 hover:text-black px-[1rem] py-[0.5rem] rounded-[1.5rem] justify-self-end shadow-md"
              >
                Log In
              </button>
            </div>
          </form>
      </section>
    </main>
  );
}
