// import * as THREE from "./three.min";
var scene,camera,renderer;
var cubies = [];
window.onload = function(){
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color( 0xFF00FF );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
    for (var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            for (var k=0; k<3; k++){
                var material = new THREE.MeshBasicMaterial({
                    color: 0xffff00,
                    vertexColors: THREE.FaceColors
                });
                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var red = new THREE.Color(0xFF0000);
                var green = new THREE.Color(0x00FF00);
                var blue = new THREE.Color(0xFFFF00);
                var colors = [red, green, blue];
                for (var l = 0; l < 3; l++) {
                    geometry.faces[4 * l].color = colors[l];
                    geometry.faces[4 * l + 1].color = colors[l];
                    geometry.faces[4 * l + 2].color = colors[l];
                    geometry.faces[4 * l + 3].color = colors[l];
                }
                var cube = new THREE.Mesh(geometry, material);
                cube.position.x = i*1.5-1.5;
                cube.position.y = j*1.5-1.5;
                cube.position.z = k*1.5-1.5;
                cubies.push(cube);
                scene.add(cubies[cubies.length-1]);
            }
        }
    }
camera.position.z = 10;
camera.position.x = 10;
camera.position.y = 10;
camera.lookAt(0,0,0)

animate();
};
function animate() {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );

}