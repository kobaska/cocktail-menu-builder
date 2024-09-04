output invoke_url {
  value       = "${aws_api_gateway_deployment.deployment.invoke_url}"
  description = "URL to invoke the API Gateway"
}