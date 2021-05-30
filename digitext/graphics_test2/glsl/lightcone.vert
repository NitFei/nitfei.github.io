#ifdef GL_ES
precision highp float;
#endif


attribute vec2 a_position;
attribute float a_alpha;
uniform vec2 posOffset;
uniform vec2 worldsize;
varying float a;

void main() {
    vec2 offset = vec2((posOffset / worldsize) * 2.0 - 1.0);
    vec2 pos = vec2(offset.x + a_position.x, offset.y + a_position.y * (worldsize.x / worldsize.y));
    a = a_alpha;
    gl_Position = vec4(pos, 0, 1);
}