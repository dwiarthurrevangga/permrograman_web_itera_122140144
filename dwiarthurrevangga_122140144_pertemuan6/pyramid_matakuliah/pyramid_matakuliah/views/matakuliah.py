import datetime
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound, HTTPNotFound, HTTPBadRequest
from ..models import Matakuliah

@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    items = request.dbsession.query(Matakuliah).all()
    return {'data': [m.to_dict() for m in items]}

@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    m = request.dbsession.query(Matakuliah).get(int(request.matchdict['id']))
    if not m:
        return HTTPNotFound(json_body={'error': 'Not found'})
    return {'data': m.to_dict()}

@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    try:
        d = request.json_body
        for f in ('kode_mk','nama_mk','sks','semester'):
            if f not in d:
                return HTTPBadRequest(json_body={'error': f'{f} wajib diisi'})
        m = Matakuliah(
            kode_mk=d['kode_mk'],
            nama_mk=d['nama_mk'],
            sks=int(d['sks']),
            semester=int(d['semester'])
        )
        request.dbsession.add(m)
        request.dbsession.flush()
        return {'success': True, 'data': m.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    session = request.dbsession
    m = session.query(Matakuliah).get(int(request.matchdict['id']))
    if not m:
        return HTTPNotFound(json_body={'error': 'Not found'})
    data = request.json_body
    if 'nama_mk' in data:    m.nama_mk = data['nama_mk']
    if 'sks' in data:        m.sks = int(data['sks'])
    if 'semester' in data:   m.semester = int(data['semester'])
    return {'success': True, 'data': m.to_dict()}

@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    session = request.dbsession
    m = session.query(Matakuliah).get(int(request.matchdict['id']))
    if not m:
        return HTTPNotFound(json_body={'error': 'Not found'})
    session.delete(m)
    return {'success': True}
