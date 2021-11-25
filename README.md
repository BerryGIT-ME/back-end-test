# Simple_Web_API

This is a simple web API built that exposes three endpionts
## docker image
$ docker pull ikeokerenwogba/simple_web_api:dev-api

#### Login endpiont (/api/login)
This is a publicly accessible endpoint for user authorization. 
Request body should be {username: "some-username", password: "some-password"}.
only valid non-empty strings are accepted,
it returns a signed Json Web Token(JWT, https://jwt.io/) which is used to validate future requests.


#### Patch endpiont (/api/patch)
This is a protected endpoint and requires the authorization header to set with the jwt token.
The json data and patch must be sent in the req.body.


#### Thumbnail endpiont (/api/resize-thumbnail)
This is a protected endpoint and requires the authorization header to set with the jwt token. 
It accepts the url of an image and resize the image.
The image url is set in the req.body.url. Only valid url's are accepted.


### NPM Packages used
#### express
#### jsonwebtoken
#### winston
#### swagger-jsDoc swagger-ui-express
#### mocha chai chai-http
#### jsonpatch
#### joi
#### resize-img
