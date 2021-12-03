echo "cleaning watchman"
watchman watch-del-all
echo "removing node_modules"
rm -rf node_modules
echo "installing libs"
yarn install
echo "Reset Metro's cache"
yarn start --reset-cache
echo "Remove cache"
rm -rf /tmp/metro-*
