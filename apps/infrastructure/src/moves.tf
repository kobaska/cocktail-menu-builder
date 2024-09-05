moved {
  from = aws_s3_bucket.cocktail_storage
  to   = module.region_sydney.module.cocktail_menu_builder_api.aws_s3_bucket.cocktail_storage
}

moved {
  from = aws_s3_object.menu_data
  to   = module.region_sydney.module.cocktail_menu_builder_api.aws_s3_object.menu_data
}

moved {
  from = module.lambda_cocktail_menu_builder_api_cocktails_get
  to   = module.region_sydney.module.cocktail_menu_builder_api.module.lambda_cocktail_menu_builder_api_cocktails_get
}

moved {
  from = module.lambda_cocktail_menu_builder_api_menu_get
  to   = module.region_sydney.module.cocktail_menu_builder_api.module.lambda_cocktail_menu_builder_api_menu_get
}

moved {
  from = module.lambda_cocktail_menu_builder_api_menu_post_cocktails
  to   = module.region_sydney.module.cocktail_menu_builder_api.module.lambda_cocktail_menu_builder_api_menu_post_cocktails
}

moved {
  from = module.lambda_cocktail_menu_builder_api_menu_delete_cocktails
  to   = module.region_sydney.module.cocktail_menu_builder_api.module.lambda_cocktail_menu_builder_api_menu_delete_cocktails
}

moved {
  from = module.rest_api_cocktail_menu_builder
  to   = module.region_sydney.module.cocktail_menu_builder_api.module.rest_api_cocktail_menu_builder
}

moved {
  from = module.rest_api_resource_cocktail_menu_builder_child_api_menu_post_cocktails
  to   = module.region_sydney.module.cocktail_menu_builder_api.module.rest_api_resource_cocktail_menu_builder_child_api_menu_post_cocktails
}

moved {
  from = module.rest_api_resource_cocktail_menu_builder_child_api_menu_delete_cocktails
  to   = module.region_sydney.module.cocktail_menu_builder_api.module.rest_api_resource_cocktail_menu_builder_child_api_menu_delete_cocktails
}

moved {
  from = aws_api_gateway_deployment.deployment
  to   = module.region_sydney.module.cocktail_menu_builder_api.aws_api_gateway_deployment.deployment
}

moved {
  from = module.region_sydney.module.cocktail_menu_builder_webapp.aws_s3_bucket.cocktailmenubuilder-1
  to   = module.region_sydney.module.cocktail_menu_builder_webapp.aws_s3_bucket.cocktailmenubuilder
}

