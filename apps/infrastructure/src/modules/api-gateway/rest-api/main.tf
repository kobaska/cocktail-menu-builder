resource "aws_api_gateway_rest_api" "rest_api" {
  name        = var.name
  description = var.description
}

module "rest_api_resources" {
  source = "../resource"
  for_each = var.resources

  parent_id = "${aws_api_gateway_rest_api.rest_api.root_resource_id}"
  path_part = each.value.path_part
  rest_api_id = "${aws_api_gateway_rest_api.rest_api.id}"

  methods = {
    for key, value in each.value.methods : key => {
      http_method = value.http_method
      authorization = value.authorization
      lambda_uri = value.lambda_uri
      rest_api_id = "${aws_api_gateway_rest_api.rest_api.id}"
    }
  }
}

resource "aws_lambda_permission" "apigw" {
  for_each = var.lambdas_to_add_permissions
  statement_id_prefix   = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = each.value.lambda_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/*"
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  stage_name  = "production"

  depends_on = [
    module.rest_api_resources,
  ]
}