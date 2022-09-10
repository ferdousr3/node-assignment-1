# User API

Live API Link [user API](https://user-zeta.vercel.app/).

## Details Details

User Api for Random All user, Random A User, Update a User, Update Multiple Users, Delete A user

## 1. Get A Random user:

```
https://user-zeta.vercel.app/user/random
```

## 2. Get All Random users:

```
https://user-zeta.vercel.app/user/all
```

### Get Limit users:

```
https://user-zeta.vercel.app/user/all?limit=2
```


## 3. Add New User:

```
https://user-zeta.vercel.app/user/save
```

## 4. Update a user :

```
https://user-zeta.vercel.app/user/update
```

## 5. Update multiple users :

```
https://user-zeta.vercel.app/user/bulk-update
```

## 6. Delete a user :

```
https://user-zeta.vercel.app/user/delete
```

---

### update & delete a user data :

```
{
    "id": "26",
    "gender": "female",
    "name": "kampala",
    "address": "dhaka,bangladesh",
    "contact": "01722-2222222",
    "photoUrl": "wwww.photo.com"
  }
```

### update multiple users data:

```
[
  {
    "id": "25",
    "gender": "male",
    "name": "kampala",
    "address": "dhaka,bangladesh",
    "contact": "01722-2222222",
    "photoUrl": "wwww.photo.com"
  },
  {
    "id": "26",
    "gender": "female",
    "name": "kampala",
    "address": "dhaka,bangladesh",
    "contact": "01722-2222222",
    "photoUrl": "wwww.photo.com"
  }
]
```
