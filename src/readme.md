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

# Handling Routes

- whenever we use 'use' request handler it matches the all the request that is matched by its handler , the order do matter
- parameters are as defined in the order (err,req,res,next) i.e 2 req,res / 3 re1,res,next / 4 err,req,res,next
  -Always first connect to database and then start the server
- Middleware : Generally we use 'use' request so that it could pass all get post put patch req
- If a data is already added into the database then on that data the validators are not applied. On adding new data only validators are applied


# Difference between PATCH and PUT

| **Aspect**         | **PUT**                    | **PATCH**                 |
|---------------------|----------------------------|---------------------------|
| **Operation**       | Replaces the whole resource | Updates part of the resource |
| **Payload**         | Entire resource data       | Only fields to be updated |
| **Idempotency**     | Yes                        | Yes                       |
| **Use Case**        | Full replacement           | Partial update            |


# Encrypting Passwords

- Validate the data
- Encrypt the data
- To encrypt passwords we will use bcrypt libraray from npm


# Basics
- when we are exporting anything as an object then we have to require the same in form of object only.
