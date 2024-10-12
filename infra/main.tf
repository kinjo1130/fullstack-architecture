# Provider configuration
provider "google" {
  project = var.project_id
  region  = var.region
}

# Enable required APIs
resource "google_project_service" "required_apis" {
  for_each = toset([
    "run.googleapis.com",
    "iam.googleapis.com",
    "cloudbuild.googleapis.com",
    "artifactregistry.googleapis.com"
  ])
  service = each.key
  disable_on_destroy = false
}

# Create Artifact Registry repository
resource "google_artifact_registry_repository" "my_repo" {
  location      = var.region
  repository_id = "my-app-repo"
  description   = "Docker repository for my application"
  format        = "DOCKER"

  depends_on = [google_project_service.required_apis]
}

# Cloud Build trigger for frontend
resource "google_cloudbuild_trigger" "frontend_trigger" {
  name        = "frontend-build-trigger"
  description = "Trigger for building and pushing frontend Docker image"

  github {
    owner = "your-github-username"
    name  = "your-repo-name"
    push {
      branch = "^main$"
    }
  }

  included_files = ["frontend/**"]
  filename = "frontend/cloudbuild.yaml"

  depends_on = [google_project_service.required_apis]
}

# Cloud Build trigger for backend
resource "google_cloudbuild_trigger" "backend_trigger" {
  name        = "backend-build-trigger"
  description = "Trigger for building and pushing backend Docker image"

  github {
    owner = "your-github-username"
    name  = "your-repo-name"
    push {
      branch = "^main$"
    }
  }

  included_files = ["backend/**"]
  filename = "backend/cloudbuild.yaml"

  depends_on = [google_project_service.required_apis]
}

# Cloud Run service for backend (Nest.js)
resource "google_cloud_run_service" "backend" {
  name     = "nestjs-backend"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.my_repo.repository_id}/nestjs-backend:latest"
        env {
          name  = "DATABASE_URL"
          value = var.database_url
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
  autogenerate_revision_name = true

  depends_on = [google_project_service.required_apis, google_cloudbuild_trigger.backend_trigger]
}

# Cloud Run service for frontend (Next.js)
resource "google_cloud_run_service" "frontend" {
  name     = "nextjs-frontend"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.my_repo.repository_id}/nextjs-frontend:latest"
        env {
          name  = "API_URL"
          value = google_cloud_run_service.backend.status[0].url
        }
        env {
          name  = "NEXT_PUBLIC_API_URL"
          value = google_cloud_run_service.backend.status[0].url
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
  autogenerate_revision_name = true

  depends_on = [google_project_service.required_apis, google_cloudbuild_trigger.frontend_trigger]
}

# IAM policy to make the services public
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "backend_noauth" {
  location = google_cloud_run_service.backend.location
  project  = google_cloud_run_service.backend.project
  service  = google_cloud_run_service.backend.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_service_iam_policy" "frontend_noauth" {
  location = google_cloud_run_service.frontend.location
  project  = google_cloud_run_service.frontend.project
  service  = google_cloud_run_service.frontend.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

# Output the service URLs
output "backend_url" {
  value = google_cloud_run_service.backend.status[0].url
}

output "frontend_url" {
  value = google_cloud_run_service.frontend.status[0].url
}