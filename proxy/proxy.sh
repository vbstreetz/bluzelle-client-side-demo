cp -f ./proxy/nginx.proxy.conf /usr/local/etc/nginx/servers/blz-chain.conf
sudo launchctl unload /Library/LaunchAgents/homebrew.mxcl.nginx.plist || xargs echo
sudo launchctl load /Library/LaunchAgents/homebrew.mxcl.nginx.plist || xargs echo
echo 'done'