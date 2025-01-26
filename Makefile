DOCKER_COMPOSE = docker/docker-compose.yml
VENV_DIR = venv

SHELL := /bin/bash

venv:
	@python3 -m venv $(VENV_DIR)
	@echo "Virtual environment created."

requirements: venv
	@. $(VENV_DIR)/bin/activate && pip install -r docker/web/requirements.txt

up:
	docker-compose -f $(DOCKER_COMPOSE) up

fup:
	docker-compose -f $(DOCKER_COMPOSE)  up --build

build:
	docker-compose -f $(DOCKER_COMPOSE) build

down:
	docker-compose -f $(DOCKER_COMPOSE) down

restart: down up

logs:
	docker-compose -f $(DOCKER_COMPOSE) logs -f

shell:
	docker-compose -f $(DOCKER_COMPOSE) exec webapp sh

clean:
	docker-compose -f $(DOCKER_COMPOSE) down -v

rebuild: down build up

migrations:
	docker-compose -f $(DOCKER_COMPOSE) exec django sh -c "echo 'Running migrations...'; /usr/local/bin/python3 manage.py makemigrations"

django:
	docker-compose -f $(DOCKER_COMPOSE) exec django sh

migrate:
		docker-compose -f $(DOCKER_COMPOSE) exec django sh -c "echo 'Running migrations...'; /usr/local/bin/python3 manage.py migrate"
