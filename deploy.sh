#!/bin/sh
git checkout source
npm run build
mkdir -p ../tmpdeploy
rm -R ../tmpdeploy/*
cp -R public/* ../tmpdeploy/
git checkout master
cp -R ../tmpdeploy/* .
