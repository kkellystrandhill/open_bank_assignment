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

## Create project

# empty project commit

```
commit hash# eea7652bd6b46739af8beba5c95915472468c4c2
```

## Create ReadMe file with task definition

# Tasks

1. Create ReadMe file with task definition

```

## Test open banking availability and if available, update readme.md with retured data object definition and sample data for testing

```

commit hash# 1b6dc157984470949b4146383cd33ea3cc613174

```

# Tasks

```

1. Using postman, execute API to see if data is returned.
2. If data is returned idenify format of data.
3. Save some/all data to use with supertest/jest

```

# Open-banking V2.2 returned data format

```

Object definition:

meta: {
LastUpdated: 2022-03-28T14:27:34.354Z,
TotalResults: 807,
Agreement: Use of the APIs and any related data will be subject to the terms of the Open Licence and subject to terms and conditions,
License: https://www.openbanking.org.uk/open-licence,
TermsOfUse: https://www.openbanking.org.uk/terms
},
data: [
{
Brand: [
{
BrandName:
Branch: [
{
Identification:
SequenceNumber:
Name:
Type:
CustomerSegment: [],
Availability: {
StandardAvailability: {
Day: [
{
Name:
OpeningHours: [
{
OpeningTime:
ClosingTime:
}
]
}
]
}
},
ContactInfo: [
{
ContactType:
ContactContent:
}
],
PostalAddress: {
AddressLine: [],
TownName:
CountrySubDivision: [],
Country:
PostCode:
GeoLocation: {
GeographicCoordinates: {
Latitude:
Longitude:
}
}
}
},
}
}

Sample data:
meta: {
LastUpdated: 2022-03-28T14:27:34.354Z,
TotalResults: 807,
Agreement: Use of the APIs and any related data will be subject to the terms of the Open Licence and subject to terms and conditions,
License: https://www.openbanking.org.uk/open-licence,
TermsOfUse: https://www.openbanking.org.uk/terms
},
data: [
{
Brand: [
{
BrandName: Lloyds Bank,
Branch: [
{
Identification: 77952700,
SequenceNumber: 00,
Name: STROOD,
Type: Physical,
CustomerSegment: [
Personal,
Business
],
Availability: {
StandardAvailability: {
Day: [
{
Name: Monday,
OpeningHours: [
{
OpeningTime: 09:00,
ClosingTime: 15:30
}
]
},
{
Name: Tuesday,
OpeningHours: [
{
OpeningTime: 09:00,
ClosingTime: 15:30
}
]
},
{
Name: Wednesday,
OpeningHours: [
{
OpeningTime: 09:00,
ClosingTime: 15:30
}
]
},
{
Name: Thursday,
OpeningHours: [
{
OpeningTime: 09:00,
ClosingTime: 15:30
}
]
},
{
Name: Friday,
OpeningHours: [
{
OpeningTime: 09:00,
ClosingTime: 15:30
}
]
}
]
}
},
ContactInfo: [
{
ContactType: Phone,
ContactContent: +44-3456021997
}
],
PostalAddress: {
AddressLine: [
129-131 HIGH STREET
],
TownName: ROCHESTER,
CountrySubDivision: [
KENT
],
Country: GB,
PostCode: ME2 4TW,
GeoLocation: {
GeographicCoordinates: {
Latitude: 51.39584,
Longitude: 0.4939
}
}
}
},
}
}

```

## Simple server and test with jest and supertest

```

commit hash f4e086cf53811e6ad52129d5d2ca7e975dae2566

```

# Tasks
```

1. Create express app
2. Create jest/supertest test
3. Confirm test executes successfully

## Create server to retrieve all branches and test with jest and supertest

```
commit hash# 463b41da25c36c8f20c85f736830f1d81afbbf7c
```

# Tasks

1. Create Axios request
2. Use postman to get test data from api
3. Create jest/supertest test
4. Confirm test executes successfully

## Update server to allow branch selection by location (TownName || CountrySubDivision) using header.lbg-txn-branch-location

```
commit hash# 4b0aeccd3555c3cf3b8403d41c39a34afb366c5a
```

# Tasks

1. filter data to only return data where location (Town || CountrySubDivision) = header.lbg-txn-branch-location
2. Use postman to get branches with location header lbg-txn-branch-location = London from api
3. use data retuned from postman for equality jest/supertest
4. Create jest/supertest test
5. Confirm test executes successfully
6. Use postman to get branches with location header lbg-txn-branch-location = Watford from api
7. use data retuned from postman for equality test jest/supertest
8. Create jest/supertest fails

## Verify header lbg-txn-branch-location is a string and not null

commit hash# 7037d6f181f27c9638382f80ece728b4c8f7b824

# Tasks

1. Create middleware to validate headers["lbg-txn-branch-location"] is string and not null
2. Use Joi schema to validate lbg-txn-branch-location as tring and not null
3. Create jest/supertest tests to test both valid and non valid coombinations

## Mock axios

commit hash#

# Tasks

1. Create axios mock
2. Create jest/supertest mock test
3. Confirm mock test executes successfully
