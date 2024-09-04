provider "aws" {
  region = "ap-southeast-2"
}

module "lambda_cocktail_menu_builder_api_cocktails_get" {
  source = "./modules/lambda"

  name     = "cocktail-menu-builder-api-cocktails-get"
  filename = "${path.module}/../../../dist/apps/cocktail-menu-builder-api/cocktails/get/dist.zip"
}

module "rest_api_cocktail_menu_builder" {
  source = "./modules/api-gateway/rest-api"

  name        = "cocktail-menu-builder-api"
  description = "Cocktail Menu Builder API"
  lambdas_to_add_permissions = {
    cocktail_menu_builder_api_cocktails_get = {
      lambda_name = module.lambda_cocktail_menu_builder_api_cocktails_get.function_name
    }
  }
  resources = {
    cocktails = {
      path_part = "cocktails"
      methods = {
        get = {
          http_method   = "GET"
          authorization = "NONE"
          lambda_uri    = module.lambda_cocktail_menu_builder_api_cocktails_get.invoke_arn
        }
      }
    }
  }
}


