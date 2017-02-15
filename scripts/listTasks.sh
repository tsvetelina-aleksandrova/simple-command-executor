#!/bin/bash

. "$(dirname $0)/commons.sh"

get_port $@

cmd="curl -s http://localhost:${port}/tasks"

echo $cmd

echo `$cmd`
