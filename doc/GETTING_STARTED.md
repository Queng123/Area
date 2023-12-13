# GETTING STARTED

## Requirements

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [git](https://git-scm.com/downloads)
- [Python](https://www.python.org/downloads/)
- [flutter](https://flutter.dev/docs/get-started/install)

## Usage

### Launch the project

```sh
    # Run this command, it will build the Image and launch the project
    # It will be the only time you'll use docker compose build
    docker compose up
```

Look at [README.md](../README.md) for more information about the IM (Infrastructure Manager) called 'area'.
Then you are able to access the web interface at [http://localhost:8081](http://localhost:8081).

## Development

From now on, when you will change code in the 'area_front_web' folder, the changes will be automatically applied to the running container.
The same goes for the 'api' folder.

If you want to work on the mobile app. You have to install SKD and flutter. Then you can run the app with `flutter run` in the `area_front_mobile` folder.
But i recommand you knowing how to developp with flutter and dart before doing that.
The same apply for web and the api.

