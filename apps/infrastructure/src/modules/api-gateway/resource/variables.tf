variable "rest_api_id" {
  type = string
}

variable "path_part" {
  type = string
}

variable "parent_id" {
  type = string
}

variable "methods" {
  type = map(object({
    authorization = string
    http_method = string
    lambda_uri = string
    rest_api_id = string
  }))
}