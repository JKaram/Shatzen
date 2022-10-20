# Shatzen

## Scrum poker

Monorepo for shatzen scrum poker app.

More docs to come

## Develop

To develop all apps and packages, run the following command:

```
npm run dev
```

## Install dependencies

```
npm install <package name> -w=<workspace to install in>
```

```
npm update <package> --workspace=<workspace>
```

### MongoDB

To install mongoDB instance please follow these [instructions](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

To run MongoDB (i.e. the mongod process) as a macOS service, run:

```
brew services start mongodb-community@6.0
```

To stop a mongod running as a macOS service, use the following command as needed:

```
brew services stop mongodb-community@6.0
```

#### Connect and Use MongoDB

To begin using MongoDB, connect mongosh to the running instance. From a new terminal, issue the following:

```
mongosh
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
