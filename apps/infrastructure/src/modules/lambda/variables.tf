variable "retention_in_days" {
  type    = number
  default = 14
}

variable "timeout" {
  type    = number
  default = 29
}

variable "name" {
  type = string
}

variable "runtime" {
  type    = string
  default = "nodejs20.x"
}

variable "package_type" {
  type    = string
  default = "Zip"
}

variable "filename" {
  type = string
}

variable "handler" {
  type    = string
  default = "index.handler"
}

variable "policy_statements" {
  type = map(object({
    effect    = string
    actions   = list(string)
    resources = list(string)
  }))
  default = {
    logging = {
      effect = "Allow"
      actions = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
      resources = [
        "arn:aws:logs:*:*:*"
      ]
    }
  }
}

variable "environment" {
  type = map(string)
  default = {}
}
