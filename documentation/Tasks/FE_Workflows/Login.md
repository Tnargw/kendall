# **Login.hmtl - Workflow**

## **Assigned Group Member**
Ashley DeMott
- **Webpage:** login.html
- **UI Elements:** [Assign Week/Due Date]
- **Workflows/User Stories** [Assign Week/Due Date]
- **API Calls:** [Assign Week/Due Date]
- **Test Cases:** [Assign Week/Due Date]

---
## **Overview**
- Describe the purpose and expected user interactions for the given workflow.
- Example: "The login page allows users to enter their credentials and authenticate with the system."
The login page allows the user to login, resgister, or reset their password. Verification is done by sending an email to . 

## **UI Elements**
There are several sections of the login page which can be navigated between using buttons.

### Login
- Form with "username" and "password" fields. Credentials used to verify a user.
- "Create Account" button, shows "Registration" section
- "Forgot Password" button, shows "Password Reset - Prompt username/email" section
- "Login" button, sends network request to back-end to verify credentials. If login is successful, navigates to home page of the time management application (currently calendar.html). Otherwise, shows error message "invalid credentials"

### Registration
- "Return to Login" button, shows "Login" section
- Form with "email", "username", and "password" fields. Used to create an account and send a verification code.
- "Create Account" button, sends network request to back-end to create an account. After success, shows "Login" section [Stretch Goal] After successful form submission, shows "Verification" section (account's email address must be verified before user can login/use the account)

### Password Reset - Prompt username/email
- "Cancel/Return to Login" button, shows "Login" section
- Form with "email" field
- "Continue" button, sends network request to back-end to send a verification code to the given email (if account exists). After successful request, shows "Verification" section

### Password Reset - enter new password
- "Cancel/Return to Login" button, shows "Login" section
- Form with "email" and "new password"x2 fields (entered twice by user, send only one). Email field can be autofilled from previous "Verification" section
- "Update Password" button, sends network request to back-end to update the given user's password. After success, shows "Password successfully updated" message and shows "Login" section

### Verification
- "Cancel/Return to Login" button, shows "Login" section
- Form with "email" and "verification code" field. Used to check against code sent by server to the given email. Email field can be autofilled from previous "Password Reset - Prompt username/email" section
- "Verify" button, sends network request to back-end to compare code entered with code sent to user's email

---
## **Process & Workflow**
- Describe required user inputs and expected data formats.
- Outline step-by-step user interactions and system responses.
- Define how the UI responds to user actions.

### Login
- Enter credentials (username and password)
- Click "Login" button
- Sends Login request to backend
- If correct, go to home page of time management application (currenlty calendar.html)
- If incorrect, shows error message "invalid credentials"

### Registration
- Click "Create Account" button to navigate to "Registration" section
- Enter email, username, and password
- Click "Create Account"
- If successful, sent back to login page
- If not successful, shown error message and asked to try again

### Reset Password
- Click "Forgot Password" button to navigate to "Reset Password - Prompt username/email" section
- Enter email
- Click "Continue" button
- Enter verification code sent to email
- Click "Verify" button
- If correct, sent to "Reset Password - enter new password"
- If incorrect, shown error message and asked to try again
- Enter new password twice
- Click "Update Password" button
- If successful, sent back to login page
- If not successful, shown error message and asked to try again

### Password Requirements
- Password must contain special characters, a capital letter, etc

---
## **API Calls & Data Handling**
- Define the API interactions required for this workflow.

### Login
#### Request
- **Purpose:** Sends user-entered username and password to be verified
- **Endpoint:** `POST /login` [Double check with back-end!]
- **Request Payload:**
  ```json
  {
    "username": "user123",
    "password": "securePass"
  }
  ```
#### Response
  - **Response Payload:**
*If error, otherwise success message?*
  ```json
  {
    "error": "error message"
  }
  ```
  - **Success determined by:** If the username and password match an existing account in the DB
Response Handling
  - **Success:** Redirect to dashboard [for now, calendar.html. Later will be announcements.html (can rename to dashbaord)]
  - **Failure:** Display error message "Invalid login" and allow user to attempt login again

### Send Verification Code to Email
#### Request
- **Purpose:** To send a randomized verification code if there is an account associated with the user-entered email address. If the email doesn't have an account, the user will learn that when they don't recieve a code
- **Endpoint:** `POST /verify` [Double check with back-end!]
- **Request Payload:**
  ```json
  {
    "email": "userEmail@host.com"
  }
  ```
#### Response
  - **Response Payload:**
*If error, otherwise success message?*
  ```json
  {
    "error": "error message"
  }
  ```
  - **Success determined by:** If there are no network errors
Response Handling
  - **Success:** Show "Enter verification code" section, prompt for code
  - **Failure:** Display network error code and message

### Verify Code
#### Request
- **Purpose:** To verify the user has access to the email associated with their account
- **Endpoint:** `POST /verify/code` [Double check with back-end!]
- **Request Payload:**
  ```json
  {
    "verify-code": "12345"
  }
  ```
#### Response
  - **Response Payload:**
*If error, otherwise success message?*
  ```json
  {
    "error": "error message"
  }
  ```
  - **Success determined by:** If the user-enterd code matches the code that was sent via-email
Response Handling
  - **Success:** A. Show "Reset Password" section or B. Redirect to dashboard [Depends on if user is being verified to reset their password or create an account. Front-end caches what the target is?]
  - **Failure:** Display error message "Code doesn't match", maximum of #(2 or 3?) attempts

### Create Account
#### Request
- **Purpose:** Sends information needed to create an account in the database
- **Endpoint:** `POST /account/create` [Double check with back-end!]
- **Request Payload:**
  ```json
  {
    "email": "userName@hosted.com",
    "firstName": "First",
    "lastName": "Last",
    "password": "hashedPass"
    [TODO: Should the user join an organization when their account is created or in a different page?]
  }
  ```
#### Response
  - **Response Payload:**
*If error, otherwise success message?*
  ```json
  {
    "error": "error message"
  }
  ```
  - **Success determined by:** If account creation was successful
Response Handling
  - **Success:** Show "verify code" section
  - **Failure:** Show error message "Account couldn't be created" and message if given [If back-end specifies that the verification email couldn't be sent, or if account already exists, or general network error]

### Update Password
#### Request
- **Purpose:** To update the user's password
- **Endpoint:** `POST /account/{user-id}/password` [Double check with back-end!]
- **Request Payload:**
  ```json
  {
    "userEmail": "userName@hosted.com",
    "newPassword": "hashedPassword"
  }
  ```
#### Response
  - **Response Payload:**
*If error, otherwise success message?*
  ```json
  {
    "error": "error message"
  }
  ```
  - **Success determined by:** If the user's password is updated in the database
Response Handling
  - **Success:** Show a "Successfully updated password" pop-up and show "Login" section to prompt user to login with new credentials
  - **Failure:** Show error message "Password couldn't be updated" and message if given [If back-end specifies: account doesn't exist, general network error]

---
## **Test Cases and Error Handling**
- Identify potential failure points and system responses.
- Define necessary test cases, including successes, failures, and edge cases

### User Input
| Input | Process | Output |  Reasoning |
| :--: | :--: | :--: | :--: |
| **Login** - Valid username and password combination | Sent in a Login request to back-end server | Login successful, navigates to home page of webapp | User was verified with existing set of credentials |
| **Login** - Invalid password | Sent in a Login request to back-end server | Login unsuccessful, shows error message | The password did not match the username |
| **Login** - Invalid username | Sent in a Login request to back-end server | Login unsuccessful, shows error message | The username was not an account found in the database |
| **Reset Password - Prompt email** - Invalid email format | Caught in JS function that checks for @###.### format on front-end | Shows error message "Invalid email format" | The email does not fit email format, an email can't be sent |
| **Reset Password - Prompt email** - Email not in database | Sent in a Send Verification Code request to back-end server | [Front-end] User sent to Verify ode section [Back-end] No email is sent | There is no account to reset a password for, but we don't need to reveal those details to the user |
| **Reset Password - Prompt email** - Email in database | Sent in a Send Verification Code request to back-end server | [Front-end] User sent to verify code section [Back-end] Email sent with randomized alphanumeric code | The user can be verified with the code sent to their account's email |


[Add to table]
- [Reset Password] Invalid new password (doesn't meet complexity requirements)
### Account Errors
- [Create Account] Account already exists
- User does not have permissions to view/do action (employee trying to do an admin related API request)
- User is not logged in (determined either through cached id (front-end is responsible for tracking) or server ip/id table (back-end is responsible for tracking))
### Network Errors
[Define for each page? Or send to an error page/handled with 404 page?]
- Can't connect to server
- Request took too long/did not recieve response

---
## Notes
- Additional items should be added to test cases, currently not a full list.

*This document should be maintained and updated regularly as workflows develop and evolve.*
