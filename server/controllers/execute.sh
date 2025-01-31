#!/bin/bash
lang=$1
filename=$2

case $lang in
    python) python3 $filename ;;
    java) javac $filename && java ${filename%.*} ;;
    c) gcc $filename -o /tmp/a.out && /tmp/a.out ;;
    cpp) g++ $filename -o /tmp/a.out && /tmp/a.out ;;
    go) go run $filename ;;
    *) echo "Unsupported language" ;;
esac