// import { authenticationService } from '@/_services';

const tempToken = `
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkubGVlci1wbGF0Zm9ybS50ZXN0XC92MVwvYXV0aFwvdXNlclwvbG9naW4iLCJpYXQiOjE1ODk5ODM3NjksImV4cCI6MTU4OTk4NzM2OSwibmJmIjoxNTg5OTgzNzY5LCJqdGkiOiJzQnJ4YzhZaE5EZ0p2WGs5Iiwic3ViIjoxLCJwcnYiOiI2MDViMjY1MWMyZjM3MTZiYWE0ZjdiNjc4NmE4YWEyZjU4N2IzZGM4In0.EaCj98htya_cCgTOPGZBNl_R3297eO44FLGmniKov1g
`

/**
 * Return authorization header with JWT token
 */
export function authHeader() {
  return { Authorization: `Bearer ${tempToken.trim()}` }

  // const currentUser = authenticationService.currentUserValue;

  // if (currentUser && currentUser.token) {
  //   return { Authorization: `Bearer ${currentUser.token}` };
  // }

  return {};
}
