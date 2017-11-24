'use strict'

const { HttpException } = use('node-exceptions')
const TrackOperation = use('App/Operations/TrackOperation')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const EsTrack = use('App/Models/EsTrack')

class TrackController {
  async save({request, response}) {
    let op = new TrackOperation()
    op.trackName = request.input('trackName')
    op.active = request.input('active')

    let track = await op.save()

    if (track === false) {
      let error = op.getFirstError()

      throw new HttpException(error.message, error.code)
    }

    response.send({ data: { track } })
  }

  async update({request, response}) {
    let op = new TrackOperation()
    op.trackId = request.input('id')
    op.trackName = request.input('trackName')
    op.active = request.input('active')

    let track = await op.update()

    if (track === false) {
      let error = op.getFirstError()

      throw new HttpException(error.message, error.code)
    }

    response.send({ data: { track } })
  }

  async delete({request, response, params}) {
    let op = new TrackOperation()
    op.trackId =  params.id

    let result = await op.delete()

    if (result === false) {
      let error = op.getFirstError()

      throw new HttpException(error.message, error.code)
    }

    response.send({
      data: { deleteSuccess: result }
    })
  }

  async show({request, response}) {
    let trackId = request.param('id')
    let track = await EsTrack.findBy('id', trackId)


    if (!track) {
      throw new HttpException('Track not found.', HttpResponse.STATUS_NOT_FOUND)
    }

    let data = track.toJSON()

    response.send({
      data
    })
  }

  async list ({request, response}) {
    let op = new TrackOperation()
    let { page, count } = request.all()

    op.page = page
    op.count = count

    let tracks = await op.list()

    response.send({
      data: { tracks }
    })
  }
}

module.exports = TrackController
