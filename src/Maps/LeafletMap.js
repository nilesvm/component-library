import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import classNames from 'classnames/bind';
import styles from './LeafletMap.style.css';
// data from http://gis-pdx.opendata.arcgis.com/datasets/neighborhoods-regions/data
import neighborhoodGeoJson from './neighborhoodGeoJson.json';

const cx = classNames.bind(styles);
const className = cx({ mapStyles: true });

function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.NAME) {
    layer.bindPopup(feature.properties.NAME);
    layer.on('mouseover', function(e) {
      e.target.openPopup()
    });
  }
}

function addGeoData(gd, component){
  return class BoundGeoMap extends Component {
    static displayName = 'LeafletMap';
    static propTypes = {
      position: React.PropTypes.array,
      zoom: React.PropTypes.number
    }

    constructor(props){
      super(props);
      this.state = {
        geoData: gd
        position: props.position,
        zoom: props.zoom
        attribute: props.attibute || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: props.url || 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      }
    }
    render() {
      require('../../assets/leaflet.css');
      return (
        <div className={'mainMap'}>
          <Map className={className}
            center={this.state.position}
            zoom={this.state.zoom}
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
          >
          <TileLayer
            url={this.state.url}
            attribution={this.state.attribute}
          />
          <GeoJSON
            data={this.state.geodata}
            onEachFeature={onEachFeature}
          />
          </Map>
        </div>
      )
    }
  }
  BoundGeoMap.component = component;
  return BoundGeoMap
}

// const BareLeafletMap = ({
//   data,
//   zoom = 10,
//   position
// }) => ()

const LeafletMap = addGeoData(neighborhoodGeoJson)(LeafletMap);

// LeafletMap.displayName = 'LeafletMap';

// LeafletMap.propTypes = {
//   position: React.PropTypes.array,
//   zoom: React.PropTypes.number,
//   zoomControl: React.PropTypes.bool,
//   dragging: React.PropTypes.bool,
//   scrollWheelZoom: React.PropTypes.bool,
//   doubleClickZoom: React.PropTypes.bool
// };

export default LeafletMap;