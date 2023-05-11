import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Spline, Rect, Img, Txt, Node, Grid, Video} from '@motion-canvas/2d/lib/components';
import {tween, map, linear, easeOutCubic,easeInCubic, easeInOutCubic} from '@motion-canvas/core/lib/tweening';
import {Gradient} from "@motion-canvas/2d/lib/partials";
import { Color } from "@motion-canvas/core/lib/types";
import {CodeBlock, edit, insert, lines, remove, word} from '@motion-canvas/2d/lib/components/CodeBlock';
import {clone} from '@motion-canvas/2d/lib/components/Img'
import {DEFAULT} from '@motion-canvas/core/lib/signals';
import {createRef, makeRef, useDuration} from '@motion-canvas/core/lib/utils';
import {all, loop, chain, delay, sequence, waitFor} from '@motion-canvas/core/lib/flow';
import {ThreadGenerator} from '@motion-canvas/core/lib/threading';

import ballPNG from '/src/pics/ball.png';
import pyFilePNG from '/src/pics/py_file.png';
import pyFileInFocusPNG from '/src/pics/fileinfocus.png';
import folderPNG from '/src/pics/whitefolder.png';
import recyclebinPNG from '/src/pics/recyclebin.png';
import fullrecyclebinPNG from '/src/pics/full_recyclebin.png';
import clearbin1PNG from '/src/pics/clearbin1.png';
import clearbin2PNG from '/src/pics/clearbin2.png';
import clearbin3PNG from '/src/pics/clearbin3.png';
import cursorPNG from '/src/pics/cursor.png';
import runbutton1PNG from '/src/pics/runbutton1.png';
import runbutton2PNG from '/src/pics/runbutton2.png';
import runbutton3PNG from '/src/pics/runbutton3.png';
import runbutton4PNG from '/src/pics/runbutton4.png';
import errorPNG from '/src/pics/error.png';
import successPNG from '/src/pics/success.png';
import binmessagePNG from '/src/pics/binisclean.png';

export default makeScene2D(function* (view) {
  const line = createRef<Spline>();
  const circle = createRef<Circle>();
  const ball = createRef<Img>();
  const pyFile = createRef<Img>();
  const loadCircle: Circle[] = [];
  const loadCircles: Node[] = [];
  const groupOfFiles : Node[] = [];
  const groupOfFinalFiles : Node[] = [];
  const pyFiles : Img[] = [[],[]];
  const files = [
  [570, -350, "Writer.py"],
  [800, -200, "Application.py"],
  [440, -90, "test.py"],
  [-800, -350, "Reader.py"],
  [-630, -50, "MergeModule.py"],
  [-440, -300, "Service.py"],
  [220, -400, "Controller.py"],
  ];
  const finalFiles = [
    [-700, "Final.py"],
    [-270, "FinalFinal.py"],
    [200, "exactlyFinal.py"],
    [700, "EXACTLY_FINALFINAL.py"],
    ];
  const fileNumbers = [2, 5, 4];
  const rects = [
  [440, -90, 180],
  [-440, -300, 230],
  [-630, -50, 360],
  ];
  var circles = [
  [-256, -95], 
  [-256, -65], 
  [-231, -80], 
    ];
  const rectsRef: Rect[] = [];
  const folder = createRef<Node>();
  const recyclebin = createRef<Img>();
  const clearbin = createRef<Img>();
  const binmessage = createRef<Img>();
  const cursor = createRef<Img>();
  const runbutton = createRef<Img>();
  const message = createRef<Img>();
  const nameFilePy = createRef<Txt>();
  const text = createRef<Txt>();
  const codeRef = createRef<CodeBlock>();
  var textCode =`
import hashlib
def hash_file(filename):
  h = hashlib.sha1()
  with open(filename,'rb') as file:
    chunk = 0
    while chunk != b'':
      chunk = file.read(1024)
      h.update(chunk)
  return h.hexdigest()
message = hash_file("track1.mp3")
print(message)
`
  textCode = textCode.split('')
  var wholeCode = ``
  var speed = 0.1
  var newFile;

  const textStyle = {
    fontSize: 60,
    fontFamily: 'system-ui',
    fontWeight: 600,
    fill: 'white',
    y: 400,
  }

  const cursorWay = [
    [440, -90],
    [-500, -200],
    [-630, -80],
    ];

  const cursorWay2 = [
    [200, -90],
    [-270, -90],
    [-630, -90],
    ];
  function* clear(): ThreadGenerator {
  yield* delay(0.5,clearbin().opacity(1, 0.2));
  yield* all (
    cursor().position([200,250],2),
    delay(1,clearbin().src(clearbin2PNG, 0)),
    );
  yield clearbin().src(clearbin3PNG);
  yield* delay(0.1,clearbin().src(clearbin2PNG,0));
  yield* delay(0.5, clearbin().opacity(0, 0.3));
  yield* all(
    recyclebin().src(recyclebinPNG),
    recyclebin().scale(0.4,0),
    );
  yield* waitFor(1);
  }
  
  function* runCode(x, y): ThreadGenerator {
    yield* runbutton().src(runbutton1PNG);
    yield* runbutton().position([x-10,y-20]);
    yield* delay(0.5,runbutton().opacity(1, 0.2));
    yield* all (
    cursor().position([x,y],2),
    delay(1,runbutton().src(runbutton2PNG, 0)),
    );
    yield runbutton().src(runbutton3PNG);
    yield* delay(0.1,runbutton().src(runbutton4PNG,0));
    
    
    yield* all(...loadCircle.map(circle=> circle.opacity(1, 1)));
    
    var i = 1;
    yield* loop(3, j => all(
      ...loadCircle.map(circle=> all(
        circle.position(circles[(j+i)%3], 1, linear),
        i+=1,
        ))));
    yield* all(
      runbutton().opacity(0, 1),
      ...loadCircle.map(circle=> circle.opacity(0,1)),
      message().opacity(1,1)
      );
    yield* chain(
      waitFor(2),
      cursor().position([437,-22], 1),
      message().opacity(0,1),
      );

    yield* waitFor(1);
  }
  view.add(
    <>
      <Rect fill={'#0d0d0d'} padding={50} width={1920} height={1080}/>, //фон
      <Spline //линия
        ref = {line}
        lineWidth = {10}
        stroke = {'white'}
        smoothness={0.0}
        points = {[[-960-80,300], [-500, 300], [-400,375], [-300, 300], [300, 300], [400, 375], [500, 300], [960, 300]]}
        end = {0}
      />,
      <Img //шарик
        ref = {ball} 
        src = {ballPNG} 
        scale = {0.5}
        position = {[-960-80,219]}
      />,
      // выделение файлов
      {rects.map(([x, y, width], i) =>(
        <Rect
        ref = {makeRef(rectsRef, i)}
        fill = {"D9D9D9"}
        width = {width}
        height = {220}
        x = {x}
        y = {y+20}
        opacity = {0}
        />,
      ))},
      // файлы
      {files.map(([x, y, name], i)=>(
      <Node ref={makeRef(groupOfFiles, i)} x={x} y={y} opacity={0}> //файлы
        <Img
          src = {pyFilePNG}
          scale = {0.4}
        />,
        <Txt
          text = {name}
          fill = {'white'}
          fontFamily = {'system-ui'}
          fontSize = {60}
          y = {100}
          scale = {0.7}
        />
      </Node> 
      ))},
      <Node>
        <Img // File.py
          ref = {pyFile}
          src = {pyFilePNG}
          scale = {0}
          y = {-150}
          opacity = {0}
        />,
        <Txt //name of File.py
          ref = {nameFilePy}
          text = {'File.py'}
          fill = {'white'}
          fontFamily = {'system-ui'}
          fontSize = {60}
          x = {-13}
          y = {-140}
          scale = {0}
          opacity = {0}
        />,
      </Node>,
      
      <Node ref = {folder} opacity = {0} position = {[-130,-400]} scale = {0.7}> //папка
        <Img
          src = {folderPNG}
        />,
        <Txt
          text = {'Production'}
          fill = {'white'}
          fontSize = {60}
          fontFamily = {'system-ui'}
          x = {-10}
          y = {170}
        />
      </Node>,

      {finalFiles.map(([x, name], i)=>(
      <Node ref={makeRef(groupOfFinalFiles, i)} x={x} y={-100} opacity={0}> //файлы
        <Img
          src = {pyFilePNG}
          scale = {0.4}
        />,
        <Txt
          text = {name}
          fill = {'white'}
          fontFamily = {'system-ui'}
          fontSize = {60}
          y = {110}
          scale = {0.7}
        />
      </Node> 
      ))},
      <Img //корзина
        ref = {recyclebin}
        src = {recyclebinPNG}
        scale = {0.4}
        x = {0}
        y = {208}
        opacity = {0}
      />,
      <Img //очистка корзины
        ref = {clearbin}
        src = {clearbin1PNG}
        x = {200}
        y = {230}
        opacity = {0}
      />,
      <Img //сообщение "корзина пуста"
        ref = {binmessage}
        src = {binmessagePNG}
        position = {[0, -100]}
        scale = {1.8}
        opacity = {0}
      />,
      <Img //кнопка запуска кода
        ref = {runbutton}
        src = {runbutton1PNG}
        x = {-70}
        y = {-80}
        opacity = {0}
      />,
      {circles.map(([x, y], i) =>(
          <Circle
            ref = {makeRef(loadCircle, i)}
            width = {10}
            height = {10}
            fill = {'#139620'}
            x = {x}
            y = {y}
            opacity = {0}
          />,
        ))},
      <Img //сообщение
        ref = {message}
        src = {successPNG}
        position = {[0,0]}
        opacity = {0}
      />,
      <Img //курсор
        ref = {cursor}
        src = {cursorPNG}
        x = {230}
        y = {220}
        scale = {0.05}
        opacity = {0}
      />,
      

      <Node> //надписи этапов
        <Txt ref = {text}
          text = {'Создание'}
          x = {-700}
          {...textStyle}
        />
        <Txt
          text = {'Использование'}
          x = {0}
          {...textStyle}
        />
        <Txt
          text = {'Версии'}
          x = {700}
          {...textStyle}
        />
      </Node>,
      <CodeBlock
        language = "python"
        ref = {codeRef}
        y = {-150}
        fontSize = {30}
      />
    </>,);

//1 этап шарика
  yield* all (
    ball().absoluteRotation(474, 6),
    ball().position.x(-560,6),
    line().end(0.25,6),
    );

  //codeBlock
  
  yield* loop(textCode.length, i => (
      all(
      speed *= 0.99,
      codeRef().edit(speed, false)`${wholeCode}${insert(String(textCode[i]))}`,
      wholeCode = wholeCode.concat(String(textCode[i])),
    ),
  ));

  //Сжатие кода в файл
  yield* all (
    codeRef().scale(0.2,5),
    codeRef().opacity(0, 5),
    pyFile().scale(0.7,5),
    pyFile().opacity(1,5),
    nameFilePy().position.y(10, 5),
    nameFilePy().scale(1,5),
    nameFilePy().opacity(1,5),
    );

  //Переименование файла
  yield* chain(
    nameFilePy().text('', 1),
    nameFilePy().text('FindHashModule.py', 2),
    );
  yield* all (
    pyFile().scale(0.4,5),
    nameFilePy().position.y(-50,5),
    nameFilePy().scale(0.7,5),
  );

  // Появление множества файлов
  var del = 1;
  yield* chain(
      ...groupOfFiles.map(
      file=>file.opacity(1,del*=0.88),),
    );
  yield* folder().opacity(1, del*=0.88);
//2 этап шарика
  yield* all (
    ball().absoluteRotation(180, 1, easeInCubic),
    ball().position.x(-478,1, easeInCubic),
    line().end(0.32,1, easeInCubic),
    );

  yield* all (
    ball().absoluteRotation(296, 0.6, linear), 
    ball().position.x(-400,0.25, linear).to(-325,0.35),
    ball().position.y(270,0.25, linear).to(219,0.35),
    line().end(0.45,0.6,linear),
    );

  yield* all (
    ball().absoluteRotation(477, 6,easeOutCubic),
    ball().position.x(220,6,easeOutCubic),
    line().end(0.65,6, easeOutCubic),
    );

  //выделение файлов
  var i = 0
  yield* cursor().opacity(1,1);
  yield* sequence(
      0.7,
      ...rectsRef.map(rect=> all(
        rect.opacity(0.23, 0.1),
        cursor().position(cursorWay[i], 0.1),
        i+=1))
      );
  //удаление файлов
  yield* recyclebin().opacity(1,1),
  i = 0
  yield* sequence(
    0.7,
    ...rectsRef.map(rect=> all(
      rect.scale(0.4, 1).to(0,0.5),
      groupOfFiles[fileNumbers[i]].scale(0.4, 1).to(0,0.5),
      rect.position([0,100],1).to([0,200],0.5),
      groupOfFiles[fileNumbers[i]].position([0,100],1).to([0,200],0.5),
      i+=1,
      )),
      
    );
  yield* all(
    recyclebin().src(fullrecyclebinPNG),
    recyclebin().scale(0.78),
    );

  //очистка корзины
  yield* cursor().position([0,208],2);
  yield* clear();

//3 этап шарика
  yield* all (
    ball().absoluteRotation(180, 1, easeInCubic),
    ball().position.x(325,1, easeInCubic),
    line().end(0.67,1, easeInCubic),
    );

  yield* all (
    ball().absoluteRotation(296, 0.6, linear),
    ball().position.x(400,0.25, linear).to(475,0.35),
    ball().position.y(270,0.25, linear).to(219,0.35),
    line().end(0.82,0.6,linear),
    );

  yield* all (
    ball().absoluteRotation(200, 4,easeOutCubic),
    ball().position.x(810,4,easeOutCubic),
    line().end(1,4, easeOutCubic),
    );

  //папка Production 
  yield* all(
    folder().position([0,-100],2),
    ...groupOfFiles.map(file=>file.opacity(0,2),),
    pyFile().opacity(0,2),
    nameFilePy().opacity(0,2),
    );
  yield* all(
    folder().scale(2,6),
    delay(3, all(...groupOfFinalFiles.map(file=> all(
      file.opacity(1,3),
      folder().opacity(0,3),)))),
    );

  //запуск файла FinalFinal
  yield* cursor().position([-270,-90],1);
  yield* runCode(-60,-60);

  //выделение файлов
  yield* all(...rectsRef.map(rect=> rect.opacity(0)));
  const widths = [195,260,300];
  i = 2
  yield* sequence(
      0.7,
      ...rectsRef.map(rect=> all(
        cursor().position.y(-90, 0.4),
        cursor().position.x(finalFiles[i][0], 0.4),
        rect.position.y(-75),
        rect.position.x(finalFiles[i][0]),
        rect.scale(1),
        rect.width(widths[i]),
        delay(0.3, rect.opacity(0.23, 0.1)),
        delay(0.5, all(
        rect.position([0,100],1).to([0,200],1),
        rect.scale(0.4,1).to(0,1),
        groupOfFinalFiles[i].position([0,100],1).to([0,200],1),
        groupOfFinalFiles[i].scale(0.4,1).to(0,1),)),
        i-=1,
        delay(2, all (recyclebin().src(fullrecyclebinPNG, 0), recyclebin().scale(0.78, 0),)),)),
      groupOfFinalFiles[3].position([0, -90],3),
      cursor().position([0,208],2),
      );

  //очистка корзины
  clearbin().src(clearbin1PNG);
  yield* clear();
  
  //запуск файла EXACTLY_FINALFINAL
  yield* cursor().position([0,-90],1);
  yield* loop(3, k => all(
      circles[k][0] += 270,
      loadCircle[k].position.x(circles[k][0])
      ));
  yield* message().src(errorPNG);
  yield* runCode(210,-60);
  
  //проверка корзины
  yield* cursor().position([15, 230], 2);
  yield* all(
    recyclebin().position.y(-100, 5),
    recyclebin().scale(1.8, 5),
    groupOfFinalFiles[3].opacity(0, 3),
    delay(2, all(
      recyclebin().opacity(0, 3),
      binmessage().opacity(1, 3),
      cursor().opacity(0, 3),
      ))
    );
  yield* all (
    recyclebin().opacity(1, 3),
    recyclebin().scale(0.4, 3),
    recyclebin().position.y(208, 3),
    binmessage().opacity(0, 2),
    );

  //конец
  yield* all(
    ball().position.x(1100, 3),
    ball().absoluteRotation(220, 3),
    );
});