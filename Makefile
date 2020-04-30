run:
	@npm run dev

deploy:
	@git push heroku master

proxy:
	@NODE_ENV=development nodemon proxy/proxy.js

.PHONY: proxy deploy run
