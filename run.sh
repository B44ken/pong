zip -r0 ../pong.zip . -x '.git/* .git/*/* node_modules/* '
ssh root@p27.ca 'rm -rf /var/www/pong'
scp ../pong.zip root@p27.ca:/var/www/pong.zip
ssh root@p27.ca 'kill $(pidof node); \
cd /var/www; \
unzip pong.zip; \
cd pong; \
sudo node app.js'