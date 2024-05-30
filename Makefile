.DEFAULT_GOAL := help

help:
	@echo "Check makefile to see options"

run:
	@docker-compose up ${APP}

bundle:
	@docker-compose run --rm api bundle

rails:
	@docker-compose run --rm api bin/rails ${ARGS}

console:
	@docker-compose run --rm api bin/rails console

yarn:
	@docker-compose run --rm web yarn ${ARGS}

rspec:
	@docker-compose run --rm api bundle exec rspec ${FILE}
