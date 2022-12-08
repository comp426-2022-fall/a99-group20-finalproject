# Document to store descriptions of each API endpoint

## app.get('/app')
Redirects to the login page.

## app.post('/app/home')
Redirects to the user's homepage.

## app.post('/app/app/home')
Redirects to the user's homepage.

## app.post('/app')
Used to redirect to user's homepage.

## app.post('/login')
Recieves username and password info, redirects to the user's homepage.

## app.post('/app/createacc')
Recieves username and password info for creating an account, stores that info in a database, then redirects to the user's homepage.

## app.post('/app/app/delete_acc')
Redirects to a page showing a successful account deletion, displays a message and a button to create another account.
## app.post('/log_meal')
Redirects to a page showing a successful log with a small message.

## app.post('/app/history')
Redirects to the user's meal history page.

## app.get('/app/users_db')
This endpoint is hidden, used to get login info from the user database.

## app.get('/app/logs_db')
This endpoint is hidden, used to get meal info from the nutrition database.

## app.get('/app/interactions_db')
This endpoint is hidden, used to get info from the interaction database.

## app.get('*')
Redirects to the "404 NOT FOUND" error page.
