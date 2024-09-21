"use client";
import { ChangeEvent, useState } from "react";

const LoginComponent = () => {
 
  return (
    <div className="min-h-screen  text-gray-900 flex justify-center">
      <div className="max-w-screen-xl h-auto m-10 sm:m-10 bg-[#87CEEB] shadow sm:rounded-lg flex justify-center flex-1 overflow-y-auto">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <form
            
              className="mt-4 w-full"
            >
              <div className="mt-4 w-full">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <div className="mt-4 w-full">
                <label htmlFor="password">Kata Sandi</label>
                <input
                  id="password"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <button
                type="submit"
                className={`mt-5 tracking-wide font-semibold bg-[#FF6347] text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
                // onClick={(e) => handleSubmit(e,formData.email,formData.password)}
              >
                <span className="ml-3">Login</span>
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
