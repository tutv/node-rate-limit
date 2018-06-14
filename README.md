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

With rate-limiting is 30 req/minute.
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
Time taken for tests:   0.297 seconds
Complete requests:      200
Failed requests:        30
   (Connect: 0, Receive: 0, Length: 30, Exceptions: 0)
Non-2xx responses:      170
Total transferred:      57460 bytes
HTML transferred:       3970 bytes
Requests per second:    672.54 [#/sec] (mean)
Time per request:       74.344 [ms] (mean)
Time per request:       1.487 [ms] (mean, across all concurrent requests)
Transfer rate:          188.69 [Kbytes/sec] received
```