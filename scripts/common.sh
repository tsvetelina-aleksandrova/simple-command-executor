#!/bin/bash

get_port ()
{
  local default_port=4000
  local min_port=1
  local max_port=65535
  port="${default_port}"

  if [ -z "$1" ]
    then
      echo "Using default port ${default_port}"
      return
  fi

  if [ $1 -lt $min_port ] || [ $1 -gt $max_port ]
    then
      echo "$1 is not a valid port. Fallback to ${default_port}"
    else
      echo "Using user specified port $1"
      port="$1"
  fi
}

get_task_id()
{
  task_id=$1

  if [ -z "$task_id" ]
    then
      echo "Task ID is required"
      exit 1
    else
      echo "Task ID is set to ${task_id}"
  fi
}
