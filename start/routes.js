'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.get('/', 'WelcomeController.index')

Route.group('v1', () => {
  // Authorization
  Route.post('/auth/access-token', 'AuthController.accessToken')

  //Me
  Route.get('/me', 'AuthController.me').middleware(['auth:api'])

  // Tracks
  Route.post('/track', 'TrackController.save').middleware(['auth:api'])
  Route.put('/track', 'TrackController.update').middleware(['auth:api'])
  Route.get('/track/:id', 'TrackController.show').middleware(['auth:api'])
  Route.get('/tracks', 'TrackController.list').middleware(['auth:api'])
  Route.delete('/track/:id', 'TrackController.delete').middleware(['auth:api'])

  //Admissions
  Route.get('/admissions', 'AdmissionController.list').middleware(['auth:api'])

}).prefix('/v1')
