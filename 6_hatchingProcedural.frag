// Author:CMH
// Title: 20231007_Textile_v3.qtz 
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0; //MonaLisa

vec2 hash2( vec2 x )           //亂數範圍 [0,1]
{
    const vec2 k = vec2( 0.319, 0.367 );
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

//畫圓(線條)
float circle(vec2 uv, float radius){
    float dist = length(uv);
    float circle_dist = abs(dist-radius)*0.5; //圓環大小
    return circle_dist;
}

//hatching
float texh(in vec2 p, in float str)
{
    float rz= 1.0;
    int j=20;
    for (int i=0;i<20;i++){
        float pas=float(i)/float(j);
        float g = gnoise(vec2(1., 80.)*p); //亂數範圍 [0,1]
        g=smoothstep(0.05, 0.3, g);
        
		p.xy = p.yx; //將水平線,同步轉成垂直線
		
		p += 0.07;
        p*= 1.2;
        rz = min(1.-g,rz);
        if ( 1.0-pas < str) break;     
    }
    return rz;
}

// 改进的hatching函数
float texh2(in vec2 p, in float str)
{
    float rz = 1.0;
    int j = 20;
    for (int i = 0; i < 20; i++) {
        float pas = float(i) / float(j);
        float g = gnoise(vec2(1., 80.) * p); // 亂數範圍 [0,1]
        g = smoothstep(0.05, 0.3, g);

        // 使用噪声对线条进行非线性变换
        //p += 0.07 * vec2(cos(g * 6.28), sin(g * 6.28));
		
		//參數註記 p += -1.0
		//若值為+:順時針, -:逆時針 
		//值大於2.0則呈現較線條, 值小於1.0則呈現接近底圖
		p += 1.2 * vec2(circle(p,1.0), circle(p,-1.0));
		
        p *= 1.2;
        rz = min(1.0 - g, rz);

        if (1.0 - pas < str) break;
    }
    return rz;
}


void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    //uv.x *= u_resolution.x/u_resolution.y;
    //uv= uv*2.0-1.0;
    float breathing=(exp(sin(u_time/6.0*3.14159)) - 0.36)*0.42;

    float info=texture2D(u_tex0,uv).g;
	
    //vec3 col=vec3(texh(uv*5.0, info+0.3-breathing*0.3));
	
	//材質改成圓型,生成速度減慢
	vec3 col=vec3(texh2(uv*5.0, info+0.3-breathing*0.15));
	
    gl_FragColor = vec4(col, 1.0);
}



