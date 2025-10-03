.PHONY: install lint

help:
	@echo "Available commands:"
	@echo "  install - Install dependencies and set up git hooks"
	@echo "  lint    - Run linters and formatters"

install:
	@echo "Installing npm dependencies..."
	npm install
	@echo "Installing git hooks with lefthook..."
	npx lefthook install
	@echo "Setup complete!"

lint:
	@echo "Running linter..."
	npx lefthook run pre-commit
	@echo "Linting complete!"
