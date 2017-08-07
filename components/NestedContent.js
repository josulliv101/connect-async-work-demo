import React from 'react'
import { withAsyncWork } from '@josulliv101/connect-async-work'
import { delay } from '../utils'

const work = [
	{ key: 'nestedParent', work : () => delay(1600).then(() => 'nestedParent work resolved') }
]

function NestedContent(props) {
  return (
  	<div>
  	  <h3>Nested Async Work Items</h3>
      <h4 className="loadStatus">parent work status is {props.loading ? 'loading...' : 'loaded'}</h4>
      <p>This example has a parent component with async work and also a child component with async work nested within it. Data is displayed when all async work is complete.</p>
  	  <p>{props.nestedParent}</p>	
      <NestedContentChild />
  	</div>
  )
}

export default withAsyncWork(work)(NestedContent)

const work2 = [
  { key: 'nestedChild', work : () => delay(2600).then(() => 'nestedChild work resolved') }
]

var NestedContentChild = withAsyncWork(work2)(
  function Child(props) {
    return (
      <div style={{marginLeft: 32}}>
        <h3>Child Async Work Items</h3>
        <h4 className="loadStatus">nested child work status is {props.loading ? 'loading...' : 'loaded'}</h4>
        <p>{props.nestedChild}</p> 
      </div>
    )
  }
)
