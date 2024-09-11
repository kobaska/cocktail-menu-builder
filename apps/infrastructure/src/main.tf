terraform {
  required_version = "~> 1.5.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.65.0"
    }
  }
}

provider "aws" {
  alias  = "sydney"
  region = "ap-southeast-2"
}

module "region_sydney" {
  source = "./apps"

   providers = {
    aws = aws.sydney
  }
}
