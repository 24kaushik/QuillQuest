import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer class="bg-[#eee] shadow-md dark:bg-gray-900 mt-5">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" class="flex items-center justify-center sm:justify-normal mb-3 sm:mb-0">
                            <span class="text-4xl font-josefins font-semibold whitespace-nowrap dark:text-white">QuillQuest</span>
                        </a>
                        <ul class="flex justify-evenly flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                            </li>
                            <li>
                                <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="mr-4 hover:underline md:mr-6 ">GitHub</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-gray-500 text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">QuillQuest™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer
