# Variables
PROJECT_ID := $(shell gcloud config get-value project)
FRONTEND_IMAGE := nextjs-frontend
BACKEND_IMAGE := nestjs-backend
GCR_HOSTNAME := gcr.io
DOCKER_PLATFORM := linux/amd64

# Docker and GCR commands
DOCKER := docker
DOCKER_BUILD := $(DOCKER) build
DOCKER_TAG := $(DOCKER) tag
DOCKER_PUSH := $(DOCKER) push

# Default target
.PHONY: all
all: build tag push

# Build Docker images
.PHONY: build
build: build-frontend build-backend

.PHONY: build-frontend
build-frontend:
	@echo "Building frontend Docker image..."
	$(DOCKER_BUILD) --platform $(DOCKER_PLATFORM) -t $(FRONTEND_IMAGE) ./frontend

.PHONY: build-backend
build-backend:
	@echo "Building backend Docker image..."
	$(DOCKER_BUILD) --platform $(DOCKER_PLATFORM) -t $(BACKEND_IMAGE) ./backend

# Tag Docker images for GCR
.PHONY: tag
tag: tag-frontend tag-backend

.PHONY: tag-frontend
tag-frontend:
	@echo "Tagging frontend image for GCR..."
	$(DOCKER_TAG) $(FRONTEND_IMAGE) $(GCR_HOSTNAME)/$(PROJECT_ID)/$(FRONTEND_IMAGE):latest

.PHONY: tag-backend
tag-backend:
	@echo "Tagging backend image for GCR..."
	$(DOCKER_TAG) $(BACKEND_IMAGE) $(GCR_HOSTNAME)/$(PROJECT_ID)/$(BACKEND_IMAGE):latest

# Push Docker images to GCR
.PHONY: push
push: push-frontend push-backend

.PHONY: push-frontend
push-frontend:
	@echo "Pushing frontend image to GCR..."
	$(DOCKER_PUSH) $(GCR_HOSTNAME)/$(PROJECT_ID)/$(FRONTEND_IMAGE):latest

.PHONY: push-backend
push-backend:
	@echo "Pushing backend image to GCR..."
	$(DOCKER_PUSH) $(GCR_HOSTNAME)/$(PROJECT_ID)/$(BACKEND_IMAGE):latest

# Clean up local Docker images
.PHONY: clean
clean:
	@echo "Cleaning up local Docker images..."
	-$(DOCKER) rmi $(FRONTEND_IMAGE) $(BACKEND_IMAGE) $(GCR_HOSTNAME)/$(PROJECT_ID)/$(FRONTEND_IMAGE):latest $(GCR_HOSTNAME)/$(PROJECT_ID)/$(BACKEND_IMAGE):latest

# Login to GCR
.PHONY: gcr-login
gcr-login:
	@echo "Logging in to GCR..."
	gcloud auth configure-docker

# Help
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make all          - Build, tag, and push both frontend and backend images"
	@echo "  make build        - Build Docker images for frontend and backend"
	@echo "  make tag          - Tag Docker images for GCR"
	@echo "  make push         - Push Docker images to GCR"
	@echo "  make clean        - Remove local Docker images"
	@echo "  make gcr-login    - Login to Google Container Registry"
	@echo "  make help         - Show this help message"