## Ypod 

The platform for build podcast from yourtube playlist.

###  Project is build with:

-   Docker 
-   GitHub action for deploy docker image to GitHub registry and push image to VPS
-   MongoDB as storage for data and files 

## Secrets

Project use docker secrets for storing sensitive data. For local development create `.secret.json` file in the root of the project.
In case you want to getting secret from other file change the `.env` file.

Sample of `.secret.json` file:

```json
{
    "mongoUri": "mongodb://<user>:<pass>@<ip>:27017/<dbname>?<spec-param>",
    "google": {
        "clientId": "<google client id>"
    },
    "youtubeApiKey": "<youtube api key>",
    "rapidApiKey": "<rapid api key>",
    "baseUrl": "http://localhost:3000"
}
```

### Put secret on prod server

```sh
cat .prod-secret.json | docker secret create ypod-secret -
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

# CI

Add secrets to GitHub repository:
`DEPLOY_SSH_PRIVATE_KEY` - private ssh key for deploy user
