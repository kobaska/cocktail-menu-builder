variable "name" {
  type = string
}

variable "description" {
  type = string
}

variable "resources" {
  type = map(object({
    path_part = string
    methods = map(object({
      http_method = string
      authorization = string
      lambda_uri = string
    }))
  }))
}

variable lambdas_to_add_permissions {
  type = map(object({
    lambda_name = string
  }))
}