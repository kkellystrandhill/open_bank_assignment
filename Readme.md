# Open banking V2.2 task

## Instructions

```
Create a NODE JS API using Express JS 4
Create branches GET endpoint which takes bank branch location as a header e.g lbg-branch-location: ‘London’
You will need to validate your lbg-txn-branch-location header that the value is a string and not null (maybe a piece of middleware that uses Joi validation library)
Should include error response handling for invalid header
Your API should then call this downstream OB branches publicly accessible endpoint https://api.lloydsbank.com/open-banking/v2.2/branches using Axios
Your API should be able to filter/map the result to only give bank branches based on that value you get from lbg-branch-location header
Your API should return a response of the branch data for that given location
You will need to test your API using Supertest and Jest, think about the scenarios that you will need to cover
You should also attempt to mock the downstream call to OB branches endpoint using Axios-mock to intercept the call and give your defined response
This code should be available in Git repo for review with good branching hygiene (relevant/meaningful commit messages so it’s easy to roll back code if necessary)
```
