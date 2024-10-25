# USERS PORTAL

Given two files `app.js` and a database file `users.db` consisting of three table `users`.

Write APIs to perform operations on the tables `users` only after authentication of the user.

The columns of the tables are given below,

**User Table**

| Columns    | Type      |
| ---------- | --------  |
| id   | INTEGER         |
| name | VARCHAR(200)    |
| email | VARCHAR(200)   |
| password | VARCHAR(200)|
| address | VARCHAR(200) |
| phone | VARCHAR(100)   |
| created_at | DEFAULT TIMESTAMP |
| updated_at | DEFAULT TIMESTAMP |



#### Sample Valid User Credentials

```
{
  "username": "Patnala Chaitanya",
  "password": "Chaitu@123"
}
```

### API 1

#### Path: `/login/`

#### Method: `POST`

**Request**

```
{
  "username": "Patnala Chaitanya",
  "password": "Chaitu@123"
}
```

- **Scenario 1**

  - **Description**:

    If an unregistered user tries to login

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid user
      ```

- **Scenario 2**

  - **Description**:

    If the user provides an incorrect password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid password
      ```

- **Scenario 3**

  - **Description**:

    Successful login of the user

  - **Response**

    Return the JWT Token

    ```
    {
      "jwtToken": "ak2284ns8Di32......"
    }
    ```

### Authentication with Token

- **Scenario 1**

  - **Description**:

    If the token is not provided by the user or an invalid token

  - **Response**
    - **Status code**
      ```
      401
      ```
    - **Body**
      ```
      Invalid JWT Token
      ```

- **Scenario 2**
  After successful verification of token proceed to next middleware or handler

### API 2

#### Path: `/users/`

#### Method: `GET`

#### Description:

Returns a list of all users in the user table

#### Response

```
[
  {
    "id": 1,
    "name" : "chaitanya",
    "email" : "chaitanyapatnala2002@gmail.com",
    "password" : "Chaitu@123",
    "address" : "Allipuram Kummarivedhi",
    "phone" : "7569058564"
  },

  ...
]
```

### API 3

#### Path: `/users/:userId/`

#### Method: `GET`

#### Description:

Returns a user based on the user ID

#### Response

```
{   "id" : 2
    "name" : "chaitanya",
    "email" : "chaitanyapatnala2002@gmail.com",
    "password" : "Chaitu@123",
    "address" : "Allipuram Kummarivedhi",
    "phone" : "7569058564"
}
```

### API 4

#### Path: `/users/:userId/`

#### Method: `DELETE`

#### Description:

Deletes a user from the users table based on the User ID

#### Response

```
User Removed

```

### API 5

#### Path: `/users/:userId/`

#### Method: `PUT`

#### Description:

Updates the details of a specific user based on the User ID

#### Request

```
{
  
    "name" : "saikumar",
    "email" : "saikumar2002@gmail.com",
    "password" : "Sai@123",
    "address" : "Allipuram Kummarivedhi",
    "phone" : "7569545452"

}
```

#### Response

```

User Details Updated

```



<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
