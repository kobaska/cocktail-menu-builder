
# API Gateway with resources and methods for the cocktail menu builder
module "rest_api_cocktail_menu_builder" {
  source = "../../modules/api-gateway/rest-api"

  name        = "cocktail-menu-api"
  description = "Cocktail Menu API"
  lambdas_to_add_permissions = {
    cocktail_menu_api = {
      lambda_name = module.lambda_cocktail_menu_api.function_name
    }
  }
  resources = {
    cocktails_menu_api = {
      path_part = "{proxy+}"
      methods = {
        get = {
          http_method   = "ANY"
          authorization = "NONE"
          lambda_uri    = module.lambda_cocktail_menu_api.invoke_arn
        }
      }
    }
  }
}

module "rest_api_resource_cocktail_menu_builder_child_api_menu_post_cocktails" {
  source = "../../modules/api-gateway/method"
  http_method = "ANY"
  rest_api_id = module.rest_api_cocktail_menu_builder.rest_api_id
  resource_id = module.rest_api_cocktail_menu_builder.root_resource_id
  lambda_uri = module.lambda_cocktail_menu_api.invoke_arn
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = module.rest_api_cocktail_menu_builder.rest_api_id
  stage_name  = "production"

  
  depends_on = [
    module.rest_api_cocktail_menu_builder,
  ]
  
  # FIXME: This is a workaround to force a new deployment when anything in infrastructure changes
  variables = {
    deployed_at = "${timestamp()}"
  }
}