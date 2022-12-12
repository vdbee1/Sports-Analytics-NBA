# Git Notes
Removing something from the repo, but not locally:
https://stackoverflow.com/questions/6313126/how-do-i-remove-a-directory-from-a-git-repository

## Deploy to git pages
https://github.com/gitname/react-gh-pages
# Webapp notes

## Typescript Reference

React Cheat Sheet:
https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

Pathmapping: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping

## Front-end

Background gradient: 
`bgImage="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('Background.jpg')"`

Color Swatch and Theme creation: https://smart-swatch.netlify.app/#F7EDE2

Calendar component: https://codesandbox.io/s/white-breeze-rer8g2?file=/src/Calendar.js

Framer-motion animation:
- Tutorial: https://eliaslog.pw/framer-motion-start-animation-hover/

Chakra:
https://chakra-ui.com/docs/components/button

NBA API: https://www.npmjs.com/package/nba-api-client

Hexmap Creation: 
- https://naughty-neumann-fb4b06.netlify.app/player/lebron
- https://github.com/yuriihorodnyi21/NBA-Stas-Dashboard/blob/main/src/components/ShotCharts.js

# Server Environment

Set environment variables
```
export NAME=VALUE
```




# Server-Node.js

ExpressJS reference:
https://expressjs.com/en/guide/routing.html

To kill a Node.js process:
```
lsof -i tcp:3000
```

# Docker 

## Accessing

### Manually accessing Server through Docker:
```console
docker exec -it {CONTAINER_NAME} mariadb --user root -p{PASSWORD}
```


### Connecting from outside the container
Find the IP address:
```console
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadbtest
```
The above returned: `172.17.0.2` for our server.

Excerpt [from the MariaDB docs:](https://mariadb.com/kb/en/installing-and-using-mariadb-via-docker/)
>After enabling network connections in MariaDB as described above, we will be able to connect to the server from outside the container.

>On the host, run the client and set the server address ("-h") to the container's IP address that you found in the previous step:
>```
>mysql -h 172.17.0.2 -u root -p
>```
>This simple form of the connection should work in most situations. Depending on your configuration, it may also be necessary to specify the port for the server or to force TCP mode:
>```
>mysql -h 172.17.0.2 -P 3306 --protocol=TCP -u root -p
>```

## Database management
### Uploading data to MariaDB Container
```
docker exec -i mysql-container mysql -uuser -ppassword name_db < data.sql
```
From: https://stackoverflow.com/questions/43880026/import-data-sql-mysql-docker-container

# MariaDB/SQL

## Setup 

### Setting up MariaDB in Docker

[From the MariaDB docs](https://mariadb.com/kb/en/installing-and-using-mariadb-via-docker/)


### Credentials for `mariadbtest`
Name of container: `mariadbtest`
PORT: 3306e

**Root credentials:**
USER: `root`
PASSWORD: `mypass`

**Gavin's credentials**
USER: `gavinsta`
PASSWORD: `mypass`

**App credentials**
USER: `app`
PASSWORD: `not@$ecret`


## Starting and Stopping the server:

https://mariadb.com/kb/en/systemd/

---
## Permissions

### GRANT notes
`GRANT ALL` examples:
```sql
--For Local access
grant all privileges on DATABASE_NAME.* TO 'USER_NAME'@'localhost' identified by 'PASSWORD';
--For all access
grant all privileges on DATABASE_NAME.* TO 'USER_NAME'@'%' identified by 'PASSWORD';
```
`GRANT` specific permissions:

For `'app'`:
```sql
grant select,insert,update on NBA_APP.users to 'app'@'localhost'
```
### CREATE user notes
```sql
CREATE user 'USER_NAME'@'%' identified by 'PASSWORD'
```


From: https://docs.bitnami.com/aws/infrastructure/jruby/configuration/create-database-mariadb/


## Data handling

### Loading data into databse from CSV

```sql
LOAD DATA LOCAL INFILE 'source.csv' INTO target_db.target_table FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';
```
https://www.simplified.guide/mysql-mariadb/import-csv

For our `playerStats_perGame_22_23` table, the data was loaded like so:

```sql
--@block Insert data from csv
LOAD DATA LOCAL INFILE '/Users/gavinlau/Documents/MDSA/DATA604/NBA_app/basketball_data/playerstats-22.csv' INTO TABLE NBA_APP.playerStats_perGame_22_23 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (
  --Dummy variable for the 'rank' column of the CSV
  @discardRK,
  Player,
  Pos,
  Age,
  Tm,
  G,
  GS,
  MP,
  FG,
  FGA,
  FGcent,
  3P,
  3PA,
  3Pcent,
  2P,
  2PA,
  2Pcent,
  eFGcent,
  FT,
  FTA,
  FTcent,
  ORB,
  DRB,
  TRB,
  AST,
  STL,
  BLK,
  TOV,
  PF,
  PTS,
  Player_additional
);
```
## Import/Export data

https://www.digitalocean.com/community/tutorials/how-to-import-and-export-databases-in-mysql-or-mariadb

## `NBA_APP` database managment

### Table: `users`
This table will be used for registering users of the app. 
The table was created like so:
```sql
CREATE TABLE NBA_APP.users( 
  name VARCHAR(50) not null, 
  email VARCHAR(50) not null unique, 
  password VARCHAR(50) not null, 
  team_id VARCHAR(50),
  primary key(email));
```
#### New User Registration
We check for user registrations like so:

```sql
Select EXISTS(SELECT * From users where email = "") as userExists;
```
Once users 'register,' an SQL command inserts the new user's info like so:
```sql
insert into NBA_APP.users VALUES (
  'Gavin Lau',
  'gavin@datanerds.lol',
  'notsecure',
  null
  );

```

## MariaDB Node.js connector
https://www.section.io/engineering-education/getting-started-with-mariadb-using-docker-and-nodejs/

## Troubleshooting Links
- Problem: Issues with app having the appropritate permissions when constructing a team-view
    - Solution from [GRANT INSERT on tables participating in an updateable view](https://stackoverflow.com/questions/45675205/grant-insert-on-tables-participating-in-an-updateable-view)
- 

# Simulation and Math notes
[Box Mueller transformation for simulating player values in Javascript](https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve)

# Future explorations

- Honeybadger.io
