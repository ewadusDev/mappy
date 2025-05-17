# ENV FILE

DATABASE_URL=postgres://mappyadmin:mappypassword@localhost:5432/mappy_db
MINIO_PROTOCAL=http
MINIO_ENPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=tOemRRqiSwtWamL1FvTQ
MINIO_SECREY_KEY=Qzffz9jCCARp2o1BzWDfQtkEW36uIlzJV3m2aw82
MINIO_BUCKETNAME=mappy
MINIO_PUBLIC_URL=http://localhost:9000

# Deployment

1. Run apps

```bash
   docker compose up -d
```

2. Set up minio database

- Go to http://localhost:9000
- Create Bucket name mappy
- Set public access of bucket

3. Seed database for create table
   method: POST
   body: No body request

```
http://localhost:3000/api/seed
```

4. Go to the application

```
http://localhost:3000
```
