output invoke_arn {
  value       = "${aws_lambda_function.lambda_function.invoke_arn}"
  description = "ARN to invoke the Lambda function"
}

output function_name {
  value       = "${aws_lambda_function.lambda_function.function_name}"
  description = "Name of the Lambda function"
}