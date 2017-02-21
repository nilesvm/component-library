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

function wrapLeafletMap(geoData, WrappedComponent){
  class BoundGeoMap extends React.Component {

    debugger
    static displayName = `LeafletMapWrapper(<${WrappedComponent.displayName}/>`;

    static propTypes = {
      position: React.PropTypes.array,
      zoom: React.PropTypes.number
    };

    constructor(props){
      super(props);
      this.state = {
        data: geoData,
        center: props.position,
        zoom: props.zoom,
        minZoom: props.data.map.minZoom,
        maxBounds: props.data.map.maxBounds,
        attribute: props.attibute || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: props.url || 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      };
    };

    render() {
      <WrappedComponent
        data={this.state.data}
        center={this.state.center}
        zoom={this.state.zoom}
        minZoom={this.state.minZoom}
        maxBounds={this.state.maxBounds}
        attribute={this.state.attribute}
        url={this.state.url}
      />
    }
  }
  BoundGeoMap.component = component;
  return BoundGeoMap
}

const BareLeafletMap = (props) => {

  // debugger
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: props.data,
  //     center: props.position,
  //     zoom: props.zoom,
  //     minZoom: props.data.map.minZoom,
  //     maxBounds: props.data.map.maxBounds,
  //     attribute: props.attibute || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //     url: props.url || 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  //   };
  // };

  require('../../assets/leaflet.css');

  return (
    <div className={'mainMap'}>
      <Map className={className}
        center={this.state.center}
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

const LeafletMap = wrapLeafletMap(neighborhoodGeoJson)(LeafletMap);

BareLeafletMap.displayName = 'BareLeafletMap';

BareLeafletMap.propTypes = {
  center: React.PropTypes.array,
  maxBounds: React.PropTypes.array,
  zoom: React.PropTypes.number,
  minZoom: React.PropTypes.number,
  markers: React.PropTypes.array,
  data: React.PropTypes.object,
};

const PDXLeafletMap = wrapMyComponent(
  BareLeafletMap,
  neighborhoodGeoJson,
);

export default PDXLeafletMap;