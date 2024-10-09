
variable "project_id" {
  description = "The ID of the Google Cloud project"
}

variable "region" {
  description = "The region to deploy the services"
  default     = "asia-northeast2"
}

variable "backend_image" {
  description = "The Docker image for the backend service"
}

variable "frontend_image" {
  description = "The Docker image for the frontend service"
}

variable "database_url" {
  description = "The URL of your Supabase database"
}

variable "api_url" {
  description = "The URL of the backend API"
}

