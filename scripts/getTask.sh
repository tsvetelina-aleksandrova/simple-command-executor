#!/bin/bash

. "$( dirname $0 )/common.sh"

get_task_id $@

shift

get_port $@

cmd="curl -s http://localhost:${port}/tasks/${task_id}"

echo $cmd

echo `$cmd`
