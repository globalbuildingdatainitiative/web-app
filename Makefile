.PHONY: install lint

.PHONY: help
help: ## Show this help message
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies and set up git hooks
	@echo "Installing npm dependencies..."
	npm install
	@echo "Installing git hooks with lefthook..."
	npx lefthook install
	@echo "Setup complete!"

# Capture all arguments after the target (lazy evaluation)
ARGS = $(filter-out $@,$(MAKECMDGOALS))

.PHONY: run
run: ## Start the web application or list npm scripts
	@if [ -n "$(ARGS)" ]; then \
		npm run $(firstword $(ARGS)) -- $(wordlist 2,$(words $(ARGS)),$(ARGS)); \
	else \
		echo "No script specified — listing npm scripts:"; \
		npm run; \
	fi

.PHONY: lint
lint: ## Run linter on the codebase
	@echo "Running linter..."
	npx lefthook run pre-commit
	@echo "Linting complete!"
