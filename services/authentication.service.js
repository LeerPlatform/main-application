// // import { BehaviorSubject } from 'rxjs'

// // const currentUserSubject = new BehaviorSubject(null
// //   // JSON.parse(localStorage.getItem('currentUser'))
// // )

// const login = (email, password) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password })
//   }

//   return fetch('http://api.leer-platform.test/v1/auth/user/login', requestOptions)
//     .then(user => {
//       // localStorage.setItem('currentUser', JSON.stringify(user))
//       // currentUserSubject.next(user)

//       return user
//     })
// }

// function logout() {
//   localStorage.removeItem('currentUser');
//   currentUserSubject.next(null);
// }

// export const authenticationService = {
//   login,
//   logout,
//   currentUser: currentUserSubject.asObservable(),
//   get currentUserValue () { return currentUserSubject.value },
//   get isLoggedIn() { return currentUserSubject.value !== null },
// }
