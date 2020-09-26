#!/bin/sh
npm run build
mkdir -p ../tmpdeploy
rm -R ../tmpdeploy/*
cp -R public/* ../tmpdeploy/