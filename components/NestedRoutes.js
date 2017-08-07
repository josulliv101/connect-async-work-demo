import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import { withAsyncWork } from '@josulliv101/connect-async-work'
import { delay } from '../utils'

const work = [
	{ key: 'nestedRoutesParent', work : () => delay(1600).then(() => 'nestedRoutesParent work resolved') }
]

class NestedRoutes extends Component {

  render() {

    const {match} = this.props
    const routes = [
      { path: '/nested-routes/foo', component: NestedRoutesFoo, label: 'Nested Routes Foo', match },
      { path: '/nested-routes/bar', component: NestedRoutesBar, label: 'Nested Routes Bar', match }
    ]

    return (
      <div>
        <h3>Nested Routes Async Work Items</h3>
        <ul>
          <li>Nested Routes > Home: has async work</li>
          <li>Nested Routes > Foo: has async work</li>
          <li>Nested Routes > Bar: has no async work</li>
        </ul>
        <h4 className="loadStatus">parent work status is {this.props.loading ? 'loading...' : 'loaded'}</h4>
        <p>This example has async work associated with nested routes.</p>
        <div style={{marginLeft: 32}}>
          <Switch >
            {routes.filter(route => !!route.component).map(({match, label, ...route}) => <Route key={route.path} {...route}  />) } 
          </Switch>   
        </div>
      </div>
    )    
  }
}

export default withAsyncWork(work)(NestedRoutes)

const work2 = [
  { key: 'nestedChildFoo', work : () => delay(4600).then(() => 'nested Child Route Foo work resolved') }
]

var NestedRoutesFoo = withAsyncWork(work2)(
  
  function Child(props) {
    console.log('NestedRoutesFoo render', props)

    return (
      <div>
        <h3>NestedRoutesFoo Async Work Items</h3>
        <h4 className="loadStatus">nested child work status is {props.loading ? 'loading...' : 'loaded'}</h4>
        <p>{props.nestedChildFoo}</p> 
      </div>
    )
  }
)

function NestedRoutesBar(props) {
  return (
    <div>
      <h3>NestedRoutesBar No Work Items</h3>
      <h4>nested child work status is {props.loading ? 'loading...' : 'loaded'}</h4>
      <p>No async work</p> 
    </div>
  )
}
