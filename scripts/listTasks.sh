#!/bin/bash

. "$( dirname $0 )/common.sh"

get_port $@

cmd="curl -s http://localhost:${port}/tasks"

echo $cmd

echo `$cmd`
