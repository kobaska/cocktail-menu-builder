# cocktail-menu-builder

This is a cocktail menu app for restaurants to build their own cocktail menu out from a selection of cocktails from https://www.thecocktaildb.com/.

You test the Web App at
http://www.cocktailmenu-ap-southeast-2.com.s3-website-ap-southeast-2.amazonaws.com/

You can test the API at
https://don58np229.execute-api.ap-southeast-2.amazonaws.com/production

## Instructions

### Setup

1. Install Terraform

If on Mac use `brew install terraform`, else follow instructions from below link
https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli

2. Install AWS CLI

3. Setup AWS credentials

4. Install node dependencies `npm i`

### Serving Locally

1. Run below to serve API
`nx serve api`

2. Run below to serve Web App
`nx serve web`

3. Visit localhost:4200 to view the application

### Deployment

Below commands will only build/test/deploy the affected projects. 
NOTE: If you are running this first time, add `:all` suffix to these commands e.g. `npm run test:all`

1. Lint affected projects
   `npm run lint`

2. Test affected projects
   `npm run test`

3. If you are running this the first time, use below command to initialise Terraform state
   `npm run setup:infrastructure`

3. Build affected projects
   `npm run build`

4. Deploy affected projects
   `npm run deploy -- --region=ap-southeast-2`

5. Use the outputted url to access the API and Web App

6. If you are running for the first time, use the outputted API url from the previous step and replace the value in the below file:
`apps/web/src/environments/environment.prod.ts`

Once done repeat step 3 & 4

## Techstack used

- Compute: AWS (Lambda)
- Database: S3
- Infrastructure Provisioning Lib: Terraform
- Frontend Framework: Angular
- Styling Language: SCSS
- Component Lib: Storybook (Not implemented yet)
- E2E tests: Cypress (Not implemented yet)
- API Framework: Node.js with Express
- Language: Typescript
- Unit Testing Framework: Jest
- Bundler: esbuild
- Monorepo Lib: Nx

## Yet to complete

- Store Terraform state in cloud to allow to avoid clashes when more than one developer attempts to deploy
- E2E tests
- Separate out the components to libraries and write storybooks
- CI/CD
- Remove infrastructure depending on api and create a separate deploy script for API

## Code Structure

API `apps/api`
Web `apps/web`
Entities layer `libs/domain`
Application layer `libs/application`
Adapter layer `libs/adapters`
Infrastructure `apps/infrastructure`
Helpers/Utils `libs/helpers`

## Notes on design decisions or trade-offs made during development
- **S3 and Lambda**:  Used for cost-effective infrastructure management for a temp project
- **Nx Monorepo**: Employed to streamline all the moving parts of the application to simplify development and deployments.
- **Clean Architecture**: Attempted clean architecture pattern for learning purposes. Wouldn't choose this pattern for smaller projects such as this
- **Tests** All backend functions have unit tests. Haven't got around to writing integration tests. UI components lack unit test and e2e tests at the moment.

