data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "${var.name}_iam_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name              = "/aws/lambda/${var.name}"
  retention_in_days = var.retention_in_days
}

data "aws_iam_policy_document" "lambda_policy_document" {
  dynamic "statement" {
    for_each = var.policy_statements
    content {
      effect = statement.value.effect
      actions   = statement.value.actions
      resources = statement.value.resources
    }
  }
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "${var.name}_policy"
  path        = "/"
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.lambda_policy_document.json

}

resource "aws_iam_role_policy_attachment" "policy_attachment" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_lambda_function" "lambda_function" {
  function_name    = var.name
  role             = aws_iam_role.iam_for_lambda.arn
  architectures    = ["x86_64"]
  runtime          = var.runtime
  package_type     = var.package_type
  filename         = var.filename
  handler          = var.handler
  source_code_hash = filebase64sha256(var.filename)
  depends_on = [
    aws_iam_role_policy_attachment.policy_attachment,
    aws_cloudwatch_log_group.cloudwatch_log_group,
  ]
}
