#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D pixels;
varying vec2 v_texcoord;

void main() {
    vec2 coords = (v_texcoord + 1.0) * 0.5;
    vec4 color = texture2D(pixels, coords);
    gl_FragColor =vec4(color.rgb, color.a * 0.9);
}
