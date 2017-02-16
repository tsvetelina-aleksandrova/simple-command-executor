#!/bin/bash

. "$( dirname $0 )/common.sh"

get_task_id $@

shift

get_port $@

cmd="curl -s -d \"\" http://localhost:${port}/tasks/start/${task_id}"

echo $cmd

echo `$cmd`
