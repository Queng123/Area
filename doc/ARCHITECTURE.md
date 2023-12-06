# API Routes Documentation

## Overview

The project aims to develop a comprehensive software platform that resembles IFTTT and/or Zapier. The platform will consist of three main parts:

1. **Application Server**: Implements all the features described below (see Features).
2. **Web Client**: Allows users to interact with the application through a browser, querying the application server.
3. **Mobile Client**: Enables users to access the application via their mobile phones by querying the application server.

## Features

### User Management

- **Endpoint**: ```/api/users/register```
  - **Method**: ```POST```
  - **Description**: Registers a user on the application to obtain an account.

- **Endpoint**: ```/api/users/confirm-enrollment```
  - **Method**: ```POST```
  - **Description**: Confirms user enrollment on the application after registration.

### Authentication / Identification

- **Endpoint**: ```/api/auth/login```
  - **Method**: ```POST```
  - **Description**: Authenticates the user to use the application.

### Services

- **Endpoint**: ```/api/services/subscribe:<service_name>```
  - **Method**: ```POST```
  - **Description**: Connect the authenticated user to services offered by the application using OAuth2. (e.g. Facebook, Twitter, etc.)

### Action Components

- **Endpoint**: ```/api/actions/list```
  - **Method**: ```GET```
  - **Description**: Retrieves a list of available Action components.

### REAction Components

- **Endpoint**: ```/api/reactions/list```
  - **Method**: ```GET```
  - **Description**: Retrieves a list of available REAction components.

### AREA (Action-REAction Execution)

- **Endpoint**: ```/api/areas/create```
  - **Method**: ```POST```
  - **Description**: Allows the authenticated user to compose an AREA by interconnecting an Action to a previously configured REAction.

### Trigger

- **Endpoint**: ```/api/triggers/activate```
  - **Method**: ```POST```
  - **Description**: Activates triggers to automatically execute AREA based on specified conditions.

# Database Tables Documentation

## Overview
The backend, built with NestJS and PostgreSQL, involves several database tables to support the functionality of the application. Each table is designed to store specific information related to users, services, actions, reactions, areas, and triggers.

## Users Table

- **Table Name**: ```users```
  - **Columns**:
    - ```id``` (Primary Key)
    - ```username``` (Unique)
    - ```password``` (Hashed)
    - ```email```
    - ```phone_number``` (Unique) //In discussion
    - ```created_at```
    - ```updated_at```

## Services Table

- **Table Name**: ```services```
  - **Columns**:
    - ```id``` (Primary Key)
    - ```name```
    - ```description```
    - ```login_url```
    - ```created_at```
    - ```updated_at```

## User_Services Table (Many-to-Many Relationship)

- **Table Name**: ```user_services```
  - **Columns**:
    - ```user_id``` (Foreign Key referencing ```users.id```)
    - ```service_id``` (Foreign Key referencing ```services.id```)
    - ```subscribed_at```
    - ```OAuth2_Token``` (Unique)

## Actions Table

- **Table Name**: ```actions```
  - **Columns**:
    - ```id``` (Primary Key)
    - ```type```
    - ```name```
    - ```icon```
    - ```description```
    - ```created_at```
    - ```updated_at```

## Reactions Table

- **Table Name**: ```reactions```
  - **Columns**:
    - ```id``` (Primary Key)
    - ```type```
    - ```description```
    - ```created_at```
    - ```updated_at```

## Areas Table

- **Table Name**: ```areas```
  - **Columns**:
    - ```id``` (Primary Key)
    - ```user_id``` (Foreign Key referencing ```users.id```)
    - ```action_id``` (Foreign Key referencing ```actions.id```)
    - ```reaction_id``` (Foreign Key referencing ```reactions.id```)
    - ```created_at```
    - ```updated_at```

## Triggers Table

- **Table Name**: ```triggers```
  - **Columns**:
    - ```id``` (Primary Key)
    - ```area_id``` (Foreign Key referencing ```areas.id```)
    - ```condition```
    - ```created_at```
    - ```updated_at```
