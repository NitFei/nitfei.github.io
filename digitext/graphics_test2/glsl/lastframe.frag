#ifdef GL_ES
precision highp float;
#endif

uniform vec2 worldsize;
uniform vec2 posOffset;
uniform sampler2D pixels;
varying vec2 v_texcoord;

void main() {
    vec2 offset = posOffset / worldsize;
    vec2 coords = (v_texcoord + 1.0) * 0.5; // returns value between 0 and 1
    
    if(coords.x + offset.x < 0.0 || coords.x + offset.x >= 1.0 || coords.y - offset.y < 0.0 || coords.y - offset.y >= 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        vec4 color = texture2D(pixels, vec2(coords.x - offset.x, coords.y + offset.y));
        if(color.r + color.g + color.b < 0.1) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        } else {
            gl_FragColor =vec4(color.rgb, color.a * 0.9);
        }
    }    
}
