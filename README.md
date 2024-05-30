# Entera

### Instructions

* Build & Launch project

Edit api/.env and add
```
COLLEGES_CORE_CARD_KEY=YOUR_COLLEGE_KEY
```

Edit web/.env and add
```
NEXT_PUBLIC_GOOGLE_API_KEY=YOUR_GOOGLE_KEY
```

Run:
```
make build
make run
```

Visit http://localhost:3001 and use search with google maps


### Run Specs
```
make rspec
```