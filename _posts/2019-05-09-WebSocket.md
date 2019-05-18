---
layout: post
title: 'Websocket의 이해'
author: kundol
comments: true
date: 2019-05-09 06:00
tags: [web, websocket]

---  
Websocket으로 통신한다는 것은 HTTP를 기반으로 설정된 **ws프로토콜**을 통해 양방향통신을 하는 것을 말합니다.
또한, WebSocket 객체를 통해 양방향통신을 하는데 이 객체는 서버와의 WebSocket 연결을 생성하고 관리할 수 있는 API 들을 제공합니다. 이는 데이터를 전송하거나 주고 받는 등의 API 들을 포함합니다.
오래된 브라우저의 경우 미지원되므로 이 때는 API로 직접 호출로 polling 방식으로 변경하게끔 해야 합니다. 

예전 양방향 통신 방식(HTTP)
 - polling : 주기적인 요청 
 - long polling : RESPONSE 받게 되면 REQUEST를 다시 요청(무한 재귀함수)

## 라이브러리
Socket.io는 JavaScript를 이용하여 브라우저 종류에 상관없이 실시간 웹을 구현할 수 있도록 한 기술이자 라이브러리입니다. 하지만 IE8이하는 지원하지 않습니다.  

## 과정 
HTTP를 통해 Handshake 과정이 성공적으로 끝나면, HTTP프로토콜이 웹소켓 프로토콜, ws또는 wss로 바꾸는 protocol switching과정 및 Sec-WebSocket-Key이 설정되는 작업 후 웹소켓을 통한 데이타 전송들이 진행됩니다. 
 - ws : 일반적인 웹소켓
 - wss : 데이터 보안을 위해서 SSL을 적용한 프로토콜

## 단점
1. 많은 트래픽의 경우 서버부하
2. 오래된 버전의 웹 브라우저(IE9이하)에서는 지원하지 않음

### 메시지큐
이러한 WebSocket을 사용하면 실시간애플리케이션을 만들 수 있는데 고려할 사항은 뭐가 있을까요? 
바로 시스템 장애입니다. 이를 메시지큐를 이용하면 해결할 수 있습니다.  
![메시지큐](/img/20190509_MQ.png)  
서버가 갑자기 죽거나 서버 점검 등으로 다운타임이 발생하는 동안에는 요청을 보낼 수가 없기 때문에 메세지큐, MQ를 이용해야 합니다. 
이외에도 너무 많은 처리를 위해 MQ는 필요합니다. 그저 Client와 동기방식으로 많은 데이터 통신을 하게 되면 병목현상이 생기게되고 서버의 성능이 저하되므로 하나의 메시지큐를 위임하여 순차적으로 처리하게끔 해야 합니다.

 > 다운타임 : 시스템을 이용할 수 없는 시간

### 메시지큐 라이브러리 rabbitMQ 
AMQP(Advanced Message Queueing Protocol)를 활용해 좀 더 쉽게 메세지-큐를 이용해 메세지를 전송/저장/관리하거나 받을 수 있는 기능을 제공하는 메세지 브로커(message broker or queue manager)라는 이름으로 불리는 오픈소스 소프트웨어

 > 태그 : WebSocket의 이해, WebSocket