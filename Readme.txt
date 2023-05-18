Dependencies: express bcrypt passport nodemailer body-parser connect-flash dotenv mongoose expr
ess-flash passport-local express-fileupload cookie-parser express-session

 { "src": "/login", "dest": "./routes/users.js" },
        { "src": "/register", "dest": "./routes/users.js" },
        { "src": "/logout", "dest": "./routes/users.js" },
        { "src": "/create", "dest": "./routes/blog.js" },
        { "src": "/:id", "dest": "./routes/blog.js" }