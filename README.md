# movie_guru
### a movie rating app built for 2DV513 Database Theory final project
##### by Niall Thurrat (nt222fc)

### Prerequisites
- Node and npm installed
- MySql Connection

### Installation instructions
1.	Download/clone source code from github to local machine
2.	Use dump file to restore db in mysql
    1.	create an empty MySQL database first called movie_guru. I suggest the following settings to avoid having to change code in the app:
        1. host: localhost
        2. user: root
        3. password: T3stP4ssword
        4. port: 3306
        5. database: movie_guru
    2. then run command: mysql -u [username] -p [database name] < [dump file path]\movie_guru_dump_20200830.sql
    3. and enter password when prompted
3.	Change port/username/password in db.env file (ONLY if you have not used the suggested settings above)
4.	Run "npm install" in root folder of project
5.	Run "npm start"
6.	Open webapp in browser (e.g. localhost:3000)
7.	Register and login to start rating movies... OR use test user credentials as below:
- username: user1, password: testP1 (this user is over 18 years old and can rate all movies)
- username: user2, password: testP2 (this user is 17 years old and cannot rate certificate 18 movies, i.e. see’s results from the under_18_movies view in ‘My Page’ and ‘Rate Movies’)
- username: user3, password: testP3 (this user is 10 years old and cannot rate certificate 18 or 15 movies, i.e. see’s results from the under_15_movies view)

### Demo video for Movie Guru app
This can be found:
- on YouTube at https://youtu.be/09iThXvfApU, or....
- in the project root folder (DEMO-movie_guru-20200830_012213.mp4).

