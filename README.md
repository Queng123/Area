# Area
Action ReAction Automation platform of his digital life

## Introduction
The AREA is a platform that allows you to automate your digital life. It is a web/mobile application that allows you to create automations between your favorite applications. For example, you can create an automation that will send you a message on Slack when you receive an email from a specific sender. The platform is based on the IFTTT platform (https://ifttt.com/).

## Installation

### Prerequisites

- Docker version 24.0.7
- Python version 3.10.12
- Git

### Installation

1. Clone the repository
   ```sh
   git clone git@github.com:Circle-of-Masquerade/Area.git
    ```

2. Install Docker
    ```sh
    https://docs.docker.com/get-docker/
    ```

3. Install Python
    ```sh
    https://www.python.org/downloads/
    ```

4. Install Docker Compose
    ```sh
    https://docs.docker.com/compose/install/
    ```

6. Install git
    ```sh
    https://git-scm.com/downloads
    ```

## Usage

### Launch the project
```sh
    # Run this command, it will build the Image and launch the project
    # It will be the only time you'll use docker compose build
    docker compose up
```

### Using the Infrastructure Manager (IM - area)

```sh
./area --help
    usage: area [-h] [-t] [-l] [-u] [-d] [-s] [-c {web,api}] [-p]

    Handle the infrastructure deployed with Docker Compose

    options:
      -h, --help            show this help message and exit
      -t, --test            Run container tests
      -l, --logs            Display logs of a container
      -u, --up              Start the infrastructure
      -d, --down            Stop the infrastructure
      -s, --status          Display the status of the infrastructure
      -c {web,api}, --container {web,api}
                            Container name
      -p, --prune           Delete the containers and the images

```

### Start the project

```sh
    # Start the project
    ./area --up
```

### Stop the project

```sh
    # Stop the project
    ./area --down
```

### Display the status of the project

```sh
    # Display the status of the project
    ./area --status
```

### Display the logs of a container

```sh
    # Display the logs of a container
    ./area --logs --container <container_name>
    # if you don't specify the container name, it will display the logs of all the containers
```

### Run the tests of a container

```sh
    # Run the tests of a container
    ./area --test --container <container_name>
    # if you don't specify the container name, it will run the tests of all the containers
```

### Delete the containers and the images

```sh
    # Delete the containers and the images
    ./area --prune
```

## Notes

When deployed, through docker-compose or area script, the code can still be modified and the changes will be applied automatically.

## Contributing

Wanna contribute to the project ? You're welcome ! Just follow the steps below.
Read the [CONTRIBUTING.md](doc/CONTRIBUTING.md) file for further information.
Also, read the [CODE_OF_CONDUCT.md](doc/CODE_OF_CONDUCT.md) file for the code of conduct.
Then read the [GETTING_STARTED.md](doc/GETTING_STARTED.md) file to get started.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
