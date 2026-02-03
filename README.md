# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

| File or Folder | Purpose                              |
| -------------- | ------------------------------------ |
| `app/`         | content for UI frontends goes here   |
| `db/`          | your domain models and data go here  |
| `srv/`         | your service models and code go here |
| `package.json` | project metadata and configuration   |
| `readme.md`    | this getting started guide           |

## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).

## Learn More

## Using Redis with Docker Compose Locally

To start Redis locally for this project, you can use the provided `docker-compose.yml`. This is especially useful because the `package.json` already configures `localhost:6379` as the Redis host under `cds.requires.caching.[development].credentials`.

#### Example configuration in `package.json`

```json
   "caching": {
      "impl": "cds-caching",
      "namespace": "caching",
      "store": "redis",
      "kind": "cds-caching",
      "[development]": {
         "credentials": {
            "host": "localhost",
            "port": 6379
         }
      }
   }
```

You can adjust this configuration as needed for your local Redis setup.

### Steps

1. Make sure you have docker installed and running.
2. Start Redis from the project directory with:

   ```sh
   docker compose up -d
   ```

   This will start a Redis container in the background, accessible at `localhost:6379`.

3. To verify if it's running use:

   ```sh
   docker ps
   ```

4. Start your application as usual (e.g., with `npm run watch:withmtx`). It will automatically use the local Redis server.

### Notes

- To stop the container:

  ```sh
  docker compose down
  ```

- The Redis configuration can be found in the `package.json` under the `cds.requires.caching` section.

For more information about Docker Compose, see the official [documentation](https://docs.docker.com/compose/).

---

Learn more at https://cap.cloud.sap/docs/get-started/.
