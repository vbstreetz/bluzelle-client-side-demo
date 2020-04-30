run:
	@npm run dev

deploy:
	@git push origin master | xargs echo
	@git push heroku master | xargs echo

proxy:
	@NODE_ENV=development nodemon proxy/proxy.js

.PHONY: proxy deploy run
