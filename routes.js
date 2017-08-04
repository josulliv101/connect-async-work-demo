import { Home, DynamicKey, Foo, Bar, Multi, NestedContent, NestedRoutes } from './components'

var routes = () => {
  return [
    { 
      label: 'Basic', 
      routes: [
        { path: '/', exact: true, component: Home, label: 'Home' },
        { path: '/foo', component: Foo, label: 'Foo' },
        { path: '/bar', component: Bar, label: 'Bar' },
        { path: '/multi', component: Multi, label: 'Multi' },
      ],
    },
    {
      label: 'Advanced', 
      routes: [
        { path: '/nested-content', component: NestedContent, label: 'Nested Content' },
        { path: '/nested-routes', component: NestedRoutes, label: 'Nested Routes Parent' },
        { path: '/nested-routes/foo', label: 'Nested Routes Child' },
        { path: '/dynamic-key/:id', component: DynamicKey, label: 'Dynamic Key', linkPath: '/dynamic-key/foobar' },
      ],
    },
  ]
}

export default routes
