IMAGE_NAME := bpi-dev
CONTAINER_FNAME := Containerfile

help:
	@echo "make podman-build - Build and locally tag a new image."
	@echo "make podman-build-force - Use a no-cache build"
	@echo "make podman-run the container and launch the fastapi server"

podman-build:
	@podman build -t $(IMAGE_NAME) --file=$(CONTAINER_FNAME) .

podman-build-force:
	@podman pull registry.fedoraproject.org/fedora-minimal
	@podman build  -t $(IMAGE_NAME) --file=$(CONTAINER_FNAME) --no-cache .

podman-run:
	@podman run -it  \
		-p 3000:3000 \
		-p 9229:9229 \
		-v ${PWD}:/app:z \
		$(IMAGE_NAME) run dev
