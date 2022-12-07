# Shatzën Scrum Poker

Shatzën is a Scrum poker app that allows distributed teams to run Scrum poker estimation sessions with ease.

<!-- TOC -->

- [Shatzën Scrum Poker](#shatzën-scrum-poker)
  - [Develop](#develop)
  - [Environment setup](#environment-setup)
    - [MongoDB](#mongodb)
      - [Connect to MongoDB](#connect-to-mongodb)
  - [Adding dependencies](#adding-dependencies)
  - [Commits](#commits)

<!-- /TOC -->

## Develop

For full-stack development:

```sh
npm run dev
```

## Environment setup

1. Install dependencies for all packages: `npm install`
2. Initialize default `.env` files: `npm run init-env`
3. Install and start up the MongoDB service

### MongoDB

To install mongoDB instance please follow these [instructions](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

To run MongoDB (i.e. the mongod process) as a macOS service, run:

```sh
brew services start mongodb-community@6.0
```

To stop a mongod running as a macOS service, use the following command as needed:

```sh
brew services stop mongodb-community@6.0
```

#### Connect to MongoDB

To begin using MongoDB, connect mongosh to the running instance. From a new terminal, issue the following:

```sh
mongosh
```

## Adding dependencies

```sh
npm install <package name> -w=<workspace to install in>
```

```sh
npm update <package> --workspace=<workspace>
```

## Commits

Commits and PR's are linted with the [Conventional Commits spec](https://www.conventionalcommits.org/en/v1.0.0/)

Structure

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Examples

```
feat(scope): Commit message with scope
```

```
docs: Commit message with no body
```

```
feat!: Commit message with scope and ! to draw attention to breaking change

BREAKING CHANGE: omg everything is on fire
```
