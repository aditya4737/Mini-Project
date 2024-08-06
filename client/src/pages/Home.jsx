import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center lg:flex-col">
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

        <div className="grid grid-cols-1 py-24 gap-4 mt-8 lg:grid-cols-3 lg:gap-8">
          <div className="h-32 rounded-lg bg-gray-200">
            <a
              href="#"
              className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
            >
              <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
              ></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Building a SaaS product as a software developer
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-16 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
                  maiores deleniti consectetur nobis et eaque.
                </p>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Published</dt>
                  <dd className="text-xs text-gray-500">31st June, 2021</dd>
                </div>

                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                  <dd className="text-xs text-gray-500">3 minute</dd>
                </div>
              </dl>
            </a>
          </div>
          <div className="h-32 rounded-lg bg-gray-200">

            <a
              href="#"
              className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
            >
              <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
              ></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Building a SaaS product as a software developer
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-16 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
                  maiores deleniti consectetur nobis et eaque.
                </p>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Published</dt>
                  <dd className="text-xs text-gray-500">31st June, 2021</dd>
                </div>

                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                  <dd className="text-xs text-gray-500">3 minute</dd>
                </div>
              </dl>
            </a>

          </div>
          <div className="h-32 rounded-lg bg-gray-200">
            <a
              href="#"
              className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
            >
              <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
              ></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Building a SaaS product as a software developer
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-16 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
                  maiores deleniti consectetur nobis et eaque.
                </p>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Published</dt>
                  <dd className="text-xs text-gray-500">31st June, 2021</dd>
                </div>

                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                  <dd className="text-xs text-gray-500">3 minute</dd>
                </div>
              </dl>
            </a>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Home
