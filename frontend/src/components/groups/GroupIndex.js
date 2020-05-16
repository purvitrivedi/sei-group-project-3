import React from 'react'
// import axios from 'axios'
// import { getAllCheeses } from '../../lib/api'

class GroupIndex extends React.Component {
  // state = { 
  //   groups: [] 
  // }

  // async componentDidMount() {
  //   try {
  //     const res = await axios.get('/groups')
  //     this.setState({ groups: res.data })
  //   } catch (err) {
  //     this.props.history.push('/notfound')
  //   }
  // }
  render() {
    return (
      <h1>Groups INDEX</h1>
      // <section className="section">
      //   <div className="container">
      //     <div className="columns is-multiline">
      //       {this.state.cheeses.map(cheese => (
      //         <CheeseCard key={cheese._id} {...cheese}/>
      //       ))}
      //     </div>
      //   </div>
      // </section>
    )
  }
}
export default GroupIndex