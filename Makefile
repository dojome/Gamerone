.PHONY: dev install start test build build-production start-local start-production

dev: install start

# change between npm or yarn
runner = yarn

install:
	$(runner) install
start:
	$(runner) start
start-local:
	$(runner) start:local
start-production:
	$(runner) start:production
test:
	CI=true $(runner) test:ci --colors --silent
build-production:
	$(runner) build:production
build-stage:
	$(runner) build

build: build-stage

# Do some git tag versioning.
.PHONY: release current patch minor major

$(eval branch := $(shell git rev-parse --abbrev-ref HEAD))
$(eval v := $(shell git describe --tags `git rev-list --tags --max-count=1` | sed -Ee 's/^v|-.*//'))

# Get the current most relevant tag
current:
	@echo $(v)

# Increase the patch version
patch:
	@echo $(shell echo $(v) | awk -F. -v OFS=. -v f=3 '{ $$f++  } 1')

# Increase the minor version
minor:
	@echo $(shell echo $(v) | awk -F. -v OFS=. -v f=2 '{ $$f++  } 1' | awk -F. -v OFS=. -v f=3 '{ $$f=0 } 1')

# Increase the major version
major:
	@echo $(shell echo $(v) | awk -F. -v OFS=. -v f=1 '{ $$f++  } 1' |awk -F. -v OFS=. -v f=2 '{ $$f=0 } 1'|awk -F. -v OFS=. -v f=3 '{ $$f=0 } 1')
