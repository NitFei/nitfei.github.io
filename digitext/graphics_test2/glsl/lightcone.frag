#ifdef GL_ES
precision highp float;
#endif


varying float a;

void main() {
    gl_FragColor = vec4(0,0,0,a);
}