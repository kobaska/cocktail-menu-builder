# S3 Bucket for storing cocktail menu data
resource "aws_s3_bucket" "cocktail_storage" {
  bucket = "cocktail-storage"
}

resource "aws_s3_object" "menu_data" {
  bucket = "cocktail-storage"
  key    = "menu.json"
  source = "${path.module}/assets/menu.json"
  content_type = "application/json"
}
