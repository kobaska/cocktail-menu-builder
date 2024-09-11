module "cocktail_menu_builder_api" {
  source = "./cocktail-menu-builder-api"

  depends_on = [ module.cocktail_menu_builder_webapp ]

  cors_domain_to_allow = "http://${module.cocktail_menu_builder_webapp.webapp_url}"
}