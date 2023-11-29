// Author:CMH
// Title:TheGameofPixels 
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0; //data/MonaLisa.jpg
//uniform sampler2D u_tex1;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	
	//以下進行位置的大小變化設計, 用時間變數(u_time)
    float paraX = (sin(u_time*0.1)*0.5+0.5)*32.;
    float paraY = (cos(u_time*0.05)*0.5+0.5)*64.;
    
    //以下進行格化效果,指定變化的尺寸
 	vec2 brickSize=vec2(paraX+5.0, paraY+3.0) ; //n_mouse*60.0 定義單位格化的尺寸(paraX+5.0, 用意是加上最小還有5.0的單位尺寸)
	
	//***************設計
	//進階設計: 
	//1.引入迴圈機制,並設計門檻值去定義尺寸大小
	//2.引入滑鼠位置的互動設計
	//***************
	
	//***************測試
	//vec2 brickSize=vec2(20.0,16.0); //直接給值做測試用
	//***************
	
 	vec2 uv=st; //[0~1]
 	vec2 uvs=uv*brickSize;//[0~6] uv要放大的倍率
    vec2 ipos = floor(uvs);  // get the integer coords 取邊界的點
    vec2 fpos = fract(uvs);  // get the fractional coords 讓格化訊息形成循環
    vec2 nuv=ipos/brickSize;

    vec3 color = vec3(0.);
    color = texture2D(u_tex0, nuv).rgb; //(u_tex0:背景材質, nuv:格化的座標位置)
	
	//***************測試
	//color = texture2D(u_tex0, ipos).rgb; //測試不同起點
	//color = texture2D(u_tex0, fpos).rgb; //測試不同起點
	//***************
	
    gl_FragColor = vec4(vec3(color),1.0);
}
