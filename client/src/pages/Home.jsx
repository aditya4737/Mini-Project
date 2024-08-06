import React from 'react'
import { Link } from 'react-router-dom';
import IconChatbox from '../components/Icons/ChatIcon';
import Testimonial from '../components/Testimonial';

const Home = () => {
  return (
    <section className="bg-gray-50 pb-32">
      <div className="mx-auto max-w-screen-xl px-4 py-32 pb-32 lg:flex lg:h-screen lg:items-center lg:flex-col">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Connect with top legal professionals.
            <strong className="font-bold text-red-700 sm:block">Submit your case effortlessly.</strong>
          </h2>
          <p className="mt-4 sm:text-xl/relaxed">
            Find the right lawyer for your needs with ease and confidence.
          </p>
        </div>

        {/* Card section starts */}

        <div className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3 lg:gap-8 py-24">
            <div className="rounded-lg">
              <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
                <div className="flex items-start sm:gap-8">
                  <div
                    className="hidden sm:grid sm:w-20 sm:h-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-black"
                    aria-hidden="true">
                    <IconChatbox />
                  </div>
                  <div>
                    <h3 className="mt-4 text-lg font-medium sm:text-xl">
                      <a href="#" className="hover:underline">Submit your case</a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-700">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div className="rounded-lg">
              <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
                <div className="flex items-start sm:gap-8">
                  <div
                    className="hidden sm:grid sm:w-20 sm:h-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-black"
                    aria-hidden="true">
                    <IconChatbox />
                  </div>
                  <div>
                    <h3 className="mt-4 text-lg font-medium sm:text-xl">
                      <a href="#" className="hover:underline">Find a Lawyer</a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-700">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div className="rounded-lg">
              <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
                <div className="flex items-start sm:gap-8">
                  <div
                    className="hidden sm:grid sm:w-20 sm:h-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-black"
                    aria-hidden="true">
                    <IconChatbox />
                  </div>
                  <div>
                    <h3 className="mt-4 text-lg font-medium sm:text-xl">
                      <Link to={"/Chat"} className="hover:underline">Communicate with us</Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-700">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        {/* Testimonial components */}
      </div>
      <Testimonial/>
    </section>
  )
}

export default Home




