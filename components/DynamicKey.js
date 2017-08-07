import React from 'react'
import { withAsyncWork } from '@josulliv101/connect-async-work'
//
import api from '../api'

const work = [{ 
  key: ({params = {}}) => `dynamic-${params.id}`,
  work : () => api(`https://reqres.in/api/users?delay=3&per_page=12`).then(resp => resp.data)
}]

// Got to jump through some hoops to get at a dynamic key. Its position in the
// keys array always matches its index in the passed-in work array.
function DynamicKey({ loading, keys: [workKey], [workKey]: users = [], ...props }) {
  console.log('DynamicKey / render', props, workKey)
  return (
  	<div>
  		<h3>DynamicKey Async Work</h3>
      <h4 className="loadStatus">DynamicKey work status is {loading ? 'loading...' : 'loaded'}</h4>
  		<p>{users.map(item => <img key={item.id} src={item.avatar} />)}</p>
  	</div>
  )
}

export default withAsyncWork(work)(DynamicKey)