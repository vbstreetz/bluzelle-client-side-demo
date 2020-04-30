run:
	@npm run dev

deploy:
	@git push origin master | xargs echo
	@git push heroku master | xargs echo

.PHONY: deploy run
