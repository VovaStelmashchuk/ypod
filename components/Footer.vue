<template>
    <footer class="px-4 py-4 bg-black">
        <div class="max-w-7xl mx-auto px-4 lg:flex lg:items-center lg:justify-between">
            <ul class="sm:flex">
                <li class="mb-2.5 sm:mb-0 sm:mr-10">
                    <a
                        href="https://github.com/VovaStelmashchuk/ypod"
                        target="_blank"
                        class="block text-center sm:text-left text-white font-normal opacity-70 hover:opacity-100 transition-opacity duration-300"
                    >
                        GitHub
                    </a>
                </li>
                <li>
                    <NuxtLink 
                        to="/doc/terms-and-conditions" 
                        class="block text-center sm:text-left text-white font-normal opacity-70 hover:opacity-100 transition-opacity duration-300"
                    >
                        Terms and Conditions
                    </NuxtLink>
                </li>
            </ul>
            <p class="text-center lg:text-left mt-4 lg:mt-0 text-gray-400 block font-normal">
                © 2025 Vova Stelmashchuk. All rights reserved. Built with ♥
                and open source principles
            </p>
        </div>
    </footer>
</template>
