import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { Button } from 'reactstrap';

var myIcon = L.icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABelBMVEVHcEz/QAD/PQD/PQD/PQD/OwD/PQD/VQD/PQD/PgD/PgD/PQD/RgD/QAD/PQD/PQD/PgD/PQD/PAD/PAD/PQD/PQD/PQD/PgD/MwD/QAD/PgD/PAD/PQD/PQD/OwD/NwD/PQD/PQD/AAD/PQD/PQD/QAD/PAD/AAD/PAD/PQD/PwD/PAD/OwD/PQD/PAD/PQD/PQD/OQD/PQD/PgD/PAD/PQD/PQD/NwD/PgD/KwD/PQD/PwD/PgD/PQD/PQD/PAD/PQD/PAD/PQD/PQD/PgD/PQD/PQD/PgD/RAD/PgD/PgD/PQD/PwD/PQD/PQD/QAD/PQD/PQD/OQD/OwD/PAD/PgD/PAD/PQD/PQD/PQD/PQD/PgD/PQD/PQD/PAD/PQD/PgD/PQD/PwD/PQD/PAD/PQD/PQD/PQD/PgD/SQD/PQD/PAD/PQD/PQD/PQD/PQD/PgD/PQD/QAD/PAD/PgD/PAD/PQD/PQD/PgD/PgD/PQD/PQD/PQD/PQCv0krVAAAAfXRSTlMALP3m+g34A/nLb/ULDMZpeNVuRCrJcWsFHFqYwfQrF2jUAmzyBNMBHtJBSBqgZqLqCWWyIvC3Dp0GNkUh4OVA7yZP/uTffSUPTpHuObDzJFOWG0lyPnfjgcRDKYbt6K+VLj33TZrdGUIHw76k58hHLfEI14Q3vL9jHevN+5lLF0YAAAHKSURBVEjHpZZVVwMxEIVrdOtGoS1QhSLFiru7u7u7u+S/w6GQZHaT7PYwj9/cuyfJJjOj0/0/3mpqP94/TWlr9WuVBnnliwHhMDznqsnzkCxcIsvoJWJEdQ5PP/KAmOGdYetvtxEnjBssfdUK4kZ3SKkPWpEgrpMKwyoSxrBcX35AZStsEYcjYiulkH1eZtglObM7kWFSwELoONTnlBB9iuBT4mhyAMMs+VSM5sWE9wNDIVl/guZSHCfmgIFcIR9caz5OrAGextwPDXqcuALcjLlTdhrkMAC3Yy67mi04MQ34kPqSjgEvwtzG2/QF4JuYl0rgWL048QgMC+QHBWjuI/wGGM4mcMKyTnCuCeOtNrjWI/IpS/HvqiQf0aNC2W19oi9/PF/vdOoXvTRrlz+Ic/EDKlK8uDGx4VD5qF0ifV6Z0rAkMqRYdWaKr99hFrLyME9v72SXPg/PsMyprUnOvq1BXjVuLGHpw338el/DMtSLGkqDUt9cJjJEjYpSHxX3rEkL1Jv21ZpiABrc6m20ldbXaui7dVRnsd5raewnXX/6wZC2UcDfm9Hf7WkdHnp+jsrUoX3cKPgeHwwF2QwobjQQy26k8Xg4iS+1NL4CrIe28AAAAABJRU5ErkJggg==",
    iconSize: [25, 25],
    iconAnchor: [12.5, 25],
    popupAnchor: [0, -25]
});
class MapWrapper extends Component {
    state = {
        location: {
          lat: 51.505,
          lng: -0.09
        },
        haveUsersLocation: false,  
        zoom: 2
    }

    locateMe =()=> {
        navigator.geolocation.getCurrentPosition((position) => {
            //console.log("+++++++++", position);
            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                haveUsersLocation: true,
                zoom: 13
            })
        })
    }

    render() {
        const position = [this.state.location.lat, this.state.location.lng]
        return (
            <>
                <Map className="map" center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        this.state.haveUsersLocation ?
                        <Marker position={position} icon={myIcon}>
                            <Popup>
                                I found you.
                            </Popup>
                        </Marker>       :   ""
                    }
                </Map>
                <Button className="locateBtn" onClick={this.locateMe} color="primary">Locate Me</Button>{' '}
            </>
        )
    }
}

export default MapWrapper;