SPEED = 0.1
CHUNK_DISTANCE = 2
TEXTUREPACK = "hdtexturepack"//nombre de la carpeta
FOV = 80
//render
const renderer = new THREE.WebGLRenderer({antialias:false});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setClearColor( 0x22222);
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, CHUNK_DISTANCE*16 );
  
//controles
const controls = new PointerLockControls( camera, document.body );
document.body.addEventListener( 'click', function () {controls.lock();}, false );  
camera.position.z = 5;
teclOn = [0,0,0]//1=w,2=s ; 1=a,2=d ; 1=shift,2=space 
var speed = 0.1;
document.addEventListener("keydown", function(event){
  if (event.key == "w"){teclOn[0]=1}
  if (event.key == "s"){teclOn[0]=2}
  if (event.key == "a"){teclOn[1]=1}
  if (event.key == "d"){teclOn[1]=2}
  if (event.key == "Shift"){teclOn[2]=1}
  if (event.key == " "){teclOn[2]=2}

});
document.addEventListener("keyup", function(event){
  if (event.key == "w"){teclOn[0]=0}
  if (event.key == "s"){teclOn[0]=0}
  if (event.key == "a"){teclOn[1]=0}
  if (event.key == "d"){teclOn[1]=0}
  if (event.key == "Shift"){teclOn[2]=0}
  if (event.key == " "){teclOn[2]=0}

});
function moverse(){
  if(teclOn[0]==1){controls.moveForward(1*SPEED)}
  if(teclOn[0]==2){controls.moveForward(-1*SPEED)}
  if(teclOn[1]==1){controls.moveRight(-1*SPEED)}
  if(teclOn[1]==2){controls.moveRight(1*SPEED)}
  if(teclOn[2]==1){camera.position.y-=0.2}
  if(teclOn[2]==2){camera.position.y+=0.2}
}
function get_texture(id){
  var texloader= new THREE.TextureLoader()
  texloader.magFilter = THREE.NearestFilter;
  texloader
  var ruta = "./texturepack/"+TEXTUREPACK+"/assets/minecraft/textures/block/"
  switch(id){
    case 1:
      var side = new THREE.TextureLoader().load( ruta+"grass_block_side.png");
      var top = new THREE.TextureLoader().load( ruta+"grass_block_top.png");
      side.magFilter = THREE.NearestFilter;
      var texture = {
        side:side,
        map:top,
        
      }    
      return texture
}}
//Bloques
class bloque{

  set_block(id,pos){
    const geometry = new THREE.BoxGeometry(1,1);
    var material = new THREE.MeshBasicMaterial(get_texture(id))
    const cube = new THREE.Mesh( geometry,material)        //var material = new THREE.MeshBasicMaterial({color:0x11})           this.get_texture(id)
    cube.position.x = pos[0]
    cube.position.y = pos[1]
    cube.position.y = pos[2]

    scene.add(cube);
  }

}
for (var x = 0; x < 64; x++) {
  for (var y = 0; y < 32; y++) {
    for (var z = 0; z < 64; z++) {
      new bloque().set_block(1,[x,y,z])

   }
 }
}
const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  moverse()
};
animate();