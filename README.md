# cocktail-menu-builder

This is a cocktail menu app for restaurants to build their own cocktail menu out from a selection of cocktails from https://www.thecocktaildb.com/api.php.

Deployed API of this application can be tested at
https://8txduk3to2.execute-api.ap-southeast-2.amazonaws.com/production/cocktails

## Instructions

### Setup

1. Install Terraform

If on Mac use `brew install terraform`, else follow instructions from below link
https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli

2. Install AWS CLI

3. Setup AWS credentials

4. Install node dependencies `npm i`

### Run Locally
TODO

### Deployment

1. Test affected projects
   `npm run test`

2. Build affected projects
   `npm run build`

3. Deploy affected projects
   `npm run deploy`

4. Use the outputted url to access the API

## Techstack used

- Compute: AWS (Lambda)
- Database: S3
- Infrastructure Provisioning Lib: Serverless(https://www.serverless.com/)
- Frontend Framework: Angular
- Styling Language: SCSS
- Component Lib: Storybook
- E2E tests: Cypress
- API Framework: Node.js
- Language: Typescript
- Unit Testing Framework: Jest
- Bundler: esbuild
- Monorepo Lib: Nx
- Implement logger with masking for sensitive data

## Yet to complete

- Local serving of lambdas (Localstack would be ideal)
- Tests
- UI
- Move API Gateway child resources to API Gateway resources module
- Store Terraform state in cloud to allow to avoid clashes when more than one developer attempts to deploy
- CI/CD