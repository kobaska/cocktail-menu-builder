output rest_api_id {
  value       = aws_api_gateway_rest_api.rest_api.id
}

output resource_ids {
  value = {
    for key, resource in module.rest_api_resources : key => resource.resource_id
  }
}