// import * as THREE from "./three.min";
var scene,camera,renderer;
var cubies = [];
var borders = [];
window.onload = function(){
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color( 0xFFFFFF );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
    for (var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            for (var k=0; k<3; k++){
                var material = new THREE.MeshBasicMaterial({
                    vertexColors: THREE.FaceColors
                });
                var geometry = new THREE.BoxGeometry(1, 1, 1);
                // var red = new THREE.Color(0xFF0000);
                // var green = new THREE.Color(0x00FF00);
                // var blue = new THREE.Color(0xFFFF00);
                // var colors = [red, green, blue];
                geometry.faces[0].color = new THREE.Color(0xFF0000);
                geometry.faces[1].color = new THREE.Color(0xFF0000);
                geometry.faces[2].color = new THREE.Color(0xFF8000);
                geometry.faces[3].color = new THREE.Color(0xFF8000);
                geometry.faces[4].color = new THREE.Color(0xFFFFFF);
                geometry.faces[5].color = new THREE.Color(0xFFFFFF);
                console.log(geometry.faces);
                geometry.faces[6].color = new THREE.Color(0xFFFF00);
                geometry.faces[7].color = new THREE.Color(0xFFFF00);
                geometry.faces[8].color = new THREE.Color(0x00FF00);
                geometry.faces[9].color = new THREE.Color(0x00FF00);
                geometry.faces[10].color = new THREE.Color(0x0000FF);
                geometry.faces[11].color = new THREE.Color(0x0000FF);
                var cube = new THREE.Mesh(geometry, material);
                cube.position.y = i-1;
                cube.position.x = j-1;
                cube.position.z = k-1;
                cubies.push(cube);
                var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
                var edges = new THREE.EdgesGeometry( geometry );
                var borderToAdd = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000} ) );
                borderToAdd.position.y = i-1;
                borderToAdd.position.x = j-1;
                borderToAdd.position.z = k-1;
                borders.push(borderToAdd);
                scene.add( borderToAdd );
                scene.add(cubies[cubies.length-1]);
            }
        }
    }
camera.position.z = 5;
camera.position.x = 5;
camera.position.y = 5;
camera.lookAt(0,0,0);

animate();
};

var deg = 0;

function animate() {
    deg+=0.5;
    cubies[22].rotation.y = deg*Math.PI/180;
    cubies[23].position.x = Math.sin(deg*Math.PI/180)*1;
    cubies[23].position.z = Math.cos(deg*Math.PI/180)*1;
    cubies[23].rotation.y = deg*Math.PI/180;
    cubies[19].position.x = Math.sin((deg-90)*Math.PI/180)*1;
    cubies[19].position.z = Math.cos((deg-90)*Math.PI/180)*1;
    cubies[19].rotation.y = (deg)*Math.PI/180;
    cubies[25].position.x = Math.sin((deg+90)*Math.PI/180)*1;
    cubies[25].position.z = Math.cos((deg+90)*Math.PI/180)*1;
    cubies[25].rotation.y = (deg)*Math.PI/180;
    cubies[21].position.x = Math.sin((deg+180)*Math.PI/180)*1;
    cubies[21].position.z = Math.cos((deg+180)*Math.PI/180)*1;
    cubies[21].rotation.y = (deg)*Math.PI/180;
    cubies[20].position.x = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    cubies[20].position.z = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    cubies[20].rotation.y = (deg)*Math.PI/180;
    cubies[24].position.x = Math.sin((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    cubies[24].position.z = Math.cos((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    cubies[24].rotation.y = (deg)*Math.PI/180;
    cubies[26].position.x = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    cubies[26].position.z = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    cubies[26].rotation.y = (deg)*Math.PI/180;
    cubies[18].position.x = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    cubies[18].position.z = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    cubies[18].rotation.y = (deg)*Math.PI/180;


    borders[22].rotation.y = deg*Math.PI/180;
    borders[23].position.x = Math.sin(deg*Math.PI/180)*1;
    borders[23].position.z = Math.cos(deg*Math.PI/180)*1;
    borders[23].rotation.y = deg*Math.PI/180;
    borders[19].position.x = Math.sin((deg-90)*Math.PI/180)*1;
    borders[19].position.z = Math.cos((deg-90)*Math.PI/180)*1;
    borders[19].rotation.y = (deg)*Math.PI/180;
    borders[25].position.x = Math.sin((deg+90)*Math.PI/180)*1;
    borders[25].position.z = Math.cos((deg+90)*Math.PI/180)*1;
    borders[25].rotation.y = (deg)*Math.PI/180;
    borders[21].position.x = Math.sin((deg+180)*Math.PI/180)*1;
    borders[21].position.z = Math.cos((deg+180)*Math.PI/180)*1;
    borders[21].rotation.y = (deg)*Math.PI/180;
    borders[20].position.x = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[20].position.z = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[20].rotation.y = (deg)*Math.PI/180;
    borders[24].position.x = Math.sin((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    borders[24].position.z = Math.cos((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    borders[24].rotation.y = (deg)*Math.PI/180;
    borders[26].position.x = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[26].position.z = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[26].rotation.y = (deg)*Math.PI/180;
    borders[18].position.x = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[18].position.z = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[18].rotation.y = (deg)*Math.PI/180;

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

}