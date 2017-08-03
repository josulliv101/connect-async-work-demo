import React from 'react'
import { withAsyncWork } from '@josulliv101/connect-async-work'
//
import api from '../api'

const work = [{ 
  key: 'users', 
  work : () => api(`https://reqres.in/api/users?delay=1`).then(resp => resp.data)
}]

// This loading is specific to this work, not the whole app.
function Foo({loading, users = []}) {
  console.log('Foo / render')
  return (
  	<div>
  		<h3>Foo Async Work</h3>
      <h4>bar work status is {loading ? 'loading...' : 'loaded'}</h4>
  		<ul>
        {users.map(user => <li key={user.id}>{user.first_name}</li>)}  
      </ul>
  	</div>
  )
}

export default withAsyncWork(work)(Foo)