// Author:
// Title: 
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 hash2( vec2 x )           //亂數範圍 [0,1]
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}
float gnoise( in vec2 p )       //亂數範圍 [0,1]
{
    vec2 i = floor( p );
    vec2 f = fract( p );   
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( dot( hash2( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( hash2( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash2( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( hash2( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

//hatching 材質
float texh(in vec2 p)
{
    float rz= 1.0;
    for (int i=0;i<8;i++){ //迴圈數會加重線條的密度
    	float g = gnoise(vec2(1., 80.)*p); //亂數範圍 [0,1], 在y軸方向放大80倍
    	g=smoothstep(0.172, 0.256,g); //加重線條(x,y,g_noise)
        rz = min(1.-g,rz); //黑白反轉,取暗色
		p.xy = p.yx; //xy軸互換
    	p += -0.25; //線條的偏移 ----> *若做成動態變化, 效果不錯, 像是畫面向某一方向移動
    	p*= 1.072; //線條密度放大倍數
    }
    return rz;
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    //uv.x *= u_resolution.x/u_resolution.y;
    //uv= uv*2.0-1.0;
    
    vec3 col=vec3(texh(uv*3.0));
    gl_FragColor = vec4(col, 1.0);
}

