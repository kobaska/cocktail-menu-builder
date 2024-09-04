variable "http_method" {
  type = string
  default = "ANY"
}

variable "authorization" {
  type = string
  default = "NONE"
}

variable "rest_api_id" {
  type = string
}

variable "resource_id" {
  type = string
}

variable "lambda_uri" {
  type = string
}