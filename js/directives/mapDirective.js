'use strict';
angular.module('dataApp.directives.mapDirective', [] )
.directive('ngMap',[function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
          var intCurrentMap = 0;
          var intCurrentTab = 0;


          var map = L.mapbox.map('map', 'usatoday.map-m28xx5xa')

            .setView([37.8, -96], 4);
          map.options.minZoom = 2;
          map.options.maxZoom = 8;
          map.scrollWheelZoom.disable();

          // control that shows state info on hover
          var info = L.control({ position: 'bottomleft' });

          info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
          };

          // CP: can't figure this out. for some reason in the directive, "props.exchange" is not working
          info.update = function (props) {
              var strHTML = "", strCat;
              var strType = "State";
              if (props) {
                  switch (props.exchange) {
                      case 0:
                          strType = "Federal";
                          break;
                      case 1:
                          strType = "State";
                          break;
                      default:
                          strType = "NA"
                          break;
                  }

                  strHTML += '<h4>' + props.name + '</h4>';
                  strHTML += '<p>Exchange type: <b>' + strType + '</b></p>';
               if (intCurrentMap == 0) {
                switch (intCurrentTab) {
                  case 0:
                    strCat = "Indian";
                    break;
                  case 1:
                    strCat = "Asian";
                    break;
                  case 2:
                    strCat = "Hawaiian";
                    break;
                  case 3:
                    strCat = "Black";
                    break;
                  case 4:
                    strCat = "Latino";
                    break;
                  case 5:
                    strCat = "White";
                    break;
                  case 6:
                    strCat = "Multi";
                    break;
                  default:
                    strCat = "NA"
                    break;
                }
                if (props.race[intCurrentTab] != -1) {
                  strHTML += '<p><b>' + props.race[intCurrentTab] + '%</b> of total state ACA enrollees are ' + strCat + '</p>';
                } else {
                  strHTML += '<p>No race data available for this state.</p>';
                }
              } else if (intCurrentMap == 1) {
                switch (intCurrentTab) {
                  case 0:
                    strCat = "less than 18";
                    break;
                  case 1:
                    strCat = "18 to 25";
                    break;
                  case 2:
                    strCat = "26 to 34";
                    break;
                  case 3:
                    strCat = "35 to 44";
                    break;
                  case 4:
                    strCat = "45 to 54";
                    break;
                  case 5:
                    strCat = "55 to 64";
                    break;
                  case 6:
                    strCat = "greater than 64";
                    break;
                  default:
                    strCat = "NA"
                    break;
                }
                if (props.age[intCurrentTab] != -1) {
                  strHTML += '<p><b>' + props.age[intCurrentTab] + '%</b> of total state ACA enrollees are ' + strCat + ' years old.</p>';
                } else {
                  strHTML += '<p>No age data available for this state.</p>';
                }
               } else {
                switch (intCurrentTab) {
                  case 0:
                    strCat = "Bronze";
                    break;
                  case 1:
                    strCat = "Silver";
                    break;
                  case 2:
                    strCat = "Gold";
                    break;
                  case 3:
                    strCat = "Platinum";
                    break;
                  case 4:
                    strCat = "Catastrophic";
                    break;
                  default:
                    strCat = "NA"
                    break;
                }
                if (props.plan[intCurrentTab] != -1) {
                  strHTML += '<p><b>' + props.plan[intCurrentTab] + '%</b> of total state ACA enrollees selected ' + strCat + ' plan.</p>';
                } else {
                  strHTML += '<p>No plan data available for this state.</p>';
                }

               }



              } else {
                  strHTML += '<h4>ACA Enrollment</h4>';
                  strHTML += '<div class="boxChatter"><p>Rollover a state to see health care enrollment data for that state.</p></div>';
              }
              this._div.innerHTML = strHTML;
          };

          info.addTo(map);


          var legend = L.control({position: 'topright'});

          legend.onAdd = function (map) {

              var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 11, 21, 31, 41, 51, 61, 71, 81, 91, -1],
              labels = [],
              level, strLevel;

              for (var i = 0; i < grades.length; i++) {
                  level = grades[i];
                  switch (level) {
                      case 0:
                          strLevel = "0-10%";
                          break;
                      case 11:
                          strLevel = "11-20%";
                          break;
                      case 21:
                          strLevel = "21-30%";
                          break;
                      case 31:
                          strLevel = "31-40%";
                          break;
                      case 41:
                          strLevel = "41-50%";
                          break;
                      case 51:
                          strLevel = "51-60%";
                          break;
                      case 61:
                          strLevel = "61-70%";
                          break;
                      case 71:
                          strLevel = "71-80%";
                          break;
                      case 81:
                          strLevel = "81-90%";
                          break;
                      case 91:
                          strLevel = "91-100%";
                          break;
                      default:
                          strLevel = "NA"
                          break;
                  }

                  labels.push(
                '<div class="dots"><i style="background:' + getColor(level) + '"></i> ' +
                strLevel + '</div>');
              }

              div.innerHTML = labels.join('<br>');
              return div;
          };

          legend.addTo(map);



          // get color depending on aca enrollment rate
          function getColor(d) {
            //console.log(d);
            return d > 90 ? '#6a3d9a' :
                   d > 80 ? '#cab2d6' :
                   d > 70 ? '#ff7f00' :
                   d > 60 ? '#fdbf6f' :
                   d > 50 ? '#e31a1c' :
                   d > 40 ? '#fb9a99' :
                   d > 30 ? '#33a02c' :
                   d > 20 ? '#b2df8a' :
                   d > 10 ? '#1f78b4' :
                   d >= 0 ? '#a6cee3' :
                           '#ffffff';
          }

          function style(feature) {
            var arrValues = [];
            if (intCurrentMap == 0) {
              arrValues = feature.properties.race;
            } else if (intCurrentMap == 1) {
              arrValues = feature.properties.age;
            } else {
              arrValues = feature.properties.plan;
            }

            return {
              weight: 1,
              opacity: 1,
              color: '#666',
              //dashArray: '3',
              fillOpacity: 0.7,
              fillColor: getColor(arrValues[intCurrentTab])
            };
          }

          function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
              //color: '#fff',
              dashArray: '',
              fillOpacity: 0.5
            });

            if (!L.Browser.ie && !L.Browser.opera) {
              layer.bringToFront();
            }

            info.update(layer.feature.properties);

              }

          var geojson;

          function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
            //$(".leaflet-top.leaflet-right").css({ 
                      //"right": "0px",
                      //"top": "0px"
                   //});
          }

          function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
          }

          function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
              click: zoomToFeature
                  });
                 // $(layer).mousemove(function (event) {
                      //$(".leaflet-top.leaflet-right").css({
                          //"left": (event.originalEvent.layerPoint.x - 75).toString() + "px",
                          //"top": (event.originalEvent.layerPoint.y - 70).toString() + "px",
                          //"right": "auto"
                      //});
                 // });
          }

          function renderData() {
            if (geojson) {
              map.removeLayer(geojson);
            }
            geojson = L.geoJson(statesData, {
            style: style,
            onEachFeature: onEachFeature
            }).addTo(map);
          }
          
          var arrMainTabs, arrRaceTabs, arrAgeTabs, arrPlanTabs; 
          
          function setupButtons() {
            arrMainTabs.click(function() {
              var _this = $(this);
              var _parent = _this.parent().find("li");
              changeMaps(_parent.index(_this));
            });
            arrRaceTabs.click(function() {
              var _this = $(this);
              var _parent = _this.parent().find("li");
              changeTabs(_parent.index(_this));
            });
            arrAgeTabs.click(function() {
              var _this = $(this);
              var _parent = _this.parent().find("li");
              changeTabs(_parent.index(_this));
            });
            arrPlanTabs.click(function() {
              var _this = $(this);
              var _parent = _this.parent().find("li");
              changeTabs(_parent.index(_this));
            });
            changeMaps(intCurrentMap);
          }
          
          function changeTabs(intIndex) {
            if (intCurrentMap == 0) {
              arrRaceTabs.removeClass("active").eq(intIndex).addClass("active");
            } else if (intCurrentMap == 1) {
              arrAgeTabs.removeClass("active").eq(intIndex).addClass("active");
            } else {
              arrPlanTabs.removeClass("active").eq(intIndex).addClass("active");
            }
            intCurrentTab = intIndex;
            renderData();
          }
          
          function changeMaps(intIndex) {
            arrMainTabs.removeClass("active").eq(intIndex).addClass("active");
            intCurrentMap = intIndex;
            if (intCurrentMap == 0) {
              arrRaceTabs.parent().removeClass("hide");
              arrAgeTabs.parent().addClass("hide");
              arrPlanTabs.parent().addClass("hide");
            } else if (intCurrentMap == 1) {
              arrRaceTabs.parent().addClass("hide");
              arrAgeTabs.parent().removeClass("hide");
              arrPlanTabs.parent().addClass("hide");
            } else   {
              arrRaceTabs.parent().addClass("hide");
              arrAgeTabs.parent().addClass("hide");
              arrPlanTabs.parent().removeClass("hide");       
            }
            changeTabs(0);
          }
          
          $(function() {
              arrMainTabs = $("ul.main").find("li");
            arrRaceTabs = $("ul.race").find("li");
            arrAgeTabs = $("ul.age").find("li");
            arrPlanTabs = $("ul.plan").find("li");
            setupButtons();
          });
          

          // map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');
    }
  }
}])
.directive('ngCredits', [function($scope){
  return {
    restrict:'A',
    template:'<div id="credits_modal" class="reveal-modal"> <h5>Sources</h5> <ul class="credits"> <li>Health and Human Services</li> </ul> <h5>Credits</h5> <ul class="credits"> <li>Denny Gainer</li> <li>Chad Palmer</li> </ul> <a class="close-reveal-modal"></a> </div>'
  }
}])
