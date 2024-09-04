resource "aws_api_gateway_resource" "api_resource" {
  rest_api_id = var.rest_api_id
  parent_id   = var.parent_id
  path_part   = var.path_part
}

module "rest_api_methods" {
  source = "../method"
  for_each = var.methods

  rest_api_id = var.rest_api_id
  authorization = each.value.authorization
  http_method = each.value.http_method
  lambda_uri = each.value.lambda_uri
  resource_id = aws_api_gateway_resource.api_resource.id
}
