module "lambda_cocktail_menu_builder_api_cocktails_get" {
  source = "../../modules/lambda"

  name     = "cocktail-menu-builder-api-cocktails-get"
  filename = "${path.module}/../../../../../dist/apps/cocktail-menu-builder-api/cocktails/get/dist.zip"
}

module "lambda_cocktail_menu_builder_api_menu_get" {
  source = "../../modules/lambda"

  name     = "cocktail-menu-builder-api-menu-get"
  filename = "${path.module}/../../../../../dist/apps/cocktail-menu-builder-api/menu/get/dist.zip"
  policy_statements = {
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
    s3_access = {
      effect = "Allow"
      actions = [
        "s3:ListBucket",
        "s3:GetObjectAcl",
        "s3:GetObject",
      ]
      resources = [
        "${aws_s3_bucket.cocktail_storage.arn}/*",
      ]
    }
  }
}

module "lambda_cocktail_menu_builder_api_menu_post_cocktails" {
  source = "../../modules/lambda"

  name     = "cocktail-menu-builder-api-menu-post-cocktails"
  filename = "${path.module}/../../../../../dist/apps/cocktail-menu-builder-api/menu/post-cocktails/dist.zip"
  policy_statements = {
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
    s3_access = {
      effect = "Allow"
      actions = [
        "s3:ListBucket",
        "s3:GetObjectAcl",
        "s3:GetObject",
        "s3:PutObject",
        "s3:PutObjectAcl",
      ]
      resources = [
        "${aws_s3_bucket.cocktail_storage.arn}/*",
      ]
    }
  }
}

module "lambda_cocktail_menu_builder_api_menu_delete_cocktails" {
  source = "../../modules/lambda"

  name     = "cocktail-menu-builder-api-menu-delete-cocktails"
  filename = "${path.module}/../../../../../dist/apps/cocktail-menu-builder-api/menu/delete-cocktails/dist.zip"
  policy_statements = {
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
    s3_access = {
      effect = "Allow"
      actions = [
        "s3:ListBucket",
        "s3:GetObjectAcl",
        "s3:GetObject",
        "s3:PutObject",
        "s3:PutObjectAcl",
      ]
      resources = [
        "${aws_s3_bucket.cocktail_storage.arn}/*",
      ]
    }
  }
}