## Differrence Btw package.json , package.lock.json and node modules

- package.json:

- It stores the dependencies that your project directly uses.
- It also includes other metadata like:
Project name, version, description, scripts, etc.
- It is the primary file for managing project dependencies and configurations.
- Example:

{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1"
  }
}

- package-lock.json:

- It locks the exact versions of the dependencies and their sub-dependencies (dependencies of dependencies).
- Ensures consistent installs across different environments.
- Automatically generated when npm install is run.
- It helps in debugging and dependency management by ensuring the same versions are installed every time.

- node_modules?

- The node_modules folder contains installed dependencies (and their dependencies) as specified in package.json.
- This folder is generated when you run npm install or yarn install.
- It is not meant to be edited manually; instead, manage dependencies through package.json.
- This folder can become quite large because it includes all necessary files for each dependency.