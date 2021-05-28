#ifdef GL_ES
precision highp float;
#endif

uniform vec4 color;
uniform sampler2D lastFrame;
varying vec2 velocity;
varying vec2 age;
uniform float maxAge;

const float DELTA = 0.2;

void main() {
    vec4 lFColor = texture2D(lastFrame, gl_PointCoord);

    if(age.x <= 0.0) {
        gl_FragColor = vec4(lFColor.rgb, lFColor.a * 0.8);
    } else {
        gl_FragColor = vec4(1,0,0.4,1.0 - (age.y / maxAge));
    }

    
}
