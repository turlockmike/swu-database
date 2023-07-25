# swu-database
Database of all cards from the Star Wars Unlimited Game by FFG 

Install via npm or your favorite package manager

```
npm install swu-database
```

Files will be available in /data/sets

Or you can import the cards directly

import {SOR} from 'swu-database'

# Contributing

Update one of the files, then run
```
pnpm convert data/sets/SOR/SOR.json
```

It will automatically convert to all the other formats.


