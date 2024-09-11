data "archive_file" "source" {
  type = "zip"

  source_dir = "${path.module}/../../../../../dist/apps/api/"

  output_path = "${path.module}/../../../../../dist/apps/api.zip"
}

module "lambda_cocktail_menu_api" {
  source = "../../modules/lambda"

  name     = "cocktail-menu-api"
  filename = "${path.module}/../../../../../dist/apps/api.zip"
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

  environment = {
    CORS_DOMAINS_TO_ALLOW = var.cors_domain_to_allow
    MENU_DB = "s3"
    COCKTAIL_DB = "thecocktaildb"
    COCKTAIL_DB_S3_BUCKET_NAME = aws_s3_bucket.cocktail_storage.bucket
  }
}