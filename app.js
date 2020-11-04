(function () {
  const handleClick = (id, btn, blockId, blockClass) => {
    const { elementId, elementClass } = selector(id, btn);
    for (let i = 0; i < elementClass.length; i++) {
      elementClass[i].addEventListener("click", () => {
        current(elementId)[0].className = current(elementId)[0].className.replace(' active', "");
        elementClass[i].className += ' active';
        blockId && show(blockId, blockClass, i);
      });
    }
  };

  const handleClick2 = (idBtn, idModal) => {
    const elementId = selector(idBtn);
    elementId.addEventListener("click", () => openModal(idModal));
  };

  let compareCurr = 0;
  let favoritesCurr = 0;

  const handleClick3 = (idBtn, digil) => {
    const btn = selector(idBtn);
    btn.addEventListener('click', () => {
      btn.classList.toggle("active");
      if (btn.classList.contains('active')) {
        addCurrent(digil)
      } else {
        removCurrent(digil)
      }
      addDigil(digil);
    });
  };

  const addCurrent = (digil) => {
    if (digil === 'compare') {
      compareCurr ++
    } else {
      favoritesCurr ++
    }
  };
  const removCurrent = (digil) => {
    if (digil === 'compare') {
      compareCurr --
    } else {
      favoritesCurr --
    }
  };
  const addDigil = (digil) => {
    const dig = selector(`digil-${digil}`);
    const elementId = selector(digil);
    if ((digil === 'compare' && compareCurr) || (digil === 'favorites' && favoritesCurr)) {
      dig.classList.add('active');
      if (digil === 'compare') {
        elementId.innerHTML = compareCurr.toString()
      } else {
        elementId.innerHTML = favoritesCurr.toString()
      }
    } else {
      elementId.classList.remove('active');
    }
  }

  const openModal = (idModal) => {
    const elementId = selector(idModal);
    elementId.style.display = 'block';
    const div = document.createElement('div');
    div.className = 'modal-background';
    document.body.append(div);
    document.body.style.overflowY = 'hidden';
    closedModal(idModal, div);
    cursorPosition();
  };

  const closedModal = (idModal, div) => {
    const { elementId, elementClass } = selector(idModal, 'close');
    elementClass[0].addEventListener('click', () => {
      elementId.style.display = 'none';
      document.body.style.overflowY = 'scroll';
      div.remove();
    });
  };

  const handleClick4 = (id, idBlock) => {
    const btn = selector(id);
    const block = selector(idBlock);
    btn.addEventListener('click', () => {
      block.classList.toggle('active')
    });
  };

  const current = (elementId) => {
    return elementId.getElementsByClassName('active');
  };

  const show = (id, btn, i) => {
    const { elementId, elementClass } = selector(id, btn);
    current(elementId)[0].className = current(elementId)[0].className.replace(' active', "")
    elementClass[i].className += ' active';
  };

  const selector = (id, btn) => {
    const elementId = document.getElementById(id);
    if (btn) {
      const elementClass = elementId.getElementsByClassName(btn);
      return { elementId, elementClass }
    }
    return elementId
  };

  const setCursorPosition = (pos, elem) => {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
  const proverka = (el) => {
    let matrix = "+38 (000) 000-00-00",
      i = 0,
      val = el.value.replace(/\D/g, '');
    !val && (val = "380")
    matrix = matrix.replace(/\d/g, (a) => {
      return val.charAt(i++) || "_"
    })
    el.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && i > 3 ? i++ : (i = 6)
    setCursorPosition(i, el)
  }

  const cursorPosition = () => {
    const elementId = selector('inputMask');
    elementId.oninput = () => { proverka(elementId) };
    elementId.onfocus = () => { setCursorPosition(6, elementId) };
    elementId.oninput(undefined);
  };

  handleClick('navbar', 'navbar__btn');
  handleClick('menu', 'menu__btn');
  handleClick('select', 'select__btn');
  handleClick('table__link', 'table__btn', 'table', 'table-select');
  handleClick2('collBackMe', 'modal');
  handleClick2('login', 'modalLogin');
  handleClick3('compare1', 'compare');
  handleClick3('compare2', 'compare');
  handleClick3('compare3', 'compare');
  handleClick3('compare4', 'compare');
  handleClick3('favorites1', 'favorites');
  handleClick3('favorites2', 'favorites');
  handleClick3('favorites3', 'favorites');
  handleClick3('favorites4', 'favorites');
  handleClick4('burger', 'navbar');
}());