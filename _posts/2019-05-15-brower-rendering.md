---
layout: post
title: '브라우저 렌더링의 이해'
author: kundol
comments: true
date: 2019-05-15 06:00
tags: [web, http, 브라우저렌더링]

---   
브라우저가 화면을 어떻게 뿌리는지 그리고 그것과 관해 어떠한 과정들이 일어나는지 어떻게 최적화를 해야 하는지 알아보도록 합시다.

사용자가 url을 입력하면 네비게이션이 일어나고 네트워크 스레드가 안전한 요청이라고 판단 및 이동하기로 결정을 하게 된 후 서버로 부터 요청을 받으면 렌더러프로세스가 **브라우저렌더링**과정을 통해 클라이언트에게 화면을 제공하게 됩니다. 
## 과정
![브라우저 렌더링 메인 과정](https://raw.githubusercontent.com/wnghdcjfe/happyKundol/master/prepare/img/1.png)   
1. HTML파싱 : HTML의 DOM토큰화
2. DOM트리 생성
3. CSSOM(CSS의 파싱된 CSS토큰)에 따라 **Render트리생성**(display:none제거 / font-size 등 상속 스타일 부모에만 위치하게설계)
 - 이 때 GPU에 업로드되는 요소는 Graphics Layers로, 아닌 것은 RenderLayer로 분리되어 composite 단계에서 합성된다. 
4. Layout설정(좌표 설정, 보통 부모를 기준으로 설정됨 / Global Layout이 변경될 때는 브라우저의 사이즈가 증가 하거나 폰트사이즈를 증가시키면 변경됨), 이 때 모든 상대적인 값이 절대적인 값으로 바뀐다.
5. paint
6. composite 


![브라우저 레이어](https://d2.naver.com/content/images/2015/08/helloworld-201508------------------------.png)
이런식으로 레이어가 분리된 후 색칠된 후 composite과정을 겹쳐서 화면에 보이게 된다.


![브라우저 구조](https://yilpe93.github.io/images/browser/browser_02.png)
브라우저는 이런 구조를 갖고 있고 렌더링엔진이 렌더링을 관리한다.


## vSync
![vSync](/img/20190515_vSync.png) 
앞서말한 과정을 vSync 안에서 즉, 16.6ms안에 끝내야 합니다. 
vSync란 그래픽드라이버를 통해 모니터를 업데이트하는데 Appdata >> swap(back buffer >> front buffer) >> monitor를 통해 화면을 업데이트하는데 이게  1 / 60초  16.6ms마다 발생하기 때문에 그 안에 모든 과정을 다 끝내야 한다는 것을 의미합니다.
 
 - Compositor Thread : scrolling, animation, zoomIn/ out : 단독으로 호출 가능
 - Raster Thread : draw line을 직접 수행한다. 
 - Paint : 레이어 별로 색을 칠한다. 
 - Composite : 레이어를 합쳐 bitmap으로 만듬

이 vsync안에 끝내야 하는 것 때문에 canvas를 그릴 때는 메인스레드가 아닌 WebWorker를 사용한 서브스레드를 이용해서 그리기도 합니다.
## 리플로우 / 리페인트 최소화
노드를 추가하거나 스타일을 변경하면 리플로우와 리페인트가 일어나게 된다. 이를 통해 부라우저 렌더링이 통째로 일어나게 되고 많은 cost를 가져오게 됩니다. 
이를 최소화하는 것이 중요합니다. 아래의 상황들은 모두 리플로우 또는 리페인트를 가져옵니다.
```js
var bstyle = document.body.style; // cache
 
bstyle.padding = "20px"; // reflow, repaint
bstyle.border = "10px solid red"; // another reflow and a repaint
 
bstyle.color = "blue"; // repaint only, no dimensions changed
bstyle.backgroundColor = "#fad"; // repaint
 
bstyle.fontSize = "2em"; // reflow, repaint
 
// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));
```
아래의 요소에 요청을 하기만 하는 스크립트를 작성해도 변경대기열큐에 쌓이게 됩니다. 그리고 변경하는 스크립트가 있다면 flush가 발생하면서 대기열큐에 있던 것이 사라지면서 리플로우/ 리페인트가 일어나게 됩니다. 
1. offsetTop, offsetLeft, offsetWidth, offsetHeight
2. scrollTop 
3. clientTop 
4. getComputedStyle

이를 최적화하기 위해서는
1. DOM노드에서 가장 끝단을 수정하는 것이 제일 좋으며 
2. 각 단계에서는 이 점을 고려하면 최적화가 됩니다. 
 - Layout : width, height, font(1000개 이하의 DOM이 효율적)
 - Paint : color, background (GPU Rsterization를 이용하면 더 빠름. `view-port content="width=device-width"`를 사용하면 됨.)
 - Composite : opacity, transform()(레이어는 30개 이하의 레이어가 효율적입니다.)  
3. 스타일을 한꺼번에 바꾸는 것이 좋습니다. 

### 참고사항

 > 렌더트리는 DOMTree와 1 : 1 관계가 아닙니다. 화면에 보여줄 부분만 렌더링을 하기 위해 트리로 만드는 것. 

이 때 Render트리가 생성이 되었을 때 GPU 업로드 한 요소는 Graphic Layer로 분리가 되고 레이어 각각 비트맵으로 출력이 됩니다.  
GPU업로드 요소는 `CSS3D / video & canvas / filter / animation / transform : transelateZ(0)`입니다.

 > DOM은 마크업과 1 : 1 관계를 맺습니다. 웹페이지를 자바스크립트로 제어하기 위한 객체 모델을 의미한다.

참고로 BOM은 웹브라우저의 창이나 프래임을 추상화해서 프로그래밍적으로 제어할 수 있도록 제공하는 수단이며 전역객체인 Window의 프로터티와 메소드들을 통해서 제어할 수 있는 것을 말합니다.

  > 태그 : 브라우저 렌더링