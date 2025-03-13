# Graduate Job Recommendations Coding Challenge

Simple recommendations algorithm to match graduates to their perfect job

## Installation

Install the dependencies using `npm`. From the project's directory, run:

```bash
$ npm install
```

Currently tested on node LTS (16.15.1).

## Running the code

Scripts have been provided in `package.json` for running builds, tests, and the server. To compile the code and
run the server run:

```bash
$ npm start
```

## The API

To see the job recommendations for all members send a GET request to the following endpoint:

```bash
http://localhost:3000/recommendations
```

For each member you can also send a GET request to the following endpoint:

```bash
http://localhost:3000/recommendations/:memberName
```

For example to see Joe's recommended job(s) go to the endpoint:

```bash
http://localhost:3000/recommendations/joe
```

## Notes

### Job Scoring Logic

Each job is assigned a score for each member based on the following factors:

1. Location Matching:
    - If the member’s bio includes a specific location (e.g., "London"), this is matched to the job location. If there is a match, 2 is added to the score.
    - If the bio mentions relocation (e.g., "looking to relocate to London"), all jobs that have a location are given 1 is added to the score.
2. Job Type Matching: This step checks if the job title contains relevant keywords like "developer", "designer", or "marketing". 3 is added to the score for a match.
3. Internship: If the member's bio mentions "internship", jobs with a title that includes "internship" are given +1 to the score.

Each of the jobs then receive a total score and the jobs are then ranked by relevance to the individual candidate.

### Summary

Data Fetching: The data for members and jobs is fetched from the provided APIs using axios.
Recommendation Logic: The recommendation system is based on job location and keywords from the member's bio (e.g., job titles and location).
API: The server provides job recommendations based on the member’s name and matches the jobs using a simple scoring system.

### Challenges

If I was to spend more time on this then the next steps would be:

1. To include alternate naming in the scoring system for example the following keywords used in a members bio should be equivalent 'designer' and 'design'.
2. To include negative keyword searching for location, for example outside of London should not include jobs from london but should include all other jobs.
3. If there was a larger pool of data then seniority of the job would be a factor, currently I've just checked for internship but this can easily be expanded to include other levels of role such a 'senior' or 'lead' etc..
