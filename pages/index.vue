<template>
    <div class="main">
        <section>
            <h1>KickStart - make your next project in weekends</h1>
            <p>
                Push keep it stupid simple to the maximum. Explore the true
                power of copy paste.
            </p>
            <h2>
                Who do you do this ? Just push <b>KISS</b> to it absolute limit
            </h2>
        </section>

        <section id="features">
            <h2>Design</h2>
            <p>Less color better. Black and white always in trend</p>
            <div class="main__grid">
                <div class="main__border">
                    <h5>Simple css setup</h5>
                    <p style="text-align: left">
                        I prepare main.css with main color and few common styles
                        like styles for text styles, border and grid
                    </p>
                </div>
                <div class="main__border">
                    <h5>Components</h5>
                    <p style="text-align: left">
                        You don't need any bootstrap or other ui libraries. One
                        component for button and one for input it's all you need
                    </p>
                </div>
            </div>
        </section>

        <section id="code">
            <h2>Keep codebase as small as posible</h2>
            <p>
                One repository it's all you need. Use metaframework like Nuxt
                store all client and backend code into one repository
            </p>
            <div class="main__grid">
                <div class="main__border">
                    <h5>Make change quickly</h5>
                    <p style="text-align: left">
                        Nuxt allow you to use hot-reload, which apply both
                        change from client and backend immediately
                    </p>
                </div>
                <div class="main__border">
                    <h5>One application for both</h5>
                    <p style="text-align: left">
                        Nuxt allow you to ship your product with client and
                        backend as single application
                    </p>
                </div>
            </div>
        </section>

        <section id="deploy">
            <h2>Implement own deployment it's not that hard</h2>
            <p>
                Modern industry try to convince you that deployment is hard,
                <b>but it's actualy not</b>
            </p>
            <div class="main__grid">
                <div class="main__border">
                    <h5>DockerFile</h5>
                    <p style="text-align: left">
                        The project provide you with DockerFile, which fully
                        prepared to run Nuxt application in production
                    </p>
                </div>
                <div class="main__border">
                    <h5>docker-stack.yml</h5>
                    <p style="text-align: left">
                        This file defines the services, networks, and volumes
                        for deploying your application using Docker Stack. It
                        ensures your app is configured correctly for production.
                    </p>
                </div>
                <div class="main__border">
                    <h5>.github/workflow/publish.yml</h5>
                    <p style="text-align: left">
                        This workflow file automates the deployment process
                        using GitHub Actions. It builds your Docker image and
                        pushes it to the container registry after deploy the
                        application to any VPS by ssh whenever you push changes
                        to the main branch.
                    </p>
                </div>
                <div class="main__border">
                    <h5>KISS</h5>
                    <p style="text-align: left">
                        You don't need any moderm deployment system like Vercel
                        or AWS. You can use docker and deploy your app to any
                        VPS. The docker itseft allow you to implemement
                        blue-green deployment by docker stack and manage secrets
                        by docker secrets
                    </p>
                </div>
            </div>
        </section>
        <section id="features">
            <h3>Features to copy paste</h3>
            <div class="main__grid">
                <div class="main__border">
                    <h5>Social Auth (Google &amp; GitHub)</h5>
                    <p style="text-align: left">
                        Seamless authentication on multiple devices using OAuth2
                        with Google or GitHub no extra setup needed. You don't
                        need any third party to implement social auth, all auth
                        provider follow the save OAuth2 standard, it's just few
                        http calls.
                    </p>
                </div>
                <div class="main__border">
                    <h4>Admin Auth</h4>
                    <p style="text-align: left">
                        You don't need to implement separate admin login flow,
                        just login with your social account and add field
                        isAdmin to your user record into database
                    </p>
                </div>
                <div class="main__border">
                    <h4>Pre-built Landing Page</h4>
                    <p style="text-align: left">
                        A clean and modern landing page structure is included by
                        default, so you can quickly showcase your SaaS offering.
                    </p>
                </div>
            </div>
        </section>

        <section id="get-started">
            <h3>Get Started</h3>
            <p>
                Ready to dive in? Follow these steps from our README to set up
                KickStart for local development and beyond.
            </p>

            <div class="main__border">
                <ol>
                    <li>
                        <strong>Clone the Repository:</strong>
                        <p>
                            <code>
                                git clone
                                https://github.com/VovaStelmashchuk/kickstart
                            </code>
                        </p>
                    </li>

                    <li>
                        <strong
                            >Create a
                            <code>.secret.json</code>
                            file:</strong
                        >
                        <p>
                            Store your sensitive data (Mongo URL, OAuth keys,
                            etc.) in this file. A sample:
                        </p>
                        <pre>
              <code>
{
  "mongoUri": "mongodb://user:pass@ip:port/dbname?options",
  "google": {
    "clientId": "google-client-id"
  },
  "github": {
    "clientId": "github-client-id",
    "clientSecret": "github-client-secret"
  },
  "baseUrl": "http://localhost:3000"
}
              </code>
              </pre>
                    </li>

                    <li>
                        <strong>Install Dependencies:</strong>
                        <p>
                            <code> npm install </code>
                        </p>
                    </li>

                    <li>
                        <strong>Start the Development Server:</strong>
                        <p class="mt-1">
                            <code> npm run dev </code>
                        </p>
                        <p>
                            Your app will be running at
                            <code>http://localhost:3000</code>.
                        </p>
                    </li>
                </ol>
            </div>
        </section>

        <section id="deployment">
            <h3>Deploy to Any VPS</h3>
            <p>
                KickStart uses Docker Stack for seamless deployment to any
                virtual private server. For instance, we personally use
                <a
                    href="https://hetzner.cloud/?ref=z9gjQzbiO5y9"
                    target="_blank"
                    class="main__link"
                >
                    Hetzner
                </a>
                (hosting multiple projects on a single VPS at just 3.29 EUR per
                month).
            </p>
            <h4>Some Projects Hosted on the Same Server:</h4>
            <ul>
                <li>
                    <a
                        href="https://mixdrinks.org"
                        class="main__link"
                        target="_blank"
                    >
                        mixdrinks.org
                    </a>
                </li>
                <li>
                    <a
                        href="https://androidstory.dev"
                        class="main__link"
                        target="_blank"
                    >
                        androidstory.dev
                    </a>
                </li>
                <li>
                    <a
                        href="https://podcast.stelmashchuk.dev"
                        class="main__link"
                        target="_blank"
                    >
                        podcast.stelmashchuk.dev
                    </a>
                </li>
                <li>
                    <a
                        href="https://nest2d.stelmashchuk.dev"
                        class="main__link"
                        target="_blank"
                    >
                        nest2d.stelmashchuk.dev
                    </a>
                </li>
            </ul>
            <MainButton
                :theme="buttonThemeType.primary"
                label="Get started"
                class="main__btn"
                href="https://github.com/VovaStelmashchuk/kickstart"
                target="_blank"
            />
        </section>

        <section id="faq">
            <h3>Frequently Asked Questions</h3>
            <div>
                <details>
                    <summary>Is KickStart free?</summary>
                    <p>
                        Yes, it's completely open-source. Feel free to use and
                        modify!
                    </p>
                </details>
                <details>
                    <summary>Which technologies are included?</summary>
                    <p>
                        Nuxt 3 (Vue), Tailwind CSS, MongoDB integration, Docker,
                        and GitHub Actions for CI/CD are all set up.
                    </p>
                </details>
                <details>
                    <summary>Can I contribute to the project?</summary>
                    <p>
                        Absolutely! Check out our
                        <a
                            href="https://github.com/VovaStelmashchuk/kickstart"
                            target="_blank"
                            class="main__link"
                        >
                            GitHub repository
                        </a>
                        to open issues or submit PRs.
                    </p>
                </details>
            </div>
        </section>
    </div>
</template>

<script setup>
const loginDialog = useLoginDialog()
import { buttonThemeType } from '~~/constants/button.constants'
definePageMeta({
    middleware: 'auth'
})
</script>

<style lang="scss">
.text-left {
    text-align: left;
}
.main {
    section {
        padding: 2rem;

        h1 {
            text-align: center;
            margin: 1.5rem 0;
        }

        h2 {
            text-align: center;
            margin: 1rem 0;
        }

        h3 {
            text-align: center;
            margin: 1rem 0;
        }

        h4 {
            text-align: center;
            margin: 1rem 0;
        }

        h5 {
            text-align: left;
            margin: 0 0;
        }

        p {
            margin: 1rem 0;
            text-align: center;
        }
    }

    ul {
        li {
            margin: 0.5rem 0;
        }
    }

    &__btn {
        margin: 1rem auto;
    }
}
</style>
