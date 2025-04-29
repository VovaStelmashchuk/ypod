## Kickstart project

The project create as a start template for js project with mongo db, htmx and handle bars.

### Template includes

-   Docker image
-   GitHub action for deploy docker image to GitHub registry
-   Setuped client for mongo
-   Dockerfile .dockerignore .gitignore, etc files
-   tailwaind
-   vue with Nuxt 3

## Secrets

Project use docker secrets for storing sensitive data. For local development create `.secret.json` file in the root of the project.
In case you want to getting secret from other file change the `.env` file.

Sample of `.secret.json` file:

```json
{
    "mongoUri": "mongodb://<user>:<pass>@<ip>:<port>/<dbname>?<connection specific options>",
    "google": {
        "clientId": "<google-client-id>"
    },
    "github": {
        "clientId": "<github-client-id>",
        "clientSecret": "<github-client-secret>"
    },
    "baseUrl": "http://localhost:3000"
}
```

### Links to get Secrets

#### Google

-   [Create google project](https://console.cloud.google.com/projectcreate)
-   [Create credentials](https://console.cloud.google.com/apis/credentials) - + Create credentials -> OAuth Client IDs -> Web application

Add 'Authorized JavaScript origins'

-   http://localhost:3000
-   https://kickstart.stelmashchuk.dev/ (your domain)

Add 'Authorized redirect URIs'

-   http://localhost:3000/auth/google/callback
-   https://kickstart.stelmashchuk.dev/auth/google/callback (replate with your domain)

#### GitHub

-   [Create github OAuth app](https://github.com/settings/applications/new)

## Support

The project is also provide simple implementation of support system. The user can create a support chat with the admin.
I decided to use discord server as admin UI for support system. You need just to create a discord server and add the bot to the server.
The backend server will send the message to the discord server and the admin can reply to the user in discord.
All admin message from discord will be sent to the user. The app creates a new channel for each user.

### Put secret on prod server

```sh
cat .secret.json | docker secret create <project>-secret -
```

### First run

Enfure the following install:

-   Node.js
-   npm

Run the following command to install all dependencies:

```sh
npm install
```

Run the following command to start the project:

```sh
npm run dev
```

App will be available on `http://localhost:3000`

# Database (mongo) setup

Create a new database in mongo db and add a new user with readWrite role.

```sh
use <dbname>
```

````sh
db.createUser({
    user: "<specUser>",
    pwd: "<specPass>",
    roles: [
        { role: "readWrite", db: "<dbname>" }
    ]
});
```

Create index in mongo db for the collection.

```sh
db.col.createIndex(
   { email: 1 },
   { unique: true }
)
```

Clear the collection
```sh
db.col.remove({})
```

# Deloyment

Create a new VPS with Ubuntu 22.04

Create a deploy user

```sh
adduser deploy
````

Add user to docker group

```sh
usermod -aG docker deploy
```

Create a new ssh key for deploy user.
File to add public key: `/home/deploy/.ssh/authorized_keys` (on the server)

Add private SSH key to GitHub Secrets as `DEPLOY_SSH_PRIVATE_KEY`

Modify the `.github/workflows/publish.yml` file to change the server IP address.

```yml
env:
    REGISTRY: ghcr.io
    DOCKER_STACKE_NAME: stack-kickstart
    DEPLOY_USER: deploy
    HOST: <server-ip>
```

# CI

Add secrets to GitHub repository:
`DEPLOY_SSH_PRIVATE_KEY` - private ssh key for deploy user
