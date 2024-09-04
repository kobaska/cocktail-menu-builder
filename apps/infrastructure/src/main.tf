provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_s3_bucket" "cocktail_storage" {
  bucket = "cocktail-storage"
}

module "lambda_cocktail_menu_builder_api_cocktails_get" {
  source = "./modules/lambda"

  name     = "cocktail-menu-builder-api-cocktails-get"
  filename = "${path.module}/../../../dist/apps/cocktail-menu-builder-api/cocktails/get/dist.zip"
}

module "lambda_cocktail_menu_builder_api_menu_get" {
  source = "./modules/lambda"

  name     = "cocktail-menu-builder-api-menu-get"
  filename = "${path.module}/../../../dist/apps/cocktail-menu-builder-api/menu/get/dist.zip"
  policy_statements = {
    logging = {
      effect = "Allow"
      actions = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
      resources = [
        "arn:aws:logs:*:*:*"
      ]
    }
    s3_access = {
      effect = "Allow"
      actions = [
        "s3:ListBucket",
        "s3:GetObjectAcl",
        "s3:GetObject",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:DeleteObject"
      ]
      resources = [
        "${aws_s3_bucket.cocktail_storage.arn}/*",
      ]
    }
  }
}

module "rest_api_cocktail_menu_builder" {
  source = "./modules/api-gateway/rest-api"

  name        = "cocktail-menu-builder-api"
  description = "Cocktail Menu Builder API"
  lambdas_to_add_permissions = {
    cocktail_menu_builder_api_cocktails_get = {
      lambda_name = module.lambda_cocktail_menu_builder_api_cocktails_get.function_name
    }
    cocktail_menu_builder_api_menu_get = {
      lambda_name = module.lambda_cocktail_menu_builder_api_menu_get.function_name
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
    menu = {
      path_part = "menu"
      methods = {
        get = {
          http_method   = "GET"
          authorization = "NONE"
          lambda_uri    = module.lambda_cocktail_menu_builder_api_menu_get.invoke_arn
        }
      }
    }
  }
}

