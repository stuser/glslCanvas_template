// Author: CMH
// Title: Learning Shaders


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//依照網頁canvas的data-textures參數宣告之檔案順序:
uniform sampler2D u_tex0; //對應到data/MonaLisa.jpg
uniform sampler2D u_tex1; //對應到data/hatch_0.jpg
uniform sampler2D u_tex2; //對應到data/hatch_1.jpg
uniform sampler2D u_tex3; //對應到data/hatch_2.jpg
uniform sampler2D u_tex4; //對應到data/hatch_3.jpg
uniform sampler2D u_tex5; //對應到data/hatch_4.jpg
uniform sampler2D u_tex6; //對應到data/hatch_5.jpg

//hatching 材質
float texh(in vec2 p)
{
    float rz= 1.0;
    for (int i=0;i<8;i++){ //迴圈數會加重線條的密度
    	float g = gnoise(vec2(1., 80.)*p); //亂數範圍 [0,1], 在y軸方向放大80倍 (*這邊加noise會有毛邊的效果)
    	g=smoothstep(0.172, 0.256,g); //加重線條(x,y,g_noise)
        rz = min(1.-g,rz); //黑白反轉,取暗色
		p.xy = p.yx; //xy軸互換
    	p += -0.25; //線條的偏移 ----> *若做成動態變化, 效果不錯, 像是畫面向某一方向移動
    	p*= 1.072; //線條密度放大倍數
		
		//這邊要加一個依明亮度判斷的終止迴圈條件
		//if(p > ???) break;
    }
    return rz;
}


void main()
{
    vec2 uv= gl_FragCoord.xy/u_resolution.xy;
    vec2 vUv=fract(6.0*uv);                   //key
    float shading= texture2D(u_tex0, uv).g;   //取MonaLisa"綠色(g)"版作為明亮值

    vec4 c;
	            //以下要將明亮值分成六個等級，依不同等級去貼材質
				
                float step = 1. / 6.;
                if( shading <= step ){   
                    c = mix( texture2D( u_tex6, vUv ), texture2D( u_tex5, vUv ), 6. * shading );  //明亮值:最暗的使用data/hatch_5.jpg的材質, 次一級的用data/hatch_4.jpg
                }
                if( shading > step && shading <= 2. * step ){
                    c = mix( texture2D( u_tex5, vUv ), texture2D( u_tex4, vUv) , 6. * ( shading - step ) );
                }
                if( shading > 2. * step && shading <= 3. * step ){
                    c = mix( texture2D( u_tex4, vUv ), texture2D( u_tex3, vUv ), 6. * ( shading - 2. * step ) );
                }
                if( shading > 3. * step && shading <= 4. * step ){
                    c = mix( texture2D( u_tex3, vUv ), texture2D( u_tex2, vUv ), 6. * ( shading - 3. * step ) );
                }
                if( shading > 4. * step && shading <= 5. * step ){
                    c = mix( texture2D( u_tex2, vUv ), texture2D( u_tex1, vUv ), 6. * ( shading - 4. * step ) );
                }
                if( shading > 5. * step ){
                    c = mix( texture2D( u_tex1, vUv ), vec4( 1. ), 6. * ( shading - 5. * step ) );
                }
                
     vec4 inkColor = vec4(0.0, 0.0, 1.0, 1.0);
     vec4 src = mix( mix( inkColor, vec4( 1. ), c.r ), c, .5 );
     gl_FragColor = src;

}



void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    //uv.x *= u_resolution.x/u_resolution.y;
    //uv= uv*2.0-1.0;
    
    vec3 col=vec3(texh(uv*3.0));
    gl_FragColor = vec4(col, 1.0);
}




