# Simple command executor
A simple remote OS command executor in node.js controlled over REST API
## Description
Create a simple remote OS command executor in JS(nodejs) controlled over simple REST api. Please use plain node http.Server or as most Express. Persistency is not required.

When started, it should listen on some port and url like /tasks and should accept the following REST commands:

1. GET /tasks -> return map of all task definitions  with their current status.

2. GET /tasks/:id –> return task definition of this task, with current status. Valid statuses are CREATED, RUNNING, COMPLETED, FAILED.

Status COMPLETED should be se once the OS command completes successfully, FAILED is if it failed ( return code > 0)

3. POST /tasks -> accept task definition that includes the OS command and return task definition with status.

Provide curl/wget commands to start a task, to list all tasks and to query information of specific tasks.
