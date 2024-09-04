variable "retention_in_days" {
  type = number
  default = 14
}

variable "name" {
  type = string
}

variable "runtime" {
  type = string
  default = "nodejs20.x"
}

variable "package_type" {
  type = string
  default = "Zip"
}

variable "filename" {
  type = string
}

variable "handler" {
  type = string
  default = "index.handler"
}