# lab3-stackoverflow

## Development

MongoDB database should be running in order to correctly run the application.

You can run mongoDB docker container with a command

```bash
docker run -d --name <CONTAINER_NAME> -p <YOUR_PORT>:27017 mongo
```

Create `.env` file in `client` and `server` directories

```bash
touch client/.env && touch server/.env

echo "VUE_APP_API_URI=<YOUR_API_URL>" >> client/.env
echo "MONGO_URI=<YOUR_MONGO_URL>" >> server/.env
echo "JWT_SECRET_KEY=<YOUR_SECRET_JWT_KEY>" >> server/.env
```

Install application dependencies

```bash
yarn install-deps
```

To start backend api and frontend development server run

```bash
yarn dev
```
