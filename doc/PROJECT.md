# Project: AREA

## Project description
The goal of this project is to create a web application that allows users to create automations between different services. The application will be composed of three main components: a web client, a mobile client, and a backend API. The web client will allow users to create and manage their automations. The mobile client will allow users to receive notifications from their automations. The backend API will allow the web and mobile clients to communicate with each other and with the database.

Every user will have to create an account to use the application. Once logged in, the user will be able to create automations by connecting different services together. For example, the user will be able to create an automation that sends a tweet when they receive a new email. The user will also be able to create an automation that sends a notification to their phone when they receive a new email.


## Technologies

### Backend

- **Language**: TypeScript
- **Framework**: NestJS
- **Database**: PostgreSQL

**Why TypeScript?**
TypeScript is a superset of JavaScript that adds static type definitions to the language. TypeScript is a great choice for large projects because it allows developers to catch errors at compile time instead of at runtime.

**Why NestJS?**
Opting for NestJS over Django can be justified for projects that are centered around the Node.js ecosystem and leverage TypeScript, offering a modern, scalable, and maintainable backend solution.
NestJS, built on top of Express.js, embraces the modular and component-based architecture, providing a familiar structure for developers with experience in frontend frameworks like Angular.
This alignment allows for code reuse and a seamless transition between frontend and backend development. The use of TypeScript enhances code quality, readability, and maintainability by incorporating static typing and modern features. NestJS also supports real-time applications through WebSockets, making it suitable for dynamic and interactive web experiences.
While Django is a robust Python-based framework with a focus on simplicity and rapid development, NestJS is preferred in scenarios where the Node.js ecosystem and TypeScript's advantages are pivotal for the project's requirements, fostering a cohesive and efficient development environment.

<img width="391" alt="image" src="https://github.com/Circle-of-Masquerade/Area/assets/91667138/738b5460-58fb-49ef-a211-f0a980332297">

**Why PostgreSQL?**
Choosing PostgreSQL over MongoDB can be justified for applications that prioritize strong data consistency, complex relational queries, and transactions. PostgreSQL is known for its ACID compliance, providing a robust foundation for applications where data integrity is critical.
Its rich feature set includes support for advanced data types, indexing, stored procedures, and triggers, making it well-suited for projects with complex data models and relationships.
The SQL-based query language is familiar to many developers, facilitating ease of adoption and integration into existing systems. Additionally, PostgreSQL's active open-source community ensures regular updates, extensive documentation, and reliable support.
While MongoDB excels in scalability and flexibility with its NoSQL, schema-less approach, PostgreSQL is the preferred choice when the application demands a mature and reliable relational database system, especially in scenarios where adherence to ACID properties and intricate data relationships is paramount.

### Frontend

- **Language**: TypeScript
- **Framework**: React

**Why TypeScript?**
TypeScript is a superset of JavaScript that adds static type definitions to the language. TypeScript is a great choice for large projects because it allows developers to catch errors at compile time instead of at runtime. (Same as backend)

**Why React?**
Choosing React with TypeScript over Vue with TypeScript can be justified for projects where a highly flexible and widely adopted frontend library is needed, coupled with the benefits of static typing provided by TypeScript. React, developed and maintained by Facebook, boasts a large and active community, a vast ecosystem of libraries, and widespread industry adoption.
The combination of React's declarative approach to building user interfaces and TypeScript's static typing allows for a robust and scalable codebase. TypeScript enhances developer productivity by catching potential errors during development and providing better tooling support.
Additionally, React's component-based architecture and virtual DOM contribute to efficient rendering and improved performance.
While Vue is known for its simplicity, ease of integration, and gradual learning curve, React with TypeScript is often favored in larger, enterprise-level projects where scalability, maintainability, and a wealth of third-party libraries are crucial considerations for long-term success.

Note: We did not recense any experimentations with TypeScript and React because we already used them in previous projects. (JAM, Workshop, etc.)

### Mobile

- **Language**: Dart
- **Framework**: Flutter

**Why Dart?**
Dart is a programming language developed by Google. Dart is a great choice for large projects because it allows developers to catch errors/warnings at compile time instead of at runtime. Dart is also used by Flutter which is a great choice for large projects.

**Why Flutter?**
Choosing Flutter over React Native can be justified for projects that prioritize a single codebase for building natively compiled applications with a focus on a highly expressive and customizable user interface. Flutter, developed by Google, distinguishes itself with a comprehensive set of pre-designed widgets, a reactive framework, and a compiled, ahead-of-time (AOT) compilation, which can result in enhanced performance and a more consistent user experience across platforms.
Dart, the language used by Flutter, offers a strongly typed environment, facilitating better code quality and maintainability. Flutter's "hot reload" feature allows developers to see changes instantly, fostering a faster development cycle.
While React Native, maintained by Facebook, enjoys a larger community and broader industry adoption, Flutter may be preferred when aiming for a polished and consistent UI across different platforms without compromising on performance.
Since the application is high-level and does not require a lot of native features, Flutter is a great choice for this project.

Note: We did not recense any experimentations with Dart and Flutter because we already used them in previous projects. (Hub Project, Part-Time, etc.)

## AREA (Action-REAction Execution) Features

As we saw, the main purpose of the application is to allow users to create automations between different services. The application will be composed of several services, actions, reactions, and triggers. The user will be able to create an automation by connecting an action to a reaction. The action will be triggered by a trigger. For example, the user will be able to create an automation that sends a tweet when they receive a new email. The user will also be able to create an automation that sends a notification to their phone when they receive a new email.


#### Service:

- **Github**
- **Discord**
- **Spotify**
- **Deezer**
- **Google**


#### Actions:

- **Github**
  - Star a repo
  - Opened PR

- **Spotify**
    - Spotify like a song

- **Deezer**
    - Deezer like a song

- **Google**
    - Receive a mail

- **Discord**
    - Join a new server

- **Weather**
    - Temperature below a certain value

#### Reactions:

- **Spotify**
    - Play a song
    - Send a song recommendation
- **Google**
    - Send a mail
- **Deezer**
    - Send a song recommendation
- **Github**
    - Change your status
