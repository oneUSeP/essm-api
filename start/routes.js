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
  Route.get('/admissions/search', 'AdmissionController.search').middleware(['auth:api'])
  Route.put('/admission', 'AdmissionController.update').middleware(['auth:api'])

  //Civil Status
  Route.get('/civilstatuses', 'CivilStatusController.list').middleware(['auth:api'])

  //Academic Year
  Route.get('/ayterms', 'EsAyTermController.list').middleware(['auth:api'])

  //Campus
  Route.get('/campuses', 'EsCampusController.list').middleware(['auth:api'])

  //Income Brackets
  Route.get('/incomebrackets', 'EsIncomeBracketController.list').middleware(['auth:api'])

  //Strands
  Route.get('/strands', 'EsStrandController.list').middleware(['auth:api'])

  //Strands
  Route.get('/testingcenters', 'EsTestingCenterController.list').middleware(['auth:api'])

  //Admission Interview Schedule
  Route.get('/interviews', 'EsAdmissionInterviewController.list').middleware(['auth:api'])

}).prefix('/v1')
