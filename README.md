# cocktail-menu-builder

This is a cocktail menu app for restaurants to build their own cocktail menu out from a selection of cocktails from https://www.thecocktaildb.com/.

You can build your own menu using the below deployed API of this application
https://8txduk3to2.execute-api.ap-southeast-2.amazonaws.com/production/cocktails

## Instructions

### Setup

1. Install Terraform

If on Mac use `brew install terraform`, else follow instructions from below link
https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli

2. Install AWS CLI

3. Setup AWS credentials

4. Install node dependencies `npm i`

### Deployment

Below commands will only build/test/deploy the affected projects. If you are running this first time, automatically it will running all the projects

1. Lint affected projects
   `npm run lint`

2. Test affected projects
   `npm run test`

3. Build affected projects
   `npm run build`

4. Deploy affected projects
   `npm run deploy`

5. Use the outputted url to access the API

## Techstack used

- Compute: AWS (Lambda)
- Database: S3
- Infrastructure Provisioning Lib: Terraform
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

## Code Structure

Lambdas `apps/cocktail-menu-builder-api`
Infrastructure `apps/infrastructure`
Entities `libs/domain/entities`
Gateways `libs/domain/gateways`
Usecases `libs/domain/use-cases`
Helpers/Utils `libs/helpers`

## Notes on design decisions or trade-offs made during development
-  **S3 and Lambda**:  Used for cost-effective infrastructure management for a temp project
-  **Nx Monorepo**: Employed to streamline all the moving parts of the application to simplify development and deployments. If you're not familiar with Nx, the large number of files might seem overwhelming. Typically, I create a base configuration file to extend from and simplify the setup. However, for this project, I opted for the standard Nx configuration with some modifications to save time.
- **Clean Architecture**: I only spend very little time reading up on clean architecture concepts. Attempted to split layers accordingly, but the naming conventions might not be the standard ones.
- **Local Serve** I have been using LocalStack for emulating AWS infrastructure locally. I found out they removed free tier recently, hence you won't be able to run it locally. Please follow the instructions provided above to deploy to your own AWS account.
- **Lambda Structure**: Each individual lambda is split out to separate apps in here. This is totally unnecessary(so is the whole splitting of gateways and use cases) for a smaller project such as this. Purely went down this path to experiment on clean architecture and learn some different approaches in Terraform structuring. 
Splitting it per function or smaller group of functions does really help speed up CI/CD pipelines, but they are only needed for bigger projects.
- You might notice why `apps-cocktail-menu-builder-api-req-types` exists. This is a pattern I use to share types between the API and the frontend. This way if we were to accidentally break and endpoint, the type would catch it in the front end application and fail the build. Frontend app is not implement yet here.