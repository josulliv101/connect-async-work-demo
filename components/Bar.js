import React from 'react'
import { withAsyncWork } from '@josulliv101/connect-async-work'
import { delay } from '../utils'

const work = [{ key: 'bar', work : () => delay(2600).then(() => 'bar work resolved')}]

function Bar(props) {
  return (
  	<div>
  	  <h3>Bar Async Work</h3>
      <h4 className="loadStatus">bar work status is {props.loading ? 'loading...' : 'loaded'}</h4>
      <p>This example uses 'setTimeout' to delay a Promise resolving and displays it.</p>
  	  <p>{props.bar}</p>	
  	</div>
  )
}

export default withAsyncWork(work)(Bar)
