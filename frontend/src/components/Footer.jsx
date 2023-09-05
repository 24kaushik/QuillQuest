import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#eee] shadow-md dark:bg-gray-900 mt-5">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="#" className="flex items-center justify-center sm:justify-normal mb-3 sm:mb-0">
                            <span className="text-4xl font-josefins font-semibold whitespace-nowrap dark:text-white">QuillQuest</span>
                        </a>
                        <ul className="flex justify-evenly flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="https://github.com/24kaushik/QuillQuest" className="mr-4 hover:underline md:mr-6 ">GitHub</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">QuillQuest™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer
