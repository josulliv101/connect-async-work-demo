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
  return (
  	<div>
  		<h3>Foo Async Work</h3>
      <h4 className="loadStatus">bar work status is {loading ? 'loading...' : 'loaded'}</h4>
      <p>This example grabs some data from a rest api and displays it.</p>
  		<ul>
        {users.map(user => <li key={user.id}>{user.first_name}</li>)}  
      </ul>
  	</div>
  )
}

export default withAsyncWork(work)(Foo)