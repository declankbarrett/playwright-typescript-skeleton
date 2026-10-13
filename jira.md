Title: Add User: create a new user from the UI
Type: Story
User story As an application user, I want to create a new user with their name, surname, email and position, so they can be assigned to projects.
Scope
• Frontend: an "Add new user" page with Name, Surname, Email and a Position dropdown (Lead Test Engineer, Senior Test Engineer, Test Engineer, Junior Engineer, Lead Developer, Senior Developer, Test Developer, Junior Developer, Business Analyst).
• Backend: POST /users with { name, surname, email, position }. It returns 201 with { id }, 400 for invalid input or 409 for a duplicate email.

Acceptance criteria
AC1: Create a user successfully
• Given I am on the "Add new user" page
• When I fill in all fields with valid data and click "Create user"
• Then the user is saved and I'm taken to the Users page, where the new user is listed
AC2: Missing or invalid fields
• Given I am on the "Add new user" page
• When I leave a field empty, leave the placeholder position selected, or enter an invalid email, then click "Create user"
• Then a validation message appears and no user is created 
AC3: Email already exists
• Given a user with that email already exists
• When I try to create a user with the same email
• Then the user isn't created and the message "A user with this email already exists" appears
AC4: Server error
• Given I am on the "Add new user" page
• When I submit valid details and the server returns an error
• Then an error message appears and the form keeps what I entered
AC5: Special characters
• Given I am on the "Add new user" page
• When I enter a name such as O'Brien or Zoë
• Then the user is saved and displayed exactly as entered

Technical notes
Frontend: add add-user.html and add-user-scripts.js, linked from the Users page.
◦ Check on the page that every field is filled in, the email is valid and a real position is selected.
◦ Submit with jQuery AJAX to POST /users.
◦ If it succeeds, go to the Users page. If it fails, show the API's error message and keep the form values.

Backend: add POST /users.
◦ Repeat the frontend validation and also check the position is in the allowed list.
◦ Return 400 for invalid input, 409 for a duplicate email and 500 for anything else.
◦ Use parameterised queries.
• Database: add a UNIQUE constraint on Users.email.
Test notes
• Create a user with each position. Each one appears on the Users page.
• Leave each field empty, keep the placeholder position, or enter an invalid email (e.g. abc@). Each is rejected.
• Use an existing email (e.g. tester@test.com, also with different capitals). The duplicate-email message appears.
• Enter names like O'Brien and Zoë. They're saved and displayed correctly.
• Force a server error. An error message appears and the form keeps its values.

API checks:
◦ A valid body returns 201.
◦ A missing or invalid field returns 400.
◦ A duplicate email returns 409.
◦ A SQL injection string in the name is stored as plain text.
Out of scope:
◦ editing or deleting users,
◦ assigning users to projects