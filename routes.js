import { Home, DynamicKey, Foo, Bar, Multi, NestedContent, NestedRoutes } from './components'

var routes = () => {
  return [
    { 
      label: 'Basic', 
      routes: [
        { path: '/', exact: true, component: Home, label: 'Home', nav: false },
        { path: '/bar', component: Bar, label: 'Bar' },
        { path: '/foo', component: Foo, label: 'Foo' },
        { path: '/multi', component: Multi, label: 'Multi' },
        { path: '/nested-content', component: NestedContent, label: 'Nested Content' },
      ],
    },
    {
      label: 'Advanced', 
      routes: [
        { path: '/dynamic-key/:id', component: DynamicKey, label: 'Dynamic Key', linkPath: '/dynamic-key/foobar' },
      ],
    },
    {
      label: 'Nested Routes', 
      routes: [
        { path: '/nested-routes', component: NestedRoutes, label: 'Nested Routes Home' },
        { path: '/nested-routes/foo', label: 'Nested Routes Foo' },
        { path: '/nested-routes/bar', label: 'Nested Routes Bar' },
      ],
    },
  ]
}

export default routes
