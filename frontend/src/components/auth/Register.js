// import React from 'react'
// import { registerUser } from '../../lib/api'
// import { setToken } from '../../lib/auth'


// class Register extends React.Component {

//   state = {
//     formData: {
//       username: '',
//       email: '',
//       password: '',
//       passwordConfirmation: '',
//     },
//     errors: {}
//   }


//   handleChange = (e) => {
//     const formData = { ...this.state.formData, [e.target.name]: e.target.value }
//     this.setState({ formData })
//   }

//   handleSubmit = async (event, path) => {
//     event.preventDefault()
//     try {
//       const res = await registerUser(this.state.formData)
//       setToken(res.data.token)
//       path.push('/hikes')

//     } catch (err) {
//       this.setState({ errors: err.response.data.errors })
//     }
//   }


//   render() {

//     const { formData, errors } = this.state
//     return (
//       <div className="column">
//         <section className="section">
//           <div className="container">
//             <h1 className="title">Register</h1>
//             <hr />
//             <div className="columns">
//               <form onSubmit={(event) => this.handleSubmit(event, this.props.history)} className="column">
//                 <div className="field">
//                   <label className="label">Username</label>
//                   <div className="control">
//                     <input
//                       className={`input ${errors.username ? 'is-danger' : ''}`}
//                       placeholder="Username"
//                       name="username"
//                       onChange={this.handleChange}
//                       value={formData.username}
//                     />
//                   </div>
//                   {errors.username && <small className="help is-danger"></small>}
//                 </div>
//                 <div className="field">
//                   <label className="label">Email</label>
//                   <div className="control">
//                     <input
//                       className={`input ${errors.email ? 'is-danger' : ''}`}
//                       placeholder="Email"
//                       name="email"
//                       onChange={this.handleChange}
//                       value={formData.email}
//                     />
//                   </div>
//                   {errors.email && <small className="help is-danger"></small>}
//                 </div>
//                 <div className="field">
//                   <label className="label">Password</label>
//                   <div className="control">
//                     <input
//                       className={`input ${errors.password ? 'is-danger' : ''}`}
//                       type="password"
//                       placeholder="Password"
//                       name="password"
//                       onChange={this.handleChange}
//                       value={formData.password}
//                     />
//                   </div>
//                   {errors.password && <small className="help is-danger"></small>}
//                 </div>
//                 <div className="field">
//                   <label className="label">Password Confirmation</label>
//                   <div className="control">
//                     <input
//                       type="password"
//                       className={`input ${errors.passwordConfirmation ? 'is-danger' : ''}`}
//                       placeholder="Password Confirmation"
//                       name="passwordConfirmation"
//                       onChange={this.handleChange}
//                       value={formData.passwordConfirmation}
//                     />
//                   </div>
//                   {errors.passwordConfirmation && <small className="help is-danger"></small>}
//                 </div>
//                 <div className="field">
//                   <button
//                     type="submit"
//                     className="button is-fullwidth login-register-btn">Register</button>
//                 </div>
//               </form>

//             </div>
//           </div>
//         </section>
//       </div>
//     )
//   }
// }

// export default Register