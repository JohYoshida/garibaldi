# Garibaldi

A simple blog application for a friend traveling overseas!

## Getting Started
1. Clone
```git clone git@github.com:JohYoshida/nodejs-blog.git```
2. Create PG Database
```
sudo su - postgres
psql
CREATE DATABASE my_database_name;
```
3. Create a `.env` file and fill out all fields found in `.env.example`  

## Installation
`npm install`

## Start Server
```npm start```
Visit `localhost:3000`, or whatever `PORT` is set in your `.env`

## Built with
- Node.js
- PostgreSQL
