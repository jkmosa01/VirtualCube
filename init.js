// import * as THREE from "./three.min";
var scene,camera,renderer;
var cubies = [];
var borders = [];
var rotations = [];
window.onload = function(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = 500 / 500;
        camera.updateProjectionMatrix();

        renderer.setSize( 500,500 );

    }
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x000000, 0 );
// scene.background = new THREE.Color( 0xFFFFFF );
    renderer.setSize(500, 500);
    document.body.appendChild(renderer.domElement);
    for (var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            for (var k=0; k<3; k++){
                rotations.push([0,1,2,3,4,5]);//LUFDRB
                var material = new THREE.MeshBasicMaterial({
                    vertexColors: THREE.FaceColors
                });
                var geometry = new THREE.BoxGeometry(1, 1, 1);
                if(j==2){
                    geometry.faces[0].color = new THREE.Color(0xFF0000);
                    geometry.faces[1].color = new THREE.Color(0xFF0000);
                }
                else{
                    geometry.faces[0].color = new THREE.Color(0x000000);
                    geometry.faces[1].color = new THREE.Color(0x000000);
                }
                if(j==0){
                    geometry.faces[2].color = new THREE.Color(0xFF8000);
                    geometry.faces[3].color = new THREE.Color(0xFF8000);
                }
                else{
                    geometry.faces[2].color = new THREE.Color(0x000000);
                    geometry.faces[3].color = new THREE.Color(0x000000);
                }
                if(i==2){
                    geometry.faces[4].color = new THREE.Color(0xFFFFFF);
                    geometry.faces[5].color = new THREE.Color(0xFFFFFF);
                }
                else{
                    geometry.faces[4].color = new THREE.Color(0x000000);
                    geometry.faces[5].color = new THREE.Color(0x000000);
                }
                if(i==0){
                    geometry.faces[6].color = new THREE.Color(0xFFFF00);
                    geometry.faces[7].color = new THREE.Color(0xFFFF00);
                }
                else{
                    geometry.faces[6].color = new THREE.Color(0x000000);
                    geometry.faces[7].color = new THREE.Color(0x000000);
                }
                if(k==2){
                    geometry.faces[8].color = new THREE.Color(0x00FF00);
                    geometry.faces[9].color = new THREE.Color(0x00FF00);
                }
                else{
                    geometry.faces[8].color = new THREE.Color(0x000000);
                    geometry.faces[9].color = new THREE.Color(0x000000);
                }
                if(k==0){
                    geometry.faces[10].color = new THREE.Color(0x0000FF);
                    geometry.faces[11].color = new THREE.Color(0x0000FF);
                }
                else{
                    geometry.faces[10].color = new THREE.Color(0x000000);
                    geometry.faces[11].color = new THREE.Color(0x000000);
                }
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
    camera.position.x = 2;
    camera.position.y = 5;
    camera.lookAt(0,0,0);

    animate();
};

onkeydown = function(e){
    e = e || event;
    var map = [];
    map[e.keyCode] = e.type == 'keydown';
    if(map[73]){stringSeq+=" R"}
    else if(map[75]){stringSeq+=" R'"}
    else if(map[74]){stringSeq+=" U"}
    else if(map[70]){stringSeq+=" U'"}
    else if(map[72]){stringSeq+=" F"}
    else if(map[71]){stringSeq+=" F'"}
    else if(map[68]){stringSeq+=" L"}
    else if(map[69]){stringSeq+=" L'"}
    else if(map[83]){stringSeq+=" D"}
    else if(map[76]){stringSeq+=" D'"}
    else if(map[87]){stringSeq+=" B"}
    else if(map[79]){stringSeq+=" B'"}
}

var deg = 0;
var face = 0;
var stringSeq = "R'";
var currentMove = 0;
var moves = {
    "R":function(a){R(-a)},
    "R'":function(a){R(a)},
    "R2":function(a){R(-a*2)},
    "R2'":function(a){R(a*2)},
    "L":function(a){L(-a)},
    "L'":function(a){L(a)},
    "L2":function(a){L(-a*2)},
    "L2'":function(a){L(a*2)},
    "U":function(a){U(-a)},
    "U'":function(a){U(a)},
    "U2":function(a){U(-a*2)},
    "U2'":function(a){U(a*2)},
    "D":function(a){D(-a)},
    "D'":function(a){D(a)},
    "D2":function(a){D(-a*2)},
    "D2'":function(a){D(a*2)},
    "F":function(a){F(-a)},
    "F'":function(a){F(a)},
    "F2":function(a){F(-a*2)},
    "F2'":function(a){F(a*2)},
    "B":function(a){B(-a)},
    "B'":function(a){B(a)},
    "B2":function(a){B(-a*2)},
    "B2'":function(a){B(a*2)},
}
var ends = {
    "R":endR,
    "R'":endRi,
    "R2":function(){endR();endR();},
    "R2'":function(){endR();endR();},
    "L":endL,
    "L'":endLi,
    "L2":function(){endL();endL();},
    "L2'":function(){endL();endL();},
    "U":endU,
    "U'":endUi,
    "U2":function(){endU();endU();},
    "U2'":function(){endU();endU();},
    "D":endD,
    "D'":endDi,
    "D2":function(){endD();endD();},
    "D2'":function(){endD();endD();},
    "F":endF,
    "F'":endFi,
    "F2":function(){endF();endF();},
    "F2'":function(){endF();endF();},
    "B":endB,
    "B'":endBi,
    "B2":function(){endB();endB();},
    "B2'":function(){endB();endB();},
}
function animate() {
    document.getElementById("img").innerHTML = "";
    drawBig.draw(3,stringSeq,"img");
    var seq =stringSeq.split(" ");
    deg+=30;
    if(deg<=90){
        moves[seq[currentMove]](deg);
    }
    else{
        if(currentMove<seq.length-1){
            deg = 0;
            ends[seq[currentMove]]();
            currentMove++;
        }
    }
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

function rotate(num,amnt,f){
    switch(rotations[num][f]){
        case 1:
            borders[num].rotation.y = amnt;
            cubies[num].rotation.y = amnt;
            break;
        case 3:
            borders[num].rotation.y = -amnt;
            cubies[num].rotation.y = -amnt;
            break;
        case 2:
            borders[num].rotation.z = amnt;
            cubies[num].rotation.z = amnt;
            break;
        case 5:
            borders[num].rotation.z = -amnt;
            cubies[num].rotation.z = -amnt;
            break;
        case 4:
            borders[num].rotation.x = amnt;
            cubies[num].rotation.x = amnt;
            break;
        case 0:
            borders[num].rotation.x = -amnt;
            cubies[num].rotation.x = -amnt;
            break;
    }
}

function endUi(){
    var buffer = cubies[18].geometry.faces[4].color;
    cubies[18].geometry.faces[4].color = cubies[24].geometry.faces[4].color;
    cubies[24].geometry.faces[4].color = cubies[26].geometry.faces[4].color;
    cubies[26].geometry.faces[4].color = cubies[20].geometry.faces[4].color;
    cubies[20].geometry.faces[4].color = buffer;
    buffer = cubies[18].geometry.faces[5].color;
    cubies[18].geometry.faces[5].color = cubies[24].geometry.faces[5].color;
    cubies[24].geometry.faces[5].color = cubies[26].geometry.faces[5].color;
    cubies[26].geometry.faces[5].color = cubies[20].geometry.faces[5].color;
    cubies[20].geometry.faces[5].color = buffer;
    buffer = cubies[19].geometry.faces[4].color;
    cubies[19].geometry.faces[4].color = cubies[21].geometry.faces[4].color;
    cubies[21].geometry.faces[4].color = cubies[25].geometry.faces[4].color;
    cubies[25].geometry.faces[4].color = cubies[23].geometry.faces[4].color;
    cubies[23].geometry.faces[4].color = buffer;
    buffer = cubies[19].geometry.faces[5].color;
    cubies[19].geometry.faces[5].color = cubies[21].geometry.faces[5].color;
    cubies[21].geometry.faces[5].color = cubies[25].geometry.faces[5].color;
    cubies[25].geometry.faces[5].color = cubies[23].geometry.faces[5].color;
    cubies[23].geometry.faces[5].color = buffer;
    buffer = cubies[18].geometry.faces[2].color;
    cubies[18].geometry.faces[2].color = cubies[24].geometry.faces[10].color;
    cubies[24].geometry.faces[10].color = cubies[26].geometry.faces[0].color;
    cubies[26].geometry.faces[0].color = cubies[20].geometry.faces[8].color;
    cubies[20].geometry.faces[8].color = buffer;
    buffer = cubies[18].geometry.faces[3].color;
    cubies[18].geometry.faces[3].color = cubies[24].geometry.faces[11].color;
    cubies[24].geometry.faces[11].color = cubies[26].geometry.faces[1].color;
    cubies[26].geometry.faces[1].color = cubies[20].geometry.faces[9].color;
    cubies[20].geometry.faces[9].color = buffer;
    buffer = cubies[19].geometry.faces[2].color;
    cubies[19].geometry.faces[2].color = cubies[21].geometry.faces[10].color;
    cubies[21].geometry.faces[10].color = cubies[25].geometry.faces[0].color;
    cubies[25].geometry.faces[0].color = cubies[23].geometry.faces[8].color;
    cubies[23].geometry.faces[8].color = buffer;
    buffer = cubies[19].geometry.faces[3].color;
    cubies[19].geometry.faces[3].color = cubies[21].geometry.faces[11].color;
    cubies[21].geometry.faces[11].color = cubies[25].geometry.faces[1].color;
    cubies[25].geometry.faces[1].color = cubies[23].geometry.faces[9].color;
    cubies[23].geometry.faces[9].color = buffer;

    buffer = cubies[20].geometry.faces[2].color;
    cubies[20].geometry.faces[2].color = cubies[18].geometry.faces[10].color;
    cubies[18].geometry.faces[10].color = cubies[24].geometry.faces[0].color;
    cubies[24].geometry.faces[0].color = cubies[26].geometry.faces[8].color;
    cubies[26].geometry.faces[8].color = buffer;
    buffer = cubies[20].geometry.faces[3].color;
    cubies[20].geometry.faces[3].color = cubies[18].geometry.faces[11].color;
    cubies[18].geometry.faces[11].color = cubies[24].geometry.faces[1].color;
    cubies[24].geometry.faces[1].color = cubies[26].geometry.faces[9].color;
    cubies[26].geometry.faces[9].color = buffer;

    cubies[18].geometry.elementsNeedUpdate = true;
    cubies[24].geometry.elementsNeedUpdate = true;
    cubies[26].geometry.elementsNeedUpdate = true;
    cubies[20].geometry.elementsNeedUpdate = true;
    cubies[19].geometry.elementsNeedUpdate = true;
    cubies[21].geometry.elementsNeedUpdate = true;
    cubies[25].geometry.elementsNeedUpdate = true;
    cubies[23].geometry.elementsNeedUpdate = true;
    U(0);
}//done
function endU(){
    var buffer = cubies[18].geometry.faces[4].color;
    cubies[18].geometry.faces[4].color = cubies[20].geometry.faces[4].color;
    cubies[20].geometry.faces[4].color = cubies[26].geometry.faces[4].color;
    cubies[26].geometry.faces[4].color = cubies[24].geometry.faces[4].color;
    cubies[24].geometry.faces[4].color = buffer;
    buffer = cubies[18].geometry.faces[5].color;
    cubies[18].geometry.faces[5].color = cubies[20].geometry.faces[5].color;
    cubies[20].geometry.faces[5].color = cubies[26].geometry.faces[5].color;
    cubies[26].geometry.faces[5].color = cubies[24].geometry.faces[5].color;
    cubies[24].geometry.faces[5].color = buffer;
    buffer = cubies[19].geometry.faces[4].color;
    cubies[19].geometry.faces[4].color = cubies[23].geometry.faces[4].color;
    cubies[23].geometry.faces[4].color = cubies[25].geometry.faces[4].color;
    cubies[25].geometry.faces[4].color = cubies[21].geometry.faces[4].color;
    cubies[21].geometry.faces[4].color = buffer;
    buffer = cubies[19].geometry.faces[5].color;
    cubies[19].geometry.faces[5].color = cubies[23].geometry.faces[5].color;
    cubies[23].geometry.faces[5].color = cubies[25].geometry.faces[5].color;
    cubies[25].geometry.faces[5].color = cubies[21].geometry.faces[5].color;
    cubies[21].geometry.faces[5].color = buffer;
    buffer = cubies[18].geometry.faces[2].color;
    cubies[18].geometry.faces[2].color = cubies[20].geometry.faces[8].color;
    cubies[20].geometry.faces[8].color = cubies[26].geometry.faces[0].color;
    cubies[26].geometry.faces[0].color = cubies[24].geometry.faces[10].color;
    cubies[24].geometry.faces[10].color = buffer;
    buffer = cubies[18].geometry.faces[3].color;
    cubies[18].geometry.faces[3].color = cubies[20].geometry.faces[9].color;
    cubies[20].geometry.faces[9].color = cubies[26].geometry.faces[1].color;
    cubies[26].geometry.faces[1].color = cubies[24].geometry.faces[11].color;
    cubies[24].geometry.faces[11].color = buffer;
    buffer = cubies[19].geometry.faces[2].color;
    cubies[19].geometry.faces[2].color = cubies[23].geometry.faces[8].color;
    cubies[23].geometry.faces[8].color = cubies[25].geometry.faces[0].color;
    cubies[25].geometry.faces[0].color = cubies[21].geometry.faces[10].color;
    cubies[21].geometry.faces[10].color = buffer;
    buffer = cubies[19].geometry.faces[3].color;
    cubies[19].geometry.faces[3].color = cubies[23].geometry.faces[9].color;
    cubies[23].geometry.faces[9].color = cubies[25].geometry.faces[1].color;
    cubies[25].geometry.faces[1].color = cubies[21].geometry.faces[11].color;
    cubies[21].geometry.faces[11].color = buffer;
    buffer = cubies[20].geometry.faces[2].color;
    cubies[20].geometry.faces[2].color = cubies[26].geometry.faces[8].color;
    cubies[26].geometry.faces[8].color = cubies[24].geometry.faces[0].color;
    cubies[24].geometry.faces[0].color = cubies[18].geometry.faces[10].color;
    cubies[18].geometry.faces[10].color = buffer;
    buffer = cubies[20].geometry.faces[3].color;
    cubies[20].geometry.faces[3].color = cubies[26].geometry.faces[9].color;
    cubies[26].geometry.faces[9].color = cubies[24].geometry.faces[1].color;
    cubies[24].geometry.faces[1].color = cubies[18].geometry.faces[11].color;
    cubies[18].geometry.faces[11].color = buffer;

    U(0);
    cubies[18].geometry.elementsNeedUpdate = true;
    cubies[24].geometry.elementsNeedUpdate = true;
    cubies[26].geometry.elementsNeedUpdate = true;
    cubies[20].geometry.elementsNeedUpdate = true;
    cubies[19].geometry.elementsNeedUpdate = true;
    cubies[21].geometry.elementsNeedUpdate = true;
    cubies[25].geometry.elementsNeedUpdate = true;
    cubies[23].geometry.elementsNeedUpdate = true;

}//done
function endR(){
    var buffer = cubies[8].geometry.faces[0].color;
    cubies[8].geometry.faces[0].color = cubies[6].geometry.faces[0].color;
    cubies[6].geometry.faces[0].color = cubies[24].geometry.faces[0].color;
    cubies[24].geometry.faces[0].color = cubies[26].geometry.faces[0].color;
    cubies[26].geometry.faces[0].color = buffer;
    buffer = cubies[8].geometry.faces[1].color;
    cubies[8].geometry.faces[1].color = cubies[6].geometry.faces[1].color;
    cubies[6].geometry.faces[1].color = cubies[24].geometry.faces[1].color;
    cubies[24].geometry.faces[1].color = cubies[26].geometry.faces[1].color;
    cubies[26].geometry.faces[1].color = buffer;
    buffer = cubies[7].geometry.faces[0].color;
    cubies[7].geometry.faces[0].color = cubies[15].geometry.faces[0].color;
    cubies[15].geometry.faces[0].color = cubies[25].geometry.faces[0].color;
    cubies[25].geometry.faces[0].color = cubies[17].geometry.faces[0].color;
    cubies[17].geometry.faces[0].color = buffer;
    buffer = cubies[7].geometry.faces[1].color;
    cubies[7].geometry.faces[1].color = cubies[15].geometry.faces[1].color;
    cubies[15].geometry.faces[1].color = cubies[25].geometry.faces[1].color;
    cubies[25].geometry.faces[1].color = cubies[17].geometry.faces[1].color;
    cubies[17].geometry.faces[1].color = buffer;

    buffer = cubies[8].geometry.faces[6].color;
    cubies[8].geometry.faces[6].color = cubies[6].geometry.faces[11].color;
    cubies[6].geometry.faces[11].color = cubies[24].geometry.faces[4].color;
    cubies[24].geometry.faces[4].color = cubies[26].geometry.faces[8].color;
    cubies[26].geometry.faces[8].color = buffer;
    buffer = cubies[8].geometry.faces[7].color;
    cubies[8].geometry.faces[7].color = cubies[6].geometry.faces[10].color;
    cubies[6].geometry.faces[10].color = cubies[24].geometry.faces[5].color;
    cubies[24].geometry.faces[5].color = cubies[26].geometry.faces[9].color;
    cubies[26].geometry.faces[9].color = buffer;

    buffer = cubies[7].geometry.faces[6].color;
    cubies[7].geometry.faces[6].color = cubies[15].geometry.faces[11].color;
    cubies[15].geometry.faces[11].color = cubies[25].geometry.faces[4].color;
    cubies[25].geometry.faces[4].color = cubies[17].geometry.faces[8].color;
    cubies[17].geometry.faces[8].color = buffer;
    buffer = cubies[7].geometry.faces[7].color;
    cubies[7].geometry.faces[7].color = cubies[15].geometry.faces[10].color;
    cubies[15].geometry.faces[10].color = cubies[25].geometry.faces[5].color;
    cubies[25].geometry.faces[5].color = cubies[17].geometry.faces[9].color;
    cubies[17].geometry.faces[9].color = buffer;

    buffer = cubies[6].geometry.faces[6].color;
    cubies[6].geometry.faces[6].color = cubies[24].geometry.faces[11].color;
    cubies[24].geometry.faces[11].color = cubies[26].geometry.faces[4].color;
    cubies[26].geometry.faces[4].color = cubies[8].geometry.faces[8].color;
    cubies[8].geometry.faces[8].color = buffer;
    buffer = cubies[6].geometry.faces[7].color;
    cubies[6].geometry.faces[7].color = cubies[24].geometry.faces[10].color;
    cubies[24].geometry.faces[10].color = cubies[26].geometry.faces[5].color;
    cubies[26].geometry.faces[5].color = cubies[8].geometry.faces[9].color;
    cubies[8].geometry.faces[9].color = buffer;

    cubies[8].geometry.elementsNeedUpdate = true;
    cubies[6].geometry.elementsNeedUpdate = true;
    cubies[24].geometry.elementsNeedUpdate = true;
    cubies[26].geometry.elementsNeedUpdate = true;
    cubies[7].geometry.elementsNeedUpdate = true;
    cubies[15].geometry.elementsNeedUpdate = true;
    cubies[25].geometry.elementsNeedUpdate = true;
    cubies[17].geometry.elementsNeedUpdate = true;
    R(0);
}//done
function endRi(){
    var buffer = cubies[8].geometry.faces[0].color;
    cubies[8].geometry.faces[0].color = cubies[26].geometry.faces[0].color;
    cubies[26].geometry.faces[0].color = cubies[24].geometry.faces[0].color;
    cubies[24].geometry.faces[0].color = cubies[6].geometry.faces[0].color;
    cubies[6].geometry.faces[0].color = buffer;
    buffer = cubies[8].geometry.faces[1].color;
    cubies[8].geometry.faces[1].color = cubies[26].geometry.faces[1].color;
    cubies[26].geometry.faces[1].color = cubies[24].geometry.faces[1].color;
    cubies[24].geometry.faces[1].color = cubies[6].geometry.faces[1].color;
    cubies[6].geometry.faces[1].color = buffer;
    buffer = cubies[7].geometry.faces[0].color;
    cubies[7].geometry.faces[0].color = cubies[17].geometry.faces[0].color;
    cubies[17].geometry.faces[0].color = cubies[25].geometry.faces[0].color;
    cubies[25].geometry.faces[0].color = cubies[15].geometry.faces[0].color;
    cubies[15].geometry.faces[0].color = buffer;
    buffer = cubies[7].geometry.faces[1].color;
    cubies[7].geometry.faces[1].color = cubies[17].geometry.faces[1].color;
    cubies[17].geometry.faces[1].color = cubies[25].geometry.faces[1].color;
    cubies[25].geometry.faces[1].color = cubies[15].geometry.faces[1].color;
    cubies[15].geometry.faces[1].color = buffer;

    buffer = cubies[8].geometry.faces[6].color;
    cubies[8].geometry.faces[6].color = cubies[26].geometry.faces[8].color;
    cubies[26].geometry.faces[8].color = cubies[24].geometry.faces[4].color;
    cubies[24].geometry.faces[4].color = cubies[6].geometry.faces[11].color;
    cubies[6].geometry.faces[11].color = buffer;
    buffer = cubies[8].geometry.faces[7].color;
    cubies[8].geometry.faces[7].color = cubies[26].geometry.faces[9].color;
    cubies[26].geometry.faces[9].color = cubies[24].geometry.faces[5].color;
    cubies[24].geometry.faces[5].color = cubies[6].geometry.faces[10].color;
    cubies[6].geometry.faces[10].color = buffer;

    buffer = cubies[7].geometry.faces[6].color;
    cubies[7].geometry.faces[6].color = cubies[17].geometry.faces[8].color;
    cubies[17].geometry.faces[8].color = cubies[25].geometry.faces[4].color;
    cubies[25].geometry.faces[4].color = cubies[15].geometry.faces[11].color;
    cubies[15].geometry.faces[11].color = buffer;
    buffer = cubies[7].geometry.faces[7].color;
    cubies[7].geometry.faces[7].color = cubies[17].geometry.faces[9].color;
    cubies[17].geometry.faces[9].color = cubies[25].geometry.faces[5].color;
    cubies[25].geometry.faces[5].color = cubies[15].geometry.faces[10].color;
    cubies[15].geometry.faces[10].color = buffer;

    buffer = cubies[6].geometry.faces[6].color;
    cubies[6].geometry.faces[6].color = cubies[8].geometry.faces[8].color;
    cubies[8].geometry.faces[8].color = cubies[26].geometry.faces[4].color;
    cubies[26].geometry.faces[4].color = cubies[24].geometry.faces[11].color;
    cubies[24].geometry.faces[11].color = buffer;
    buffer = cubies[6].geometry.faces[7].color;
    cubies[6].geometry.faces[7].color = cubies[8].geometry.faces[9].color;
    cubies[8].geometry.faces[9].color = cubies[26].geometry.faces[5].color;
    cubies[26].geometry.faces[5].color = cubies[24].geometry.faces[10].color;
    cubies[24].geometry.faces[10].color = buffer;

    cubies[8].geometry.elementsNeedUpdate = true;
    cubies[6].geometry.elementsNeedUpdate = true;
    cubies[24].geometry.elementsNeedUpdate = true;
    cubies[26].geometry.elementsNeedUpdate = true;
    cubies[7].geometry.elementsNeedUpdate = true;
    cubies[15].geometry.elementsNeedUpdate = true;
    cubies[25].geometry.elementsNeedUpdate = true;
    cubies[17].geometry.elementsNeedUpdate = true;
    R(0);
}//done
function endD(){
    var buffer = cubies[0].geometry.faces[6].color;
    cubies[0].geometry.faces[6].color = cubies[6].geometry.faces[6].color;
    cubies[6].geometry.faces[6].color = cubies[8].geometry.faces[6].color;
    cubies[8].geometry.faces[6].color = cubies[2].geometry.faces[6].color;
    cubies[2].geometry.faces[6].color = buffer;
    buffer = cubies[0].geometry.faces[7].color;
    cubies[0].geometry.faces[7].color = cubies[6].geometry.faces[7].color;
    cubies[6].geometry.faces[7].color = cubies[8].geometry.faces[7].color;
    cubies[8].geometry.faces[7].color = cubies[2].geometry.faces[7].color;
    cubies[2].geometry.faces[7].color = buffer;

    buffer = cubies[1].geometry.faces[6].color;
    cubies[1].geometry.faces[6].color = cubies[3].geometry.faces[6].color;
    cubies[3].geometry.faces[6].color = cubies[7].geometry.faces[6].color;
    cubies[7].geometry.faces[6].color = cubies[5].geometry.faces[6].color;
    cubies[5].geometry.faces[6].color = buffer;
    buffer = cubies[1].geometry.faces[7].color;
    cubies[1].geometry.faces[7].color = cubies[3].geometry.faces[7].color;
    cubies[3].geometry.faces[7].color = cubies[7].geometry.faces[7].color;
    cubies[7].geometry.faces[7].color = cubies[5].geometry.faces[7].color;
    cubies[5].geometry.faces[7].color = buffer;

    buffer = cubies[0].geometry.faces[2].color;
    cubies[0].geometry.faces[2].color = cubies[6].geometry.faces[10].color;
    cubies[6].geometry.faces[10].color = cubies[8].geometry.faces[0].color;
    cubies[8].geometry.faces[0].color = cubies[2].geometry.faces[8].color;
    cubies[2].geometry.faces[8].color = buffer;
    buffer = cubies[0].geometry.faces[3].color;
    cubies[0].geometry.faces[3].color = cubies[6].geometry.faces[11].color;
    cubies[6].geometry.faces[11].color = cubies[8].geometry.faces[1].color;
    cubies[8].geometry.faces[1].color = cubies[2].geometry.faces[9].color;
    cubies[2].geometry.faces[9].color = buffer;

    buffer = cubies[1].geometry.faces[2].color;
    cubies[1].geometry.faces[2].color = cubies[3].geometry.faces[10].color;
    cubies[3].geometry.faces[10].color = cubies[7].geometry.faces[0].color;
    cubies[7].geometry.faces[0].color = cubies[5].geometry.faces[8].color;
    cubies[5].geometry.faces[8].color = buffer;
    buffer = cubies[1].geometry.faces[3].color;
    cubies[1].geometry.faces[3].color = cubies[3].geometry.faces[11].color;
    cubies[3].geometry.faces[11].color = cubies[7].geometry.faces[1].color;
    cubies[7].geometry.faces[1].color = cubies[5].geometry.faces[9].color;
    cubies[5].geometry.faces[9].color = buffer;

    buffer = cubies[2].geometry.faces[2].color;
    cubies[2].geometry.faces[2].color = cubies[0].geometry.faces[10].color;
    cubies[0].geometry.faces[10].color = cubies[6].geometry.faces[0].color;
    cubies[6].geometry.faces[0].color = cubies[8].geometry.faces[8].color;
    cubies[8].geometry.faces[8].color = buffer;
    buffer = cubies[2].geometry.faces[3].color;
    cubies[2].geometry.faces[3].color = cubies[0].geometry.faces[11].color;
    cubies[0].geometry.faces[11].color = cubies[6].geometry.faces[1].color;
    cubies[6].geometry.faces[1].color = cubies[8].geometry.faces[9].color;
    cubies[8].geometry.faces[9].color = buffer;

    cubies[0].geometry.elementsNeedUpdate = true;
    cubies[1].geometry.elementsNeedUpdate = true;
    cubies[2].geometry.elementsNeedUpdate = true;
    cubies[3].geometry.elementsNeedUpdate = true;
    cubies[5].geometry.elementsNeedUpdate = true;
    cubies[6].geometry.elementsNeedUpdate = true;
    cubies[7].geometry.elementsNeedUpdate = true;
    cubies[8].geometry.elementsNeedUpdate = true;
    D(0);
}//done
function endDi(){
    var buffer = cubies[0].geometry.faces[6].color;
    cubies[0].geometry.faces[6].color = cubies[2].geometry.faces[6].color;
    cubies[2].geometry.faces[6].color = cubies[8].geometry.faces[6].color;
    cubies[8].geometry.faces[6].color = cubies[6].geometry.faces[6].color;
    cubies[6].geometry.faces[6].color = buffer;
    buffer = cubies[0].geometry.faces[7].color;
    cubies[0].geometry.faces[7].color = cubies[2].geometry.faces[7].color;
    cubies[2].geometry.faces[7].color = cubies[8].geometry.faces[7].color;
    cubies[8].geometry.faces[7].color = cubies[6].geometry.faces[7].color;
    cubies[6].geometry.faces[7].color = buffer;
    buffer = cubies[1].geometry.faces[6].color;
    cubies[1].geometry.faces[6].color = cubies[5].geometry.faces[6].color;
    cubies[5].geometry.faces[6].color = cubies[7].geometry.faces[6].color;
    cubies[7].geometry.faces[6].color = cubies[3].geometry.faces[6].color;
    cubies[3].geometry.faces[6].color = buffer;
    buffer = cubies[1].geometry.faces[7].color;
    cubies[1].geometry.faces[7].color = cubies[5].geometry.faces[7].color;
    cubies[5].geometry.faces[7].color = cubies[7].geometry.faces[7].color;
    cubies[7].geometry.faces[7].color = cubies[3].geometry.faces[7].color;
    cubies[3].geometry.faces[7].color = buffer;

    buffer = cubies[0].geometry.faces[2].color;
    cubies[0].geometry.faces[2].color = cubies[2].geometry.faces[8].color;
    cubies[2].geometry.faces[8].color = cubies[8].geometry.faces[0].color;
    cubies[8].geometry.faces[0].color = cubies[6].geometry.faces[10].color;
    cubies[6].geometry.faces[10].color = buffer;
    buffer = cubies[0].geometry.faces[3].color;
    cubies[0].geometry.faces[3].color = cubies[2].geometry.faces[9].color;
    cubies[2].geometry.faces[9].color = cubies[8].geometry.faces[1].color;
    cubies[8].geometry.faces[1].color = cubies[6].geometry.faces[11].color;
    cubies[6].geometry.faces[11].color = buffer;

    buffer = cubies[1].geometry.faces[2].color;
    cubies[1].geometry.faces[2].color = cubies[5].geometry.faces[8].color;
    cubies[5].geometry.faces[8].color = cubies[7].geometry.faces[0].color;
    cubies[7].geometry.faces[0].color = cubies[3].geometry.faces[10].color;
    cubies[3].geometry.faces[10].color = buffer;
    buffer = cubies[1].geometry.faces[3].color;
    cubies[1].geometry.faces[3].color = cubies[5].geometry.faces[9].color;
    cubies[5].geometry.faces[9].color = cubies[7].geometry.faces[1].color;
    cubies[7].geometry.faces[1].color = cubies[3].geometry.faces[11].color;
    cubies[3].geometry.faces[11].color = buffer;

    buffer = cubies[2].geometry.faces[2].color;
    cubies[2].geometry.faces[2].color = cubies[8].geometry.faces[8].color;
    cubies[8].geometry.faces[8].color = cubies[6].geometry.faces[0].color;
    cubies[6].geometry.faces[0].color = cubies[0].geometry.faces[10].color;
    cubies[0].geometry.faces[10].color = buffer;
    buffer = cubies[2].geometry.faces[3].color;
    cubies[2].geometry.faces[3].color = cubies[8].geometry.faces[9].color;
    cubies[8].geometry.faces[9].color = cubies[6].geometry.faces[1].color;
    cubies[6].geometry.faces[1].color = cubies[0].geometry.faces[11].color;
    cubies[0].geometry.faces[11].color = buffer;

    cubies[0].geometry.elementsNeedUpdate = true;
    cubies[1].geometry.elementsNeedUpdate = true;
    cubies[2].geometry.elementsNeedUpdate = true;
    cubies[3].geometry.elementsNeedUpdate = true;
    cubies[5].geometry.elementsNeedUpdate = true;
    cubies[6].geometry.elementsNeedUpdate = true;
    cubies[7].geometry.elementsNeedUpdate = true;
    cubies[8].geometry.elementsNeedUpdate = true;
    D(0);
}//done
function endL(){
    var buffer = cubies[0].geometry.faces[2].color;
    cubies[0].geometry.faces[2].color = cubies[2].geometry.faces[2].color;
    cubies[2].geometry.faces[2].color = cubies[20].geometry.faces[2].color;
    cubies[20].geometry.faces[2].color = cubies[18].geometry.faces[2].color;
    cubies[18].geometry.faces[2].color = buffer;
    buffer = cubies[0].geometry.faces[3].color;
    cubies[0].geometry.faces[3].color = cubies[2].geometry.faces[3].color;
    cubies[2].geometry.faces[3].color = cubies[20].geometry.faces[3].color;
    cubies[20].geometry.faces[3].color = cubies[18].geometry.faces[3].color;
    cubies[18].geometry.faces[3].color = buffer;

    buffer = cubies[1].geometry.faces[2].color;
    cubies[1].geometry.faces[2].color = cubies[11].geometry.faces[2].color;
    cubies[11].geometry.faces[2].color = cubies[19].geometry.faces[2].color;
    cubies[19].geometry.faces[2].color = cubies[9].geometry.faces[2].color;
    cubies[9].geometry.faces[2].color = buffer;
    buffer = cubies[1].geometry.faces[3].color;
    cubies[1].geometry.faces[3].color = cubies[11].geometry.faces[3].color;
    cubies[11].geometry.faces[3].color = cubies[19].geometry.faces[3].color;
    cubies[19].geometry.faces[3].color = cubies[9].geometry.faces[3].color;
    cubies[9].geometry.faces[3].color = buffer;

    buffer = cubies[0].geometry.faces[6].color;
    cubies[0].geometry.faces[6].color = cubies[2].geometry.faces[8].color;
    cubies[2].geometry.faces[8].color = cubies[20].geometry.faces[4].color;
    cubies[20].geometry.faces[4].color = cubies[18].geometry.faces[10].color;
    cubies[18].geometry.faces[10].color = buffer;
    buffer = cubies[0].geometry.faces[7].color;
    cubies[0].geometry.faces[7].color = cubies[2].geometry.faces[9].color;
    cubies[2].geometry.faces[9].color = cubies[20].geometry.faces[5].color;
    cubies[20].geometry.faces[5].color = cubies[18].geometry.faces[11].color;
    cubies[18].geometry.faces[11].color = buffer;

    buffer = cubies[1].geometry.faces[6].color;
    cubies[1].geometry.faces[6].color = cubies[11].geometry.faces[8].color;
    cubies[11].geometry.faces[8].color = cubies[19].geometry.faces[4].color;
    cubies[19].geometry.faces[4].color = cubies[9].geometry.faces[10].color;
    cubies[9].geometry.faces[10].color = buffer;
    buffer = cubies[1].geometry.faces[7].color;
    cubies[1].geometry.faces[7].color = cubies[11].geometry.faces[9].color;
    cubies[11].geometry.faces[9].color = cubies[19].geometry.faces[5].color;
    cubies[19].geometry.faces[5].color = cubies[9].geometry.faces[11].color;
    cubies[9].geometry.faces[11].color = buffer;

    buffer = cubies[2].geometry.faces[6].color;
    cubies[2].geometry.faces[6].color = cubies[20].geometry.faces[8].color;
    cubies[20].geometry.faces[8].color = cubies[18].geometry.faces[4].color;
    cubies[18].geometry.faces[4].color = cubies[0].geometry.faces[10].color;
    cubies[0].geometry.faces[10].color = buffer;
    buffer = cubies[2].geometry.faces[7].color;
    cubies[2].geometry.faces[7].color = cubies[20].geometry.faces[9].color;
    cubies[20].geometry.faces[9].color = cubies[18].geometry.faces[5].color;
    cubies[18].geometry.faces[5].color = cubies[0].geometry.faces[11].color;
    cubies[0].geometry.faces[11].color = buffer;

    cubies[0].geometry.elementsNeedUpdate = true;
    cubies[2].geometry.elementsNeedUpdate = true;
    cubies[20].geometry.elementsNeedUpdate = true;
    cubies[18].geometry.elementsNeedUpdate = true;
    cubies[1].geometry.elementsNeedUpdate = true;
    cubies[11].geometry.elementsNeedUpdate = true;
    cubies[19].geometry.elementsNeedUpdate = true;
    cubies[9].geometry.elementsNeedUpdate = true;

    L(0);
}//done
function endLi(){
    var buffer = cubies[0].geometry.faces[2].color;
    cubies[0].geometry.faces[2].color = cubies[18].geometry.faces[2].color;
    cubies[18].geometry.faces[2].color = cubies[20].geometry.faces[2].color;
    cubies[20].geometry.faces[2].color = cubies[2].geometry.faces[2].color;
    cubies[2].geometry.faces[2].color = buffer;
    buffer = cubies[0].geometry.faces[3].color;
    cubies[0].geometry.faces[3].color = cubies[18].geometry.faces[3].color;
    cubies[18].geometry.faces[3].color = cubies[20].geometry.faces[3].color;
    cubies[20].geometry.faces[3].color = cubies[2].geometry.faces[3].color;
    cubies[2].geometry.faces[3].color = buffer;

    buffer = cubies[1].geometry.faces[2].color;
    cubies[1].geometry.faces[2].color = cubies[9].geometry.faces[2].color;
    cubies[9].geometry.faces[2].color = cubies[19].geometry.faces[2].color;
    cubies[19].geometry.faces[2].color = cubies[11].geometry.faces[2].color;
    cubies[11].geometry.faces[2].color = buffer;
    buffer = cubies[1].geometry.faces[3].color;
    cubies[1].geometry.faces[3].color = cubies[9].geometry.faces[3].color;
    cubies[9].geometry.faces[3].color = cubies[19].geometry.faces[3].color;
    cubies[19].geometry.faces[3].color = cubies[11].geometry.faces[3].color;
    cubies[11].geometry.faces[3].color = buffer;

    buffer = cubies[0].geometry.faces[6].color;
    cubies[0].geometry.faces[6].color = cubies[18].geometry.faces[10].color;
    cubies[18].geometry.faces[10].color = cubies[20].geometry.faces[4].color;
    cubies[20].geometry.faces[4].color = cubies[2].geometry.faces[8].color;
    cubies[2].geometry.faces[8].color = buffer;
    buffer = cubies[0].geometry.faces[7].color;
    cubies[0].geometry.faces[7].color = cubies[18].geometry.faces[11].color;
    cubies[18].geometry.faces[11].color = cubies[20].geometry.faces[5].color;
    cubies[20].geometry.faces[5].color = cubies[2].geometry.faces[9].color;
    cubies[2].geometry.faces[9].color = buffer;

    buffer = cubies[1].geometry.faces[6].color;
    cubies[1].geometry.faces[6].color = cubies[9].geometry.faces[10].color;
    cubies[9].geometry.faces[10].color = cubies[19].geometry.faces[4].color;
    cubies[19].geometry.faces[4].color = cubies[11].geometry.faces[8].color;
    cubies[11].geometry.faces[8].color = buffer;
    buffer = cubies[1].geometry.faces[7].color;
    cubies[1].geometry.faces[7].color = cubies[9].geometry.faces[11].color;
    cubies[9].geometry.faces[11].color = cubies[19].geometry.faces[5].color;
    cubies[19].geometry.faces[5].color = cubies[11].geometry.faces[9].color;
    cubies[11].geometry.faces[9].color = buffer;

    buffer = cubies[2].geometry.faces[6].color;
    cubies[2].geometry.faces[6].color = cubies[0].geometry.faces[10].color;
    cubies[0].geometry.faces[10].color = cubies[18].geometry.faces[4].color;
    cubies[18].geometry.faces[4].color = cubies[20].geometry.faces[8].color;
    cubies[20].geometry.faces[8].color = buffer;
    buffer = cubies[2].geometry.faces[7].color;
    cubies[2].geometry.faces[7].color = cubies[0].geometry.faces[11].color;
    cubies[0].geometry.faces[11].color = cubies[18].geometry.faces[5].color;
    cubies[18].geometry.faces[5].color = cubies[20].geometry.faces[9].color;
    cubies[20].geometry.faces[9].color = buffer;

    cubies[0].geometry.elementsNeedUpdate = true;
    cubies[2].geometry.elementsNeedUpdate = true;
    cubies[20].geometry.elementsNeedUpdate = true;
    cubies[18].geometry.elementsNeedUpdate = true;
    cubies[1].geometry.elementsNeedUpdate = true;
    cubies[11].geometry.elementsNeedUpdate = true;
    cubies[19].geometry.elementsNeedUpdate = true;
    cubies[9].geometry.elementsNeedUpdate = true;

    L(0);
}//done

function endF(){
    var buffer = cubies[2].geometry.faces[8].color;
    cubies[2].geometry.faces[8].color = cubies[8].geometry.faces[8].color;
    cubies[8].geometry.faces[8].color = cubies[26].geometry.faces[8].color;
    cubies[26].geometry.faces[8].color = cubies[20].geometry.faces[8].color;
    cubies[20].geometry.faces[8].color = buffer;
    buffer = cubies[2].geometry.faces[9].color;
    cubies[2].geometry.faces[9].color = cubies[8].geometry.faces[9].color;
    cubies[8].geometry.faces[9].color = cubies[26].geometry.faces[9].color;
    cubies[26].geometry.faces[9].color = cubies[20].geometry.faces[9].color;
    cubies[20].geometry.faces[9].color = buffer;

    buffer = cubies[5].geometry.faces[8].color;
    cubies[5].geometry.faces[8].color = cubies[17].geometry.faces[8].color;
    cubies[17].geometry.faces[8].color = cubies[23].geometry.faces[8].color;
    cubies[23].geometry.faces[8].color = cubies[11].geometry.faces[8].color;
    cubies[11].geometry.faces[8].color = buffer;
    buffer = cubies[5].geometry.faces[9].color;
    cubies[5].geometry.faces[9].color = cubies[17].geometry.faces[9].color;
    cubies[17].geometry.faces[9].color = cubies[23].geometry.faces[9].color;
    cubies[23].geometry.faces[9].color = cubies[11].geometry.faces[9].color;
    cubies[11].geometry.faces[9].color = buffer;

    buffer = cubies[2].geometry.faces[6].color;
    cubies[2].geometry.faces[6].color = cubies[8].geometry.faces[0].color;
    cubies[8].geometry.faces[0].color = cubies[26].geometry.faces[4].color;
    cubies[26].geometry.faces[4].color = cubies[20].geometry.faces[2].color;
    cubies[20].geometry.faces[2].color = buffer;
    buffer = cubies[2].geometry.faces[7].color;
    cubies[2].geometry.faces[7].color = cubies[8].geometry.faces[1].color;
    cubies[8].geometry.faces[1].color = cubies[26].geometry.faces[5].color;
    cubies[26].geometry.faces[5].color = cubies[20].geometry.faces[3].color;
    cubies[20].geometry.faces[3].color = buffer;

    buffer = cubies[5].geometry.faces[6].color;
    cubies[5].geometry.faces[6].color = cubies[17].geometry.faces[0].color;
    cubies[17].geometry.faces[0].color = cubies[23].geometry.faces[4].color;
    cubies[23].geometry.faces[4].color = cubies[11].geometry.faces[2].color;
    cubies[11].geometry.faces[2].color = buffer;
    buffer = cubies[5].geometry.faces[7].color;
    cubies[5].geometry.faces[7].color = cubies[17].geometry.faces[1].color;
    cubies[17].geometry.faces[1].color = cubies[23].geometry.faces[5].color;
    cubies[23].geometry.faces[5].color = cubies[11].geometry.faces[3].color;
    cubies[11].geometry.faces[3].color = buffer;

    buffer = cubies[8].geometry.faces[6].color;
    cubies[8].geometry.faces[6].color = cubies[26].geometry.faces[0].color;
    cubies[26].geometry.faces[0].color = cubies[20].geometry.faces[4].color;
    cubies[20].geometry.faces[4].color = cubies[2].geometry.faces[2].color;
    cubies[2].geometry.faces[2].color = buffer;
    buffer = cubies[8].geometry.faces[7].color;
    cubies[8].geometry.faces[7].color = cubies[26].geometry.faces[1].color;
    cubies[26].geometry.faces[1].color = cubies[20].geometry.faces[5].color;
    cubies[20].geometry.faces[5].color = cubies[2].geometry.faces[3].color;
    cubies[2].geometry.faces[3].color = buffer;

    cubies[2].geometry.elementsNeedUpdate = true;
    cubies[8].geometry.elementsNeedUpdate = true;
    cubies[26].geometry.elementsNeedUpdate = true;
    cubies[20].geometry.elementsNeedUpdate = true;
    cubies[5].geometry.elementsNeedUpdate = true;
    cubies[17].geometry.elementsNeedUpdate = true;
    cubies[23].geometry.elementsNeedUpdate = true;
    cubies[11].geometry.elementsNeedUpdate = true;

    F(0);
}
function endFi(){
    var buffer = cubies[2].geometry.faces[8].color;
    cubies[2].geometry.faces[8].color = cubies[20].geometry.faces[8].color;
    cubies[20].geometry.faces[8].color = cubies[26].geometry.faces[8].color;
    cubies[26].geometry.faces[8].color = cubies[8].geometry.faces[8].color;
    cubies[8].geometry.faces[8].color = buffer;
    buffer = cubies[2].geometry.faces[9].color;
    cubies[2].geometry.faces[9].color = cubies[20].geometry.faces[9].color;
    cubies[20].geometry.faces[9].color = cubies[26].geometry.faces[9].color;
    cubies[26].geometry.faces[9].color = cubies[8].geometry.faces[9].color;
    cubies[8].geometry.faces[9].color = buffer;

    buffer = cubies[5].geometry.faces[8].color;
    cubies[5].geometry.faces[8].color = cubies[11].geometry.faces[8].color;
    cubies[11].geometry.faces[8].color = cubies[23].geometry.faces[8].color;
    cubies[23].geometry.faces[8].color = cubies[17].geometry.faces[8].color;
    cubies[17].geometry.faces[8].color = buffer;
    buffer = cubies[5].geometry.faces[9].color;
    cubies[5].geometry.faces[9].color = cubies[11].geometry.faces[9].color;
    cubies[11].geometry.faces[9].color = cubies[23].geometry.faces[9].color;
    cubies[23].geometry.faces[9].color = cubies[17].geometry.faces[9].color;
    cubies[17].geometry.faces[9].color = buffer;

    buffer = cubies[2].geometry.faces[6].color;
    cubies[2].geometry.faces[6].color = cubies[20].geometry.faces[2].color;
    cubies[20].geometry.faces[2].color = cubies[26].geometry.faces[4].color;
    cubies[26].geometry.faces[4].color = cubies[8].geometry.faces[0].color;
    cubies[8].geometry.faces[0].color = buffer;
    buffer = cubies[2].geometry.faces[7].color;
    cubies[2].geometry.faces[7].color = cubies[20].geometry.faces[3].color;
    cubies[20].geometry.faces[3].color = cubies[26].geometry.faces[5].color;
    cubies[26].geometry.faces[5].color = cubies[8].geometry.faces[1].color;
    cubies[8].geometry.faces[1].color = buffer;

    buffer = cubies[5].geometry.faces[6].color;
    cubies[5].geometry.faces[6].color = cubies[11].geometry.faces[2].color;
    cubies[11].geometry.faces[2].color = cubies[23].geometry.faces[4].color;
    cubies[23].geometry.faces[4].color = cubies[17].geometry.faces[0].color;
    cubies[17].geometry.faces[0].color = buffer;
    buffer = cubies[5].geometry.faces[7].color;
    cubies[5].geometry.faces[7].color = cubies[11].geometry.faces[3].color;
    cubies[11].geometry.faces[3].color = cubies[23].geometry.faces[5].color;
    cubies[23].geometry.faces[5].color = cubies[17].geometry.faces[1].color;
    cubies[17].geometry.faces[1].color = buffer;

    buffer = cubies[8].geometry.faces[6].color;
    cubies[8].geometry.faces[6].color = cubies[2].geometry.faces[2].color;
    cubies[2].geometry.faces[2].color = cubies[20].geometry.faces[4].color;
    cubies[20].geometry.faces[4].color = cubies[26].geometry.faces[0].color;
    cubies[26].geometry.faces[0].color = buffer;
    buffer = cubies[8].geometry.faces[7].color;
    cubies[8].geometry.faces[7].color = cubies[2].geometry.faces[3].color;
    cubies[2].geometry.faces[3].color = cubies[20].geometry.faces[5].color;
    cubies[20].geometry.faces[5].color = cubies[26].geometry.faces[1].color;
    cubies[26].geometry.faces[1].color = buffer;

    cubies[2].geometry.elementsNeedUpdate = true;
    cubies[8].geometry.elementsNeedUpdate = true;
    cubies[26].geometry.elementsNeedUpdate = true;
    cubies[20].geometry.elementsNeedUpdate = true;
    cubies[5].geometry.elementsNeedUpdate = true;
    cubies[17].geometry.elementsNeedUpdate = true;
    cubies[23].geometry.elementsNeedUpdate = true;
    cubies[11].geometry.elementsNeedUpdate = true;

    F(0);
}//done
function endB(){
    var buffer = cubies[0].geometry.faces[10].color;
    cubies[0].geometry.faces[10].color = cubies[18].geometry.faces[10].color;
    cubies[18].geometry.faces[10].color = cubies[24].geometry.faces[10].color;
    cubies[24].geometry.faces[10].color = cubies[6].geometry.faces[10].color;
    cubies[6].geometry.faces[10].color = buffer;
    buffer = cubies[0].geometry.faces[11].color;
    cubies[0].geometry.faces[11].color = cubies[18].geometry.faces[11].color;
    cubies[18].geometry.faces[11].color = cubies[24].geometry.faces[11].color;
    cubies[24].geometry.faces[11].color = cubies[6].geometry.faces[11].color;
    cubies[6].geometry.faces[11].color = buffer;

    buffer = cubies[3].geometry.faces[10].color;
    cubies[3].geometry.faces[10].color = cubies[9].geometry.faces[10].color;
    cubies[9].geometry.faces[10].color = cubies[21].geometry.faces[10].color;
    cubies[21].geometry.faces[10].color = cubies[15].geometry.faces[10].color;
    cubies[15].geometry.faces[10].color = buffer;
    buffer = cubies[3].geometry.faces[11].color;
    cubies[3].geometry.faces[11].color = cubies[9].geometry.faces[11].color;
    cubies[9].geometry.faces[11].color = cubies[21].geometry.faces[11].color;
    cubies[21].geometry.faces[11].color = cubies[15].geometry.faces[11].color;
    cubies[15].geometry.faces[11].color = buffer;

    buffer = cubies[0].geometry.faces[6].color;
    cubies[0].geometry.faces[6].color = cubies[18].geometry.faces[2].color;
    cubies[18].geometry.faces[2].color = cubies[24].geometry.faces[4].color;
    cubies[24].geometry.faces[4].color = cubies[6].geometry.faces[0].color;
    cubies[6].geometry.faces[0].color = buffer;
    buffer = cubies[0].geometry.faces[7].color;
    cubies[0].geometry.faces[7].color = cubies[18].geometry.faces[3].color;
    cubies[18].geometry.faces[3].color = cubies[24].geometry.faces[5].color;
    cubies[24].geometry.faces[5].color = cubies[6].geometry.faces[1].color;
    cubies[6].geometry.faces[1].color = buffer;

    buffer = cubies[3].geometry.faces[6].color;
    cubies[3].geometry.faces[6].color = cubies[9].geometry.faces[2].color;
    cubies[9].geometry.faces[2].color = cubies[21].geometry.faces[4].color;
    cubies[21].geometry.faces[4].color = cubies[15].geometry.faces[0].color;
    cubies[15].geometry.faces[0].color = buffer;
    buffer = cubies[3].geometry.faces[7].color;
    cubies[3].geometry.faces[7].color = cubies[9].geometry.faces[3].color;
    cubies[9].geometry.faces[3].color = cubies[21].geometry.faces[5].color;
    cubies[21].geometry.faces[5].color = cubies[15].geometry.faces[1].color;
    cubies[15].geometry.faces[1].color = buffer;

    buffer = cubies[6].geometry.faces[6].color;
    cubies[6].geometry.faces[6].color = cubies[0].geometry.faces[2].color;
    cubies[0].geometry.faces[2].color = cubies[18].geometry.faces[4].color;
    cubies[18].geometry.faces[4].color = cubies[24].geometry.faces[0].color;
    cubies[24].geometry.faces[0].color = buffer;
    buffer = cubies[6].geometry.faces[7].color;
    cubies[6].geometry.faces[7].color = cubies[0].geometry.faces[3].color;
    cubies[0].geometry.faces[3].color = cubies[18].geometry.faces[5].color;
    cubies[18].geometry.faces[5].color = cubies[24].geometry.faces[1].color;
    cubies[24].geometry.faces[1].color = buffer;

    cubies[0].geometry.elementsNeedUpdate = true;
    cubies[18].geometry.elementsNeedUpdate = true;
    cubies[24].geometry.elementsNeedUpdate = true;
    cubies[6].geometry.elementsNeedUpdate = true;
    cubies[3].geometry.elementsNeedUpdate = true;
    cubies[9].geometry.elementsNeedUpdate = true;
    cubies[21].geometry.elementsNeedUpdate = true;
    cubies[15].geometry.elementsNeedUpdate = true;
    B(0);
}
function endBi(){
    var buffer = cubies[0].geometry.faces[10].color;
    cubies[0].geometry.faces[10].color = cubies[6].geometry.faces[10].color;
    cubies[6].geometry.faces[10].color = cubies[24].geometry.faces[10].color;
    cubies[24].geometry.faces[10].color = cubies[18].geometry.faces[10].color;
    cubies[18].geometry.faces[10].color = buffer;
    buffer = cubies[0].geometry.faces[11].color;
    cubies[0].geometry.faces[11].color = cubies[6].geometry.faces[11].color;
    cubies[6].geometry.faces[11].color = cubies[24].geometry.faces[11].color;
    cubies[24].geometry.faces[11].color = cubies[18].geometry.faces[11].color;
    cubies[18].geometry.faces[11].color = buffer;

    buffer = cubies[3].geometry.faces[10].color;
    cubies[3].geometry.faces[10].color = cubies[15].geometry.faces[10].color;
    cubies[15].geometry.faces[10].color = cubies[21].geometry.faces[10].color;
    cubies[21].geometry.faces[10].color = cubies[9].geometry.faces[10].color;
    cubies[9].geometry.faces[10].color = buffer;
    buffer = cubies[3].geometry.faces[11].color;
    cubies[3].geometry.faces[11].color = cubies[15].geometry.faces[11].color;
    cubies[15].geometry.faces[11].color = cubies[21].geometry.faces[11].color;
    cubies[21].geometry.faces[11].color = cubies[9].geometry.faces[11].color;
    cubies[9].geometry.faces[11].color = buffer;

    buffer = cubies[0].geometry.faces[6].color;
    cubies[0].geometry.faces[6].color = cubies[6].geometry.faces[0].color;
    cubies[6].geometry.faces[0].color = cubies[24].geometry.faces[4].color;
    cubies[24].geometry.faces[4].color = cubies[18].geometry.faces[2].color;
    cubies[18].geometry.faces[2].color = buffer;
    buffer = cubies[0].geometry.faces[7].color;
    cubies[0].geometry.faces[7].color = cubies[6].geometry.faces[1].color;
    cubies[6].geometry.faces[1].color = cubies[24].geometry.faces[5].color;
    cubies[24].geometry.faces[5].color = cubies[18].geometry.faces[3].color;
    cubies[18].geometry.faces[3].color = buffer;

    buffer = cubies[3].geometry.faces[6].color;
    cubies[3].geometry.faces[6].color = cubies[15].geometry.faces[0].color;
    cubies[15].geometry.faces[0].color = cubies[21].geometry.faces[4].color;
    cubies[21].geometry.faces[4].color = cubies[9].geometry.faces[2].color;
    cubies[9].geometry.faces[2].color = buffer;
    buffer = cubies[3].geometry.faces[7].color;
    cubies[3].geometry.faces[7].color = cubies[15].geometry.faces[1].color;
    cubies[15].geometry.faces[1].color = cubies[21].geometry.faces[5].color;
    cubies[21].geometry.faces[5].color = cubies[9].geometry.faces[3].color;
    cubies[9].geometry.faces[3].color = buffer;

    buffer = cubies[6].geometry.faces[6].color;
    cubies[6].geometry.faces[6].color = cubies[24].geometry.faces[0].color;
    cubies[24].geometry.faces[0].color = cubies[18].geometry.faces[4].color;
    cubies[18].geometry.faces[4].color = cubies[0].geometry.faces[2].color;
    cubies[0].geometry.faces[2].color = buffer;
    buffer = cubies[6].geometry.faces[7].color;
    cubies[6].geometry.faces[7].color = cubies[24].geometry.faces[1].color;
    cubies[24].geometry.faces[1].color = cubies[18].geometry.faces[5].color;
    cubies[18].geometry.faces[5].color = cubies[0].geometry.faces[3].color;
    cubies[0].geometry.faces[3].color = buffer;

    cubies[0].geometry.elementsNeedUpdate = true;
    cubies[18].geometry.elementsNeedUpdate = true;
    cubies[24].geometry.elementsNeedUpdate = true;
    cubies[6].geometry.elementsNeedUpdate = true;
    cubies[3].geometry.elementsNeedUpdate = true;
    cubies[9].geometry.elementsNeedUpdate = true;
    cubies[21].geometry.elementsNeedUpdate = true;
    cubies[15].geometry.elementsNeedUpdate = true;
    B(0);
}
function U(deg) {
    cubies[22].rotation.y = deg*Math.PI/180;
    cubies[23].position.x = Math.sin(deg*Math.PI/180)*1;
    cubies[23].position.z = Math.cos(deg*Math.PI/180)*1;
    rotate(23,(deg)*Math.PI/180,1);
    cubies[19].position.x = Math.sin((deg-90)*Math.PI/180)*1;
    cubies[19].position.z = Math.cos((deg-90)*Math.PI/180)*1;
    rotate(19,(deg)*Math.PI/180,1);
    cubies[25].position.x = Math.sin((deg+90)*Math.PI/180)*1;
    cubies[25].position.z = Math.cos((deg+90)*Math.PI/180)*1;
    rotate(25,(deg)*Math.PI/180,1);
    cubies[21].position.x = Math.sin((deg+180)*Math.PI/180)*1;
    cubies[21].position.z = Math.cos((deg+180)*Math.PI/180)*1;
    rotate(21,(deg)*Math.PI/180,1);
    cubies[20].position.x = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    cubies[20].position.z = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    rotate(20,(deg)*Math.PI/180,1);
    cubies[24].position.x = Math.sin((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    cubies[24].position.z = Math.cos((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    rotate(24,(deg)*Math.PI/180,1);
    cubies[26].position.x = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    cubies[26].position.z = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    rotate(26,(deg)*Math.PI/180,1);
    cubies[18].position.x = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    cubies[18].position.z = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    rotate(18,(deg)*Math.PI/180,1);
    borders[22].rotation.y = deg*Math.PI/180;
    borders[23].position.x = Math.sin(deg*Math.PI/180);
    borders[23].position.z = Math.cos(deg*Math.PI/180);
    borders[19].position.x = Math.sin((deg-90)*Math.PI/180);
    borders[19].position.z = Math.cos((deg-90)*Math.PI/180);
    borders[25].position.x = Math.sin((deg+90)*Math.PI/180);
    borders[25].position.z = Math.cos((deg+90)*Math.PI/180);
    borders[21].position.x = Math.sin((deg+180)*Math.PI/180);
    borders[21].position.z = Math.cos((deg+180)*Math.PI/180);
    borders[20].position.x = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[20].position.z = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[24].position.x = Math.sin((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    borders[24].position.z = Math.cos((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    borders[26].position.x = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[26].position.z = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[18].position.x = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[18].position.z = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
}
function D(deg){
    cubies[4].rotation.y = -deg*Math.PI/180;
    cubies[5].position.x = Math.sin(deg*Math.PI/180)*-1;
    cubies[5].position.z = Math.cos(deg*Math.PI/180)*1;
    rotate(5,(deg)*Math.PI/180,3);
    cubies[7].position.x = Math.sin((deg-90)*Math.PI/180)*-1;
    cubies[7].position.z = Math.cos((deg-90)*Math.PI/180)*1;
    rotate(7,(deg)*Math.PI/180,3);
    cubies[1].position.x = Math.sin((deg+90)*Math.PI/180)*-1;
    cubies[1].position.z = Math.cos((deg+90)*Math.PI/180)*1;
    rotate(1,(deg)*Math.PI/180,3);
    cubies[3].position.x = Math.sin((deg+180)*Math.PI/180)*-1;
    cubies[3].position.z = Math.cos((deg+180)*Math.PI/180)*1;
    rotate(3,(deg)*Math.PI/180,3);
    cubies[8].position.x = Math.sin((deg-45)*Math.PI/180)*-Math.sqrt(2);
    cubies[8].position.z = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    rotate(8,(deg)*Math.PI/180,3);
    cubies[0].position.x = Math.sin((deg-45-180)*Math.PI/180)*-Math.sqrt(2);
    cubies[0].position.z = Math.cos((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    rotate(0,(deg)*Math.PI/180,3);
    cubies[2].position.x = Math.sin((deg+45)*Math.PI/180)*-Math.sqrt(2);
    cubies[2].position.z = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    rotate(2,(deg)*Math.PI/180,3);
    cubies[6].position.x = Math.sin((deg-45-90)*Math.PI/180)*-Math.sqrt(2);
    cubies[6].position.z = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    rotate(6,(deg)*Math.PI/180,3);
    borders[4].rotation.y = -deg*Math.PI/180;
    borders[5].position.x = Math.sin(deg*Math.PI/180)*-1;
    borders[5].position.z = Math.cos(deg*Math.PI/180)*1;
    borders[7].position.x = Math.sin((deg-90)*Math.PI/180)*-1;
    borders[7].position.z = Math.cos((deg-90)*Math.PI/180)*1;
    borders[1].position.x = Math.sin((deg+90)*Math.PI/180)*-1;
    borders[1].position.z = Math.cos((deg+90)*Math.PI/180)*1;
    borders[3].position.x = Math.sin((deg+180)*Math.PI/180)*-1;
    borders[3].position.z = Math.cos((deg+180)*Math.PI/180)*1;
    borders[8].position.x = Math.sin((deg-45)*Math.PI/180)*-Math.sqrt(2);
    borders[8].position.z = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[0].position.x = Math.sin((deg-45-180)*Math.PI/180)*-Math.sqrt(2);
    borders[0].position.z = Math.cos((deg-45-180)*Math.PI/180)*Math.sqrt(2);
    borders[2].position.x = Math.sin((deg+45)*Math.PI/180)*-Math.sqrt(2);
    borders[2].position.z = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[6].position.x = Math.sin((deg-45-90)*Math.PI/180)*-Math.sqrt(2);
    borders[6].position.z = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
}
function R(deg){
    cubies[16].rotation.x = deg*Math.PI/180;
    cubies[17].position.y = Math.sin((deg+180)*Math.PI/180)*1;
    cubies[17].position.z = Math.cos((deg+180)*Math.PI/180)*-1;
    rotate(17,deg*Math.PI/180,4);
    cubies[15].position.y = Math.sin((deg)*Math.PI/180)*1;
    cubies[15].position.z = Math.cos((deg)*Math.PI/180)*-1;
    rotate(15,deg*Math.PI/180,4);
    cubies[25].position.y = Math.sin((deg+90)*Math.PI/180)*1;
    cubies[25].position.z = Math.cos((deg+90)*Math.PI/180)*-1;
    rotate(25,deg*Math.PI/180,4);
    cubies[7].position.y = Math.sin((deg-90)*Math.PI/180)*1;
    cubies[7].position.z = Math.cos((deg-90)*Math.PI/180)*-1;
    rotate(7,deg*Math.PI/180,4);
    cubies[6].position.y = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    cubies[6].position.z = Math.cos((deg-45)*Math.PI/180)*-Math.sqrt(2);
    rotate(6,(deg)*Math.PI/180,4);
    cubies[8].position.y = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    cubies[8].position.z = Math.cos((deg-45-90)*Math.PI/180)*-Math.sqrt(2);
    rotate(8,(deg)*Math.PI/180,4);
    cubies[24].position.y = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    cubies[24].position.z = Math.cos((deg+45)*Math.PI/180)*-Math.sqrt(2);
    rotate(24,(deg)*Math.PI/180,4);
    cubies[26].position.y = Math.sin((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    cubies[26].position.z = Math.cos((deg-45+180)*Math.PI/180)*-Math.sqrt(2);
    rotate(26,(deg)*Math.PI/180,4);
    borders[16].rotation.x = deg*Math.PI/180;
    borders[17].position.y = Math.sin((deg+180)*Math.PI/180)*1;
    borders[17].position.z = Math.cos((deg+180)*Math.PI/180)*-1;
    borders[15].position.y = Math.sin((deg)*Math.PI/180)*1;
    borders[15].position.z = Math.cos((deg)*Math.PI/180)*-1;
    borders[25].position.y = Math.sin((deg+90)*Math.PI/180)*1;
    borders[25].position.z = Math.cos((deg+90)*Math.PI/180)*-1;
    borders[7].position.y = Math.sin((deg-90)*Math.PI/180)*1;
    borders[7].position.z = Math.cos((deg-90)*Math.PI/180)*-1;
    borders[6].position.y = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[6].position.z = Math.cos((deg-45)*Math.PI/180)*-Math.sqrt(2);
    borders[8].position.y = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[8].position.z = Math.cos((deg-45-90)*Math.PI/180)*-Math.sqrt(2);
    borders[24].position.y = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[24].position.z = Math.cos((deg+45)*Math.PI/180)*-Math.sqrt(2);
    borders[26].position.y = Math.sin((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    borders[26].position.z = Math.cos((deg-45+180)*Math.PI/180)*-Math.sqrt(2);
}
function L(deg){
    cubies[10].rotation.x = -deg*Math.PI/180;
    cubies[9].position.y = Math.sin((deg+180)*Math.PI/180)*1;
    cubies[9].position.z = Math.cos((deg+180)*Math.PI/180)*1;
    rotate(9,deg*Math.PI/180,0);
    cubies[11].position.y = Math.sin((deg)*Math.PI/180)*1;
    cubies[11].position.z = Math.cos((deg)*Math.PI/180)*1;
    rotate(11,deg*Math.PI/180,0);
    cubies[19].position.y = Math.sin((deg+90)*Math.PI/180)*1;
    cubies[19].position.z = Math.cos((deg+90)*Math.PI/180)*1;
    rotate(19,deg*Math.PI/180,0);
    cubies[1].position.y = Math.sin((deg-90)*Math.PI/180)*1;
    cubies[1].position.z = Math.cos((deg-90)*Math.PI/180)*1;
    rotate(1,deg*Math.PI/180,0);
    cubies[2].position.y = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    cubies[2].position.z = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    rotate(2,deg*Math.PI/180,0);
    cubies[0].position.y = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    cubies[0].position.z = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    rotate(0,deg*Math.PI/180,0);
    cubies[20].position.y = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    cubies[20].position.z = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    rotate(20,deg*Math.PI/180,0);
    cubies[18].position.y = Math.sin((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    cubies[18].position.z = Math.cos((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    rotate(18,deg*Math.PI/180,0);
    borders[10].rotation.x = -deg*Math.PI/180;
    borders[9].position.y = Math.sin((deg+180)*Math.PI/180)*1;
    borders[9].position.z = Math.cos((deg+180)*Math.PI/180)*1;
    borders[9].rotation.x = -deg*Math.PI/180;
    borders[11].position.y = Math.sin((deg)*Math.PI/180)*1;
    borders[11].position.z = Math.cos((deg)*Math.PI/180)*1;
    borders[11].rotation.x = -deg*Math.PI/180;
    borders[19].position.y = Math.sin((deg+90)*Math.PI/180)*1;
    borders[19].position.z = Math.cos((deg+90)*Math.PI/180)*1;
    borders[19].rotation.x = -deg*Math.PI/180;
    borders[1].position.y = Math.sin((deg-90)*Math.PI/180)*1;
    borders[1].position.z = Math.cos((deg-90)*Math.PI/180)*1;
    borders[1].rotation.x = -deg*Math.PI/180;
    borders[2].position.y = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[2].position.z = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[2].rotation.x = (-deg)*Math.PI/180;
    borders[0].position.y = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[0].position.z = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[0].rotation.x = (-deg)*Math.PI/180;
    borders[20].position.y = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[20].position.z = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[20].rotation.x = (-deg)*Math.PI/180;
    borders[18].position.y = Math.sin((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    borders[18].position.z = Math.cos((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    borders[18].rotation.x = (-deg)*Math.PI/180;
}
function F(deg){
    cubies[14].rotation.z = deg*Math.PI/180;
    cubies[23].position.x = Math.sin((deg+180)*Math.PI/180)*1;
    cubies[23].position.y = Math.cos((deg+180)*Math.PI/180)*-1;
    rotate(23,deg*Math.PI/180,2);
    cubies[5].position.x = Math.sin((deg)*Math.PI/180)*1;
    cubies[5].position.y = Math.cos((deg)*Math.PI/180)*-1;
    rotate(5,deg*Math.PI/180,2);
    cubies[17].position.x = Math.sin((deg+90)*Math.PI/180)*1;
    cubies[17].position.y = Math.cos((deg+90)*Math.PI/180)*-1;
    rotate(17,deg*Math.PI/180,2);
    cubies[11].position.x = Math.sin((deg-90)*Math.PI/180)*1;
    cubies[11].position.y = Math.cos((deg-90)*Math.PI/180)*-1;
    rotate(11,deg*Math.PI/180,2);
    cubies[2].position.x = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    cubies[2].position.y = Math.cos((deg-45)*Math.PI/180)*-Math.sqrt(2);
    rotate(2,deg*Math.PI/180,2);
    cubies[20].position.x = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    cubies[20].position.y = Math.cos((deg-45-90)*Math.PI/180)*-Math.sqrt(2);
    rotate(20,deg*Math.PI/180,2);
    cubies[8].position.x = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    cubies[8].position.y = Math.cos((deg+45)*Math.PI/180)*-Math.sqrt(2);
    rotate(8,deg*Math.PI/180,2);
    cubies[26].position.x = Math.sin((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    cubies[26].position.y = Math.cos((deg-45+180)*Math.PI/180)*-Math.sqrt(2);
    rotate(26,deg*Math.PI/180,2);
    borders[14].rotation.z = deg*Math.PI/180;
    borders[23].position.x = Math.sin((deg+180)*Math.PI/180)*1;
    borders[23].position.y = Math.cos((deg+180)*Math.PI/180)*-1;
    borders[5].position.x = Math.sin((deg)*Math.PI/180)*1;
    borders[5].position.y = Math.cos((deg)*Math.PI/180)*-1;
    borders[17].position.x = Math.sin((deg+90)*Math.PI/180)*1;
    borders[17].position.y = Math.cos((deg+90)*Math.PI/180)*-1;
    borders[11].position.x = Math.sin((deg-90)*Math.PI/180)*1;
    borders[11].position.y = Math.cos((deg-90)*Math.PI/180)*-1;
    borders[2].position.x = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[2].position.y = Math.cos((deg-45)*Math.PI/180)*-Math.sqrt(2);
    borders[20].position.x = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[20].position.y = Math.cos((deg-45-90)*Math.PI/180)*-Math.sqrt(2);
    borders[8].position.x = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[8].position.y = Math.cos((deg+45)*Math.PI/180)*-Math.sqrt(2);
    borders[26].position.x = Math.sin((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    borders[26].position.y = Math.cos((deg-45+180)*Math.PI/180)*-Math.sqrt(2);
}
function B(deg){
    cubies[14-2].rotation.z = -deg*Math.PI/180;
    cubies[5-2].position.x = Math.sin((deg+180)*Math.PI/180)*1;
    cubies[5-2].position.y = Math.cos((deg+180)*Math.PI/180)*1;
    rotate(5-2,deg*Math.PI/180,5);
    cubies[23-2].position.x = Math.sin((deg)*Math.PI/180)*1;
    cubies[23-2].position.y = Math.cos((deg)*Math.PI/180)*1;
    rotate(23-2,deg*Math.PI/180,5);
    cubies[17-2].position.x = Math.sin((deg+90)*Math.PI/180)*1;
    cubies[17-2].position.y = Math.cos((deg+90)*Math.PI/180)*1;
    rotate(17-2,deg*Math.PI/180,5);
    cubies[11-2].position.x = Math.sin((deg-90)*Math.PI/180)*1;
    cubies[11-2].position.y = Math.cos((deg-90)*Math.PI/180)*1;
    rotate(11-2,deg*Math.PI/180,5);
    cubies[20-2].position.x = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    cubies[20-2].position.y = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    rotate(20-2,deg*Math.PI/180,5);
    cubies[2-2].position.x = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    cubies[2-2].position.y = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    rotate(2-2,deg*Math.PI/180,5);
    cubies[26-2].position.x = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    cubies[26-2].position.y = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    rotate(26-2,deg*Math.PI/180,5);
    cubies[8-2].position.x = Math.sin((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    cubies[8-2].position.y = Math.cos((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    rotate(8-2,deg*Math.PI/180,5);
    borders[14-2].rotation.z = -deg*Math.PI/180;
    borders[5-2].position.x = Math.sin((deg+180)*Math.PI/180)*1;
    borders[5-2].position.y = Math.cos((deg+180)*Math.PI/180)*1;
    borders[23-2].position.x = Math.sin((deg)*Math.PI/180)*1;
    borders[23-2].position.y = Math.cos((deg)*Math.PI/180)*1;
    borders[17-2].position.x = Math.sin((deg+90)*Math.PI/180)*1;
    borders[17-2].position.y = Math.cos((deg+90)*Math.PI/180)*1;
    borders[11-2].position.x = Math.sin((deg-90)*Math.PI/180)*1;
    borders[11-2].position.y = Math.cos((deg-90)*Math.PI/180)*1;
    borders[20-2].position.x = Math.sin((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[20-2].position.y = Math.cos((deg-45)*Math.PI/180)*Math.sqrt(2);
    borders[2-2].position.x = Math.sin((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[2-2].position.y = Math.cos((deg-45-90)*Math.PI/180)*Math.sqrt(2);
    borders[26-2].position.x = Math.sin((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[26-2].position.y = Math.cos((deg+45)*Math.PI/180)*Math.sqrt(2);
    borders[8-2].position.x = Math.sin((deg-45+180)*Math.PI/180)*Math.sqrt(2);
    borders[8-2].position.y = Math.cos((deg-45+180)*Math.PI/180)*Math.sqrt(2);
}

var drawBig = (function(){
    var cube;
    var size;
    function r(f){
        turnFace(4);
        for(var i=0; i<f; i++) {
            for (var j=1; j<size+1; j++){
                var buffer = cube[1][size*j-1-i];
                cube[1][size*j-1- i] = cube[2][size*j-1-i];
                cube[2][size*j-1- i] = cube[3][size*j-1-i];
                cube[3][size*j-1- i] = cube[5][size*(size-j)+i];
                cube[5][size*(size-j)+i] = buffer;
            }

        }
    }
    function x(){
        turnFace(4);
        turnFace(0);
        turnFace(0);
        turnFace(0);
        var buffer = cube[1];
        cube[1]=cube[2];
        cube[2]=cube[3];
        cube[3]=cube[5];
        cube[5]=buffer;
        turnFace(5);
        turnFace(5);
        turnFace(3);
        turnFace(3);
    }
    function y(){
        turnFace(1);
        turnFace(3);
        turnFace(3);
        turnFace(3);
        var buffer = cube[0];
        cube[0]=cube[2];
        cube[2]=cube[4];
        cube[4]=cube[5];
        cube[5]=buffer;
    }
    function z(){
        turnFace(2);
        turnFace(5);
        turnFace(5);
        turnFace(5);
        var buffer = cube[1];
        cube[1]=cube[0];
        cube[0]=cube[3];
        cube[3]=cube[4];
        cube[4]=buffer;
        turnFace(1);
        turnFace(4);
        turnFace(0);
        turnFace(3);
    }
    function l(f){
        turnFace(0);
        for(var i=0; i<f; i++) {
            for (var j=0; j<size; j++){
                var buffer = cube[1][size*j+i];
                cube[1][size*j+i] = cube[5][size*(size-j)-i-1];
                cube[5][size*(size-j)-i-1] = cube[3][size*j+i];
                cube[3][size*j+i] = cube[2][size*j+i];
                cube[2][size*j+i] = buffer;
            }

        }

    }
    function u(f){
        turnFace(1);
        for(var i=0; i<f; i++) {
            for (var j=0; j<size; j++){
                var buffer = cube[0][size*i+j];
                cube[0][size*i+j] = cube[2][size*i+j];
                cube[2][size*i+j] = cube[4][size*i+j];
                cube[4][size*i+j] = cube[5][size*i+j];
                cube[5][size*i+j] = buffer;
            }
        }
    }
    function d(f){
        turnFace(3);
        for(var i=0; i<f; i++) {
            for (var j=0; j<size; j++){
                var buffer = cube[0][size*(size-i)-1-j];
                cube[0][size*(size-i)-1-j] = cube[5][size*(size-i)-1-j];
                cube[5][size*(size-i)-1-j] = cube[4][size*(size-i)-1-j];
                cube[4][size*(size-i)-1-j] = cube[2][size*(size-i)-1-j];
                cube[2][size*(size-i)-1-j] = buffer;
            }
        }
    }
    function f(f){
        turnFace(2);
        for(var i=0; i<f; i++) {
            for (var j=0; j<size; j++){
                var buffer = cube[1][size*(size-i)-j-1];
                cube[1][size*(size-i)-j-1] = cube[0][size*(j+1)-i-1];
                cube[0][size*(j+1)-i-1] = cube[3][i*size+j];
                cube[3][i*size+j] = cube[4][size*(size-j-1)+i];
                cube[4][size*(size-j-1)+i] = buffer;
            }
        }
    }
    function b(f){
        turnFace(5);
        for(var i=0; i<f; i++) {
            for (var j=0; j<size; j++){
                var buffer = cube[1][size*(i+1)-j-1];
                cube[1][size*(i+1)-j-1] = cube[4][size*(size-j)-i-1];
                cube[4][size*(size-j)-i-1] = cube[3][size*(size-i-1)+j];
                cube[3][size*(size-i-1)+j] = cube[0][size*j+i];
                cube[0][size*j+i] = buffer;
            }
        }
    }
    function turnFace(face){
        //corners
        var buffer = cube[face][0];
        cube[face][0] = cube[face][size*(size-1)];
        cube[face][size*(size-1)] = cube[face][size*size-1];
        cube[face][size*size-1] = cube[face][size-1];
        cube[face][size-1] = buffer;
        //edges
        for(var i=0; i<size-2; i++){
            buffer = cube[face][i+1];
            cube[face][i+1] = cube[face][size*(size-2-i)];
            cube[face][size*(size-2-i)] = cube[face][size*size-2-i];
            cube[face][size*size-2-i] = cube[face][size*(i+2)-1];
            cube[face][size*(i+2)-1]=buffer;
        }
        //centers
        for(var i=0; i<Math.floor(size/2)-1; i++){
            for(var j=0; j<size-1-2*(i+1); j++){
                buffer = cube[face][size*(i+1)+j+i+1];
                cube[face][size*(i+1)+j+i+1] = cube[face][size*(size-2-i-j)+i+1];
                cube[face][size*(size-2-i-j)+i+1] = cube[face][size*(size-1-i)-2-j-i];
                cube[face][size*(size-1-i)-2-j-i] = cube[face][size*(j+2+i)-2-i];
                cube[face][size*(j+2+i)-2-i] = buffer;
            }
        }
    }
    function drawCube(s,seq,id){
        size = s;
        var colors = ["#ff8000","#ffffff","#00ff00","#ffff00","#ff0000","#0000ff","#000000"]
        var moves = {
            R: r,
            L: l,
            U: u,
            D: d,
            F: f,
            B: b,
            x: x,
            y: y,
            z: z,
        }
        cube = [[],[],[],[],[],[]];
        for(var i=0; i<size*size; i++){
            cube[0][i]=0;
            cube[1][i]=1;
            cube[2][i]=2;
            cube[3][i]=3;
            cube[4][i]=4;
            cube[5][i]=5;
        }
        var seq = seq.split(" ");
        for(var i=0; i<seq.length; i++){
            var layers;
            var move = seq[i];
            var direction;
            if(move.charAt(0)>2){layers=Number(move.charAt(0))}
            else if(move.charAt(1)==="w"){layers = 2}
            else{layers=1;}
            if(move.indexOf("'")>-1){direction=3;}
            else if(move.indexOf("2")>-1){direction=2;}
            else{direction=1;}
            for(var j=0; j<direction; j++){
                var face;
                if(layers>2){
                    face = move.charAt(1);
                }
                else{
                    face = move.charAt(0);
                }
                if(move!=="" && move!=="\n") {
                    moves[face](layers);
                }
            }
        }
        var paper = Raphael(id, 255, 200);
        for (var i=0; i<size*size; i++){
            paper.rect(3+i%size*60/size, 65+Math.floor(i/size)*60/size, 60/size,60/size).attr({
                fill: colors[cube[0][i]],
                stroke: colors[6],
                "stroke-width": 1
            });
            paper.rect(65+i%size*60/size, 3+Math.floor(i/size)*60/size, 60/size,60/size).attr({
                fill: colors[cube[1][i]],
                stroke: colors[6],
                "stroke-width": 1
            });
            paper.rect(65+i%size*60/size, 65+Math.floor(i/size)*60/size, 60/size,60/size).attr({
                fill: colors[cube[2][i]],
                stroke: colors[6],
                "stroke-width": 1
            });
            paper.rect(65+i%size*60/size, 65+62+Math.floor(i/size)*60/size, 60/size,60/size).attr({
                fill: colors[cube[3][i]],
                stroke: colors[6],
                "stroke-width": 1
            });
            paper.rect(65+62+i%size*60/size, 65+Math.floor(i/size)*60/size, 60/size,60/size).attr({
                fill: colors[cube[4][i]],
                stroke: colors[6],
                "stroke-width": 1
            });
            paper.rect(65+62+62+i%size*60/size, 65+Math.floor(i/size)*60/size, 60/size,60/size).attr({
                fill: colors[cube[5][i]],
                stroke: colors[6],
                "stroke-width": 1
            });
        }
    }

    return{
        draw: drawCube,
    }
})();