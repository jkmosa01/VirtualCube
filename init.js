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
                cube.position.x = i*1.1-1.1;
                cube.position.y = j*1.1-1.1;
                cube.position.z = k*1.1-1.1;
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