# Coding Challenge

REST API using Nodejs for Mini-project “AIR QUALITY”

## Steps

**Note**  
`For simplicity purposes, I've used docker to scaffold a project with the required packages, database, and configurations`

### 1) Clone the repository, copy the .env.example file

```
git clone https://github.com/moonsef/air-quality-test
cd air-quality-test
cp .env.example .env
```

**Note**  
Consider filling the `IQAIR_API_KEY` in the `.env` file with `IQAir` API KEY for the API to work correctly

### 2) Start docker container

```
docker-compose up -d --build
```

now the server is up the runnning on [localhost](http://localhost)

## REST API

The REST API to the Mini-project “AIR QUALITY” is described below.

## Get Air Quality

In this endpoint, make a call to IQAIR API to get “air quality “ for the
given zone

### Request

`GET` `/api/air-quality`

```
curl -i http://localhost/api/air-quality?longitude=2.20&latitude=40.20
```

#### Query params:

```
{
    "longitude": "2.20",
    "latitude": "40.20",
}
```

#### Response:

```
{
    "Result": {
        "Pollution": {
            "ts": "2022-10-03T21:00:00.000Z",
            "aqius": 21,
            "mainus": "p2",
            "aqicn": 7,
            "maincn": "p2"
        }
    }
}
```

## Get Air Quality

In this endpoint, get datetime( date and time ) where the paris
zone is the most polluted **(based on your CRON JOB results)**.

### Request

`GET` `/api/air-quality/most-polluted`

```
curl -i http://localhost/api/air-quality/most-polluted
```

#### Response:

```
{
    "Result": {
        "CreatedAt": "2022-10-03T21:48:01.461Z"
    }
}
```
