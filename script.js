#! /usr/bin/env node

var fs = require("fs");
var svg = process.argv[2];
var symbols = /[\r\n"%#()<>?\[\\\]^`{|}]/g;

function addNameSpace( data ) {
  if ( data.indexOf( "http://www.w3.org/2000/svg" ) < 0 ) {
    data = data.replace( /<svg/g, "<svg xmlns='http://www.w3.org/2000/svg'" );
  }

  return data;
}

function encodeSVG( data ) {
  // Use single quotes instead of double to avoid encoding.
  if ( data.indexOf( '"' ) >= 0 ) {
      data = data.replace( /"/g, "'" );
  }

  data = data.replace( />\s{1,}</g, "><" );
  data = data.replace( /\s{2,}/g, " " );

  return data.replace( symbols, escape );
}

var svgFile = fs.readFileSync(svg, "utf8");

var namespaced = addNameSpace(svgFile);
var escaped = encodeSVG( namespaced );
var resultCss = 'background-image: url("data:image/svg+xml,' + escaped + '");';

console.log(resultCss);