
// onload封装
function addLoadEvent(func) {
  var oldOnload = window.onload;
  if (typeof oldOnload !== 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldOnload();
      func();
    }
  }
}

// 在元素后面插入一个元素节点。与insertBefore相对应
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}

// 为某个元素添加一个class
function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    element.className = `${element.className} ${value}`
  }
}

// 根据a 的href属性，结合当前页面的URL，高亮当前页面的a标签
function highlightPage() {
  let nav = document.getElementsByTagName('nav')[0];
  let linkArr = nav.getElementsByTagName('a');

  // linkArr 不是标准的数组，需要转一下
  Array.from(linkArr).forEach((item, index)=> {
    if (window.location.href.includes(item.href)) {
      // 设置高亮属性
      item.className = 'here';

      // 设置body id 为对应的页面
      let tempText = item.lastChild.nodeValue.toLowerCase();
      document.body.setAttribute('id', tempText);
    }
  })
}

// 动画
function moveElement(elementId, final_x, final_y, interval) {
  let elem = document.getElementById(elementId);

  // // 如果单独1s动画，移动会不丝滑，想要丝滑的动画效果，需要慢慢移动
  // setTimeout(()=> {
  // // 需要加px，不然可能会不生效
  //   elem.style.left = `${x}px`;
  //   elem.style.top = `${y}px`;
  // }, 1000)

  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = '0px'
  }
  if (!elem.style.top) {
    elem.style.top = '0px'
  }

  let xpos = parseInt(elem.style.left);
  let ypos = parseInt(elem.style.top);
  final_x = parseInt(final_x);
  final_y = parseInt(final_y);

  if (xpos === final_x && ypos === final_y) {
    return true;
  }

  if (xpos < final_x) {
    xpos += Math.ceil((final_x - xpos)/10);
  }
  if (xpos > final_x) {
    xpos -= Math.ceil((xpos - final_x)/10);
  }
  if (ypos < final_y) {
    ypos += Math.ceil((final_y - xpos)/10);
  }
  if (ypos > final_y) {
    ypos -= Math.ceil((ypos - final_y)/10);
  }

  elem.style.left = `${xpos}px`;
  elem.style.top = `${ypos}px`;

  let repeat = `moveElement('${elementId}', '${final_x}', '${final_y}', '${interval}')`;
  elem.movement = setTimeout(repeat, interval);
}


// 准备首页的滑块显示
function prepareSlideShow() {
  // insert slide img
  let intro = document.getElementById('intro');
  if (!intro) return false;

  let slideShow = document.createElement('div');
  let img = document.createElement('img');
  slideShow.id = 'slideshow';
  img.src = "images/slideshow.gif";
  img.id = "preview";
  img.alt = "a glimpse of what awaits you";

  // 创建一个frame显示在图片上面
  let frame = document.createElement('img');
  frame.src = "images/frame.gif";
  frame.alt = "";
  frame.id= "frame";
  slideShow.appendChild(frame);

  slideShow.appendChild(img);
  insertAfter(slideShow, intro);

  // 鼠标移动到a标签后，移动图片内容
  let links = document.getElementsByTagName('a');
  Array.from(links).forEach((item, index) => {
    item.onmouseover = function () {
      let destination = item.href.split('/');
      destination = destination[destination.length - 1];
      let dataMap = {
        "index.html": [0, 0, 5],
        "about.html": [-150, 0, 5],
        "photos.html": [-300, 0, 5],
        "live.html": [-450, 0, 5],
        "contact.html": [-600, 0, 5],
      };
      moveElement("preview", ...dataMap[destination])
    }
  })
}

// about页面点击事件执行函数
function showSection(sectionId) {
  let sections = document.getElementsByTagName('section');

  Array.from(sections).forEach((item, index) => {
    item.style.display = (item.id === sectionId) ? 'block' : 'none';
  })
}

// 显示about页面的导航
function prepareAoutPageNav() {
  let aboutPageBody = document.getElementById('about');
  if (!aboutPageBody) return false;

  let article = aboutPageBody.getElementsByTagName('article');
  let nav = article[0].getElementsByTagName('nav');
  let aList = nav[0].getElementsByTagName('a');
  Array.from(aList).forEach((item, index)=> {
    let sectionId = item.href.split('#')[1];

    if (index !== 0) { // 非第一个Section全部隐藏
      document.getElementById(sectionId).style.display = 'none';
    }

    item.onclick = function() {
      showSection(sectionId);
      return false;
    }
  })
}


// photos 页面
function prepareGallery() {
  // 先创建预览的占位图片及文字
  let gallery = document.getElementById('imagegallery');
  if (!gallery) return false;

  let placeholder = document.createElement('img');
  placeholder.id = 'placeholder';
  placeholder.src = "images/placeholder.gif";
  placeholder.alt = "my image gallery";

  let desc = document.createElement('p');
  let textNode = document.createTextNode('Choose a image');
  desc.appendChild(textNode);
  insertAfter(desc, gallery);
  insertAfter(placeholder, desc);


  // 开始绑定点击事件
  let aList = gallery.getElementsByTagName('a');
  Array.from(aList).forEach((item, index) => {
    item.onclick = function() {
      placeholder.src = item.href;
      placeholder.alt = item.title;
      textNode.nodeValue = item.title;
      return false;
    }
  })
}


// 增强表格 live
function handleTable() {
  let tables = document.getElementsByTagName('table');
  if (tables.length === 0) return false;

  // stripe tables
  let rows = tables[0].getElementsByTagName('tr');
  let old = false;
  for (let i = 0; i < rows.length; i++) {
    if (old === true) {
      old = false;
      addClass(rows[i], 'odd')
    } else {
      old = true;
    }
  }

  // highlight
  for (let j = 0; j < rows.length; j++) {
    let oldClass = rows[j].className;

    rows[j].onmouseover = function() {
      addClass(this, "highlight")
    };
    rows[j].onmouseout = function() {
      this.className = oldClass
    };
  }
}


// 增强表单


addLoadEvent(highlightPage);
addLoadEvent(prepareSlideShow);
addLoadEvent(prepareAoutPageNav);
addLoadEvent(prepareGallery);
addLoadEvent(handleTable);
