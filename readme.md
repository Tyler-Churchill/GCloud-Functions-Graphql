# Google Cloud Functions GraphQL Boilerplate 
Easily develop and deploy a highly available GraphQL server on Google Cloud Functions

Try it here https://us-central1-tc-public.cloudfunctions.net/http/graphql
(you may need to place that same url in the sandbox to try a query)

# Getting Started

## Development with Docker

Deps
 * Docker for Desktop

On MacOS or Linux:
Run 
    `make start`

Windows or Manual:
Run 
    `docker-compose build`
    `docker-compose up`

Navigate to `http://localhost:3000/graphql` 

Code changes will hot reload.

> This is not a true emulation of google cloud functions in production but
pretty close

## Local development (serverless-offline)

Deps
* Node
* npm or yarn

run `yarn` or `npm install` when first starting out

then run
```bash
yarn offline:dev
```
or
```bash
npm run offline:dev
```

Navigate to http://localhost:3000/graphql

> This is not a true emulation of google cloud functions in production but
pretty close

## Local development (bypass serverless-offline)

Deps
* Node
* npm or yarn


run `yarn` or `npm install` when first starting out

then run
```bash
yarn local:dev
```
or
```bash
npm run local:dev
```

Navigate to http://localhost:4000/graphql

# Deploying

## Initial setup

1. Ensure your project has been created and has the proper services or API's enabled
    * Google Cloud Functions
    * Google Cloud Deployment Manager
    * Google Cloud Storage (should be enabled already)
    * Stackdriver Logging  (should be enabled already)
    Make note of your google project ID [where to find](https://stackoverflow.com/questions/24682180/how-to-get-project-id-in-google-cloud-storage)

2. Create credentials and assign roles
    * Go to the Google Cloud Console.
    * Choose the project that you are working on from the top drop down
    * Click IAM & admin menu on left-sidebar
    * Then click Service accounts on left-sidebar
    * Click CREATE SERVICE ACCOUNT button on the top
    * Input Service account name and Service account ID will be generated automatically   for you. Change it if you wish to.
    * Click Create button
    * Add [Deployment Manager Editor, Storage Admin, Logging Admin, Cloud Functions] Developer roles and click Continue
    * Click +CREATE KEY button and select JSON key type and click Create button
    * You will see a json (AKA keyfile) file downloaded
    * Click Done button
    * Save the keyfile somewhere secure. We recommend making a folder in your root folder and putting it there. Like this, .gcloud/keyfile.json

3. Set project id

    ###### MacOs or Linux:
    Take the project id you took note of in step one and run
    `find . -type f -name 'serverless-*' -exec sed -i 's/project/$PROJECT_ID/g' {} \;`
    Where `$PROJECT_ID` is the id of your GCloud project

    ###### Windows or Manually:
    in `serverless-local.yml` and `serverless.yml` find  
    ```yml
    provider:
        name: google
        runtime: nodejs8
        project: PROJECT_NAME  # <--- replace with project id
    ```

4. Deploy to Production

* TODO docker?

    run `yarn` or `npm install` when first deploying the first time    

    ```bash
    yarn serverless deploy
    ```

    or 
    ```bash
    npm run serverless deploy
    ```

    A URL with your production API will appear in your console after a few minutes