
# API Gateway with resources and methods for the cocktail menu builder
module "rest_api_cocktail_menu_builder" {
  source = "../../modules/api-gateway/rest-api"

  name        = "cocktail-menu-builder-api"
  description = "Cocktail Menu Builder API"
  lambdas_to_add_permissions = {
    cocktail_menu_builder_api_cocktails_get = {
      lambda_name = module.lambda_cocktail_menu_builder_api_cocktails_get.function_name
    }
    cocktail_menu_builder_api_menu_get = {
      lambda_name = module.lambda_cocktail_menu_builder_api_menu_get.function_name
    }
    cocktail_menu_builder_api_menu_post_cocktails = {
      lambda_name = module.lambda_cocktail_menu_builder_api_menu_post_cocktails.function_name
    }
    cocktail_menu_builder_api_menu_delete_cocktails = {
      lambda_name = module.lambda_cocktail_menu_builder_api_menu_delete_cocktails.function_name
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

module "rest_api_resource_cocktail_menu_builder_child_api_menu_post_cocktails" {
  source = "../../modules/api-gateway/resource"

  parent_id = module.rest_api_cocktail_menu_builder.resource_ids.menu
  path_part = "cocktails"
  rest_api_id = module.rest_api_cocktail_menu_builder.rest_api_id

  methods = {
    post = {
      http_method   = "POST"
      authorization = "NONE"
      lambda_uri    = module.lambda_cocktail_menu_builder_api_menu_post_cocktails.invoke_arn
      rest_api_id = module.rest_api_cocktail_menu_builder.rest_api_id
    }
  }
}

module "rest_api_resource_cocktail_menu_builder_child_api_menu_delete_cocktails" {
  source = "../../modules/api-gateway/resource"

  parent_id = module.rest_api_resource_cocktail_menu_builder_child_api_menu_post_cocktails.resource_id
  path_part = "{cocktailId}"
  rest_api_id = module.rest_api_cocktail_menu_builder.rest_api_id

  methods = {
    post = {
      http_method   = "DELETE"
      authorization = "NONE"
      lambda_uri    = module.lambda_cocktail_menu_builder_api_menu_delete_cocktails.invoke_arn
      rest_api_id = module.rest_api_cocktail_menu_builder.rest_api_id
    }
  }
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = module.rest_api_cocktail_menu_builder.rest_api_id
  stage_name  = "production"

  
  depends_on = [
    module.rest_api_cocktail_menu_builder,
    module.rest_api_resource_cocktail_menu_builder_child_api_menu_post_cocktails,
    module.rest_api_resource_cocktail_menu_builder_child_api_menu_delete_cocktails
  ]
  
  # FIXME: This is a workaround to force a new deployment when anything in infrastructure changes
  variables = {
    deployed_at = "${timestamp()}"
  }
}