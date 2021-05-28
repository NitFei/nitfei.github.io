#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D position;
uniform sampler2D velocity;
uniform sampler2D age;
uniform int derivative;
uniform float maxAge;
uniform vec2 scale;
uniform float random;
uniform vec2 gravity;
uniform vec2 wind;
uniform vec2 worldsize;
uniform vec2 statesize;
uniform vec2 origin;
uniform vec2 steerTarget;
uniform int birthIndex;
uniform int birthingAtOnce;
uniform bool birthing;
varying vec2 index;

const float BASE = 255.0;
const float OFFSET = BASE * BASE / 2.0;
const float MAXSPEED = 3.0;

float decode(vec2 channels, float scale) {
    return (dot(channels, vec2(BASE, BASE * BASE)) - OFFSET) / scale;
}

vec2 encode(float value, float scale) {
    value = value * scale + OFFSET;
    float x = mod(value, BASE);
    float y = floor(value / BASE);
    return vec2(x, y) / BASE;
}

float decodeAge(vec2 pair) {
    return (pair.x + pair.y * BASE) * BASE;
}

vec2 encodeAge (float value) {
    float x = mod(value, BASE);
    float y = floor(value / BASE);
    return vec2(x, y) / BASE;
}

void updatePosition(inout vec2 p, inout vec2 v) {
    p += v + wind;
    // if (p.y <= 0.0 || p.x < 0.0 || p.x > worldsize.x || p.y > worldsize.y) {
    //     /* Left the world, reset particle. */
    //     p.x = origin.x;
    //     p.y = origin.y;
    // }
}

vec2 steer(vec2 p, vec2 v) {
    vec2 desVel = steerTarget - p;
    desVel *= (MAXSPEED / length(desVel));
    vec2 force = desVel - v;
    force *= (MAXSPEED / length(force));
    return force;
}

void updateVelocity(inout vec2 p, inout vec2 v) {
    v += gravity;
    if (p.y + v.y < -1.0 || p.y + v.y > worldsize.y) {
        /* Left the world, reset particle. */
        v.y = -v.y;
    }
    if (p.x + v.x < -1.0 || p.x + v.x > worldsize.x) {
        /* Left the world, reset particle. */
        v.x = -v.x;
    }
}

void birthParticlePosition(inout vec2 p){
    p.x = origin.x;
    p.y = origin.y;
}

void main() {
    vec4 asample = texture2D(age, index);
    float alive = asample.r;
    float colorProp = asample.g;
    float partAge = decodeAge(asample.ba);

    // if(alive <= 0.0 && derivative < 2) {
    //      discard;
    // }

    vec4 psample = texture2D(position, index);
    vec4 vsample = texture2D(velocity, index);
    
    vec2 p = vec2(decode(psample.rg, scale.x), decode(psample.ba, scale.x));
    vec2 v = vec2(decode(vsample.rg, scale.y), decode(vsample.ba, scale.y));

    vec2 result;
    float s;
    if (derivative == 0) {
        int oneDIndex = int(index.x * statesize.x + index.y * statesize.y * statesize.x - 16.0); // for whatever reason this adds 16 to the expected result, no idea why, so subtract 16 to get 0 for the x = 0 and y = 0 and 1023 for x = 31 and y = 31
        if(birthing && oneDIndex >= birthIndex && oneDIndex < (birthIndex + birthingAtOnce)) {
            birthParticlePosition(p);
        }
        updatePosition(p, v);
        result = p;
        s = scale.x;
        gl_FragColor = vec4(encode(result.x, s), encode(result.y, s));
    } else if(derivative == 1) {
        if(alive > 0.0) {
            vec2 steerForce = steer(p, v);
            v += steerForce;
            updateVelocity(p, v);
        }
        result = v;
        s = scale.y;
        gl_FragColor = vec4(encode(result.x, s), encode(result.y, s));
    } else {
        int oneDIndex = int(index.x * statesize.x + index.y * statesize.y * statesize.x - 16.0); // for whatever reason this adds 16 to the expected result, no idea why, so subtract 16 to get 0 for the x = 0 and y = 0 and 1023 for x = 31 and y = 31

        if(birthing && oneDIndex >= birthIndex && oneDIndex < (birthIndex + birthingAtOnce)) {
            alive = 1.0;
        }
        if(partAge <= maxAge && alive > 0.0) {
            result = vec2(1.0, partAge + 1.0);
        } else {
            result = vec2(0.0, 0.0);
        }

        gl_FragColor = vec4(result.x, colorProp, encodeAge(result.y));
    }
}
