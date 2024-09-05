output "webapp_url" {
  value = data.aws_s3_bucket.selected-bucket.website_endpoint
}