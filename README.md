# Restify Authentication Exemple
Authentication exemple on Restify with JWT and Permissions

## Installation
1. Clone this repository: `git clone https://github.com/deregudegu/restify-auth-exemple/`
2. Done :P

## Routes
| Endpoint         | Description                     | Body Parameters                                                                                                                                      |
|------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST `/register` | Register a user                 | `{ username: 'username', password: 'password'} `                                                                                                     |
| POST `/login`    | Returns the user's access token | `{ username: 'username', password: 'password'} `                                                                                                     |
| GET `/user/:id`  | Returns user's details          | -                                                                                                                                                    |
| DEL `/user/:id`  | Remove user by id               | -                                                                                                                                                    |
| PUT `/user/:id`  | Change user data                | `{ username: "username", email: "email@email.com", password: "password", fullname: "full name", picture: "picture id", permissions: ['user.read'] }` |
| GET `/users`     | Returns all users with details  | -                                                                                                                                                    |
| DEL `/users`     | Remove all user                 | -                                                                                                                                                    |

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

##To do
1. updateUser
2. deleteUser
3. deleteUsers
4. Improve permissions system with group permissions

## History
I tried find today's examples about authentication and I didn't find. So I started this repository to contribute with the community and improve my knowledge.

## Credits
Today just [me](http://github.com/deregudegu) but you can contribute too!

## License
The MIT License (MIT)

Copyright (c) 2016 André Van Dal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
