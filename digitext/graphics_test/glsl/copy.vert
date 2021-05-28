#ifdef GL_ES
precision highp float;
#endif

attribute vec2 quad;

varying vec2 v_texcoord;

void main() {    
  // Pass the texcoord to the fragment shader.
  v_texcoord = quad;
  gl_Position = vec4(quad, 0, 1);
}