# An example NodeJS app with rate-limiting algorithm

Backed by Redis and ExpressJS.


## Installation
```
//with yarn
yarn

//with npm
npm i
```

## Test

With rate limit (30 req/minute).
```
#run server
node index.js

#run test
ab -n 200 -c 50 http://localhost:4900/limit

#Ouput

```

Output:
```
Completed 200 requests

Concurrency Level:      50
Time taken for tests:   0.374 seconds
Complete requests:      200
Failed requests:        20
   (Connect: 0, Receive: 0, Length: 20, Exceptions: 0)
Non-2xx responses:      180
Total transferred:      57840 bytes
HTML transferred:       4180 bytes
Requests per second:    535.41 [#/sec] (mean)
Time per request:       93.386 [ms] (mean)
Time per request:       1.868 [ms] (mean, across all concurrent requests)
Transfer rate:          151.21 [Kbytes/sec] received
```