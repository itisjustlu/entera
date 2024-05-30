.DEFAULT_GOAL := help

help:
	@echo "Check makefile to see options"

build:
ifdef APP
	@docker-compose build ${APP} --no-cache
else
	@docker-compose build --no-cache
endif

run:
	@docker-compose up ${APP}

bundle:
	@docker-compose run --rm web bundle

rails:
	@docker-compose run --rm web bin/rails ${ARGS}

console:
	@docker-compose run --rm web bin/rails console

migrate:
	@docker-compose run --rm web bin/rails db:migrate:with_data

rspec:
	@docker-compose run --rm web bundle exec rspec ${FILE}


