locals {
  bucket_name = "www.cocktailmenu-${local.region}.com"
}

resource "aws_s3_bucket" "cocktailmenubuilder" {
  bucket = local.bucket_name
}

data "aws_s3_bucket" "selected-bucket" {
  bucket = aws_s3_bucket.cocktailmenubuilder.bucket
}

resource "aws_s3_bucket_acl" "bucket-acl" {
  bucket     = data.aws_s3_bucket.selected-bucket.id
  acl        = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.s3_bucket_acl_ownership]
}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = data.aws_s3_bucket.selected-bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
  bucket = data.aws_s3_bucket.selected-bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
  depends_on = [aws_s3_bucket_public_access_block.public_access_block]
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = data.aws_s3_bucket.selected-bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket-policy" {
  bucket = data.aws_s3_bucket.selected-bucket.id
  policy = data.aws_iam_policy_document.iam-policy.json
}
data "aws_iam_policy_document" "iam-policy" {
  statement {
    sid    = "AllowPublicRead"
    effect = "Allow"
    resources = [
      "arn:aws:s3:::${local.bucket_name}",
      "arn:aws:s3:::${local.bucket_name}/*",
    ]
    actions = ["S3:GetObject"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  depends_on = [aws_s3_bucket_public_access_block.public_access_block]
}

resource "aws_s3_bucket_website_configuration" "website-config" {
  bucket = data.aws_s3_bucket.selected-bucket.bucket
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_object" "object-upload-htmls" {
  for_each     = fileset("${path.module}/../../../../../dist/apps/web/browser/", "*.html")
  bucket       = data.aws_s3_bucket.selected-bucket.bucket
  key          = each.value
  source       = "${path.module}/../../../../../dist/apps/web/browser/${each.value}"
  content_type = "text/html"
  etag         = filemd5("${path.module}/../../../../../dist/apps/web/browser/${each.value}")
  acl          = "public-read"
  depends_on = [aws_s3_bucket_acl.bucket-acl]
}

resource "aws_s3_object" "object-upload-js" {
  for_each     = fileset("${path.module}/../../../../../dist/apps/web/browser/", "*.js")
  bucket       = data.aws_s3_bucket.selected-bucket.bucket
  key          = each.value
  source       = "${path.module}/../../../../../dist/apps/web/browser/${each.value}"
  content_type = "text/javascript"
  etag         = filemd5("${path.module}/../../../../../dist/apps/web/browser/${each.value}")
  acl          = "public-read"
  depends_on = [aws_s3_bucket_acl.bucket-acl]
}

resource "aws_s3_object" "object-upload-css" {
  for_each     = fileset("${path.module}/../../../../../dist/apps/web/browser/", "*.css")
  bucket       = data.aws_s3_bucket.selected-bucket.bucket
  key          = each.value
  source       = "${path.module}/../../../../../dist/apps/web/browser/${each.value}"
  content_type = "text/css"
  etag         = filemd5("${path.module}/../../../../../dist/apps/web/browser/${each.value}")
  acl          = "public-read"
  depends_on = [aws_s3_bucket_acl.bucket-acl]
}

resource "aws_s3_object" "object-upload-ico" {
  for_each     = fileset("${path.module}/../../../../../dist/apps/web/browser/", "*.ico")
  bucket       = data.aws_s3_bucket.selected-bucket.bucket
  key          = each.value
  source       = "${path.module}/../../../../../dist/apps/web/browser/${each.value}"
  content_type = "image/vnd.microsoft.icon"
  etag         = filemd5("${path.module}/../../../../../dist/apps/web/browser/${each.value}")
  acl          = "public-read"
  depends_on = [aws_s3_bucket_acl.bucket-acl]
}
