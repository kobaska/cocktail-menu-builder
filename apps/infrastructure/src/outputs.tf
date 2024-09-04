output "cocktail_menu_builder_api_url" {
  value = aws_api_gateway_deployment.deployment.invoke_url
}

output "cocktail_menu_builder_api_resource_ids" {
  value = module.rest_api_cocktail_menu_builder.resource_ids
}
