const $ = function (target) {
  return document.querySelector(target);
};

let todos = [];
const form = $('.input-form');
const input = form.querySelector('input');
const ul = $('.todo-lists');
const modal = $('dialog');
let listCount = 0;

function loadStorage() {
  if (
    JSON.parse(localStorage.getItem('todos')).length &&
    JSON.parse(localStorage.getItem('todos')).length !== 0
  ) {
    JSON.parse(localStorage.getItem('todos')).forEach((el) => {
      todos.push(el);
    });
  }
  const frag = document.createDocumentFragment();
  if (todos.length !== 0) {
    todos.forEach((el) => {
      let li = document.createElement('li');
      li.classList.add('todo-content');
      li.setAttribute('id', listCount);
      listCount++;
      let span = `
          <span>${el}</span>
          <div class="todo-btns">
              <button class="edit-Btn" type="button">
                  <img src="./images/editBtn.png" alt="할일수정버튼" />
              </button>
              <button class="delete-Btn" type="button">
                  <img src="./images/deleteBtn.png" alt="할일삭제버튼" />
              </button>
          </div>
      `;
      li.innerHTML = span;
      if (listCount >= 5) {
        ul.style.cssText = 'height: unset; min-height: 1000px';
      }
      frag.append(li);
      ul.append(frag);
    });
  }
}

window.addEventListener('load', loadStorage);

const addTodo = function (e) {
  e.preventDefault();
  const frag = document.createDocumentFragment();
  let checkExistAdd = todos.indexOf(input.value);
  if (input.value.length !== 0 && checkExistAdd === -1) {
    let li = document.createElement('li');
    li.classList.add('todo-content');
    li.setAttribute('id', listCount);
    listCount++;
    let span = `
        <span>${input.value}</span>
        <div class="todo-btns">
            <button class="edit-Btn" type="button">
                <img src="./images/editBtn.png" alt="할일수정버튼" />
            </button>
            <button class="delete-Btn" type="button">
                <img src="./images/deleteBtn.png" alt="할일삭제버튼" />
            </button>
        </div>
    `;
    li.innerHTML = span;
    frag.append(li);
    ul.append(frag);

    todos.push(input.value);
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(todos));

    input.value = '';

    if (listCount == 5) {
      ul.style.cssText = 'height: unset; min-height: 1000px';
    }
  } else {
    input.value = '';
  }
};

const addTodoBtn = $('.addTodoBtn');
addTodoBtn.addEventListener('click', addTodo);

ul.addEventListener('click', (event) => {
  if (event.target.className === 'delete-Btn') {
    let askDelete = `
    <div class='dialog-container'>
      <p>정말 삭제하시겠습니까?</p>
      <form method="dialog">
        <div>
          <button value='yes'>예</button>
          <button value='no'>아니오</button>
        </div>
      </form>
    </div>`;
    modal.innerHTML = '';
    modal.innerHTML = askDelete;
    modal.showModal();
    modal.addEventListener(
      'close',
      () => {
        if (modal.returnValue === 'yes') {
          todos = [
            ...todos.filter((el) => {
              return (
                el !==
                event.target.parentNode.previousElementSibling.textContent
              );
            }),
          ];
          localStorage.clear();
          localStorage.setItem('todos', JSON.stringify(todos));
          event.target.parentNode.parentNode.remove();
          listCount--;
          if (listCount == 4) {
            ul.style.cssText = 'height: 561px; min-height: unsetpx';
          }
        }
      },
      { once: true }
    );
  }

  if (event.target.className === 'edit-Btn') {
    let askEdit = `
    <div class='dialog-container'>
      <p>새로운 내용을 입력해주세요</p>
      <form method="dialog">
        <input maxlength="22" type="text"></input>
          <div>
            <button value='yes'>확인</button>
            <button value='no'>취소</button>
          </div>  
        </form>
        </div>`;
    modal.innerHTML = '';
    modal.innerHTML = askEdit;
    modal.showModal();
    modal.addEventListener(
      'close',
      () => {
        if (
          modal.returnValue === 'yes' &&
          modal.querySelector('input').value.trim() !== ''
        ) {
          let editedContentIndex = todos.indexOf(
            event.target.parentNode.previousElementSibling.textContent
          );
          todos.splice(
            editedContentIndex,
            0,
            modal.querySelector('input').value
          );
          todos.splice(editedContentIndex + 1, 1);
          localStorage.clear();
          localStorage.setItem('todos', JSON.stringify(todos));
          event.target.parentNode.previousElementSibling.textContent =
            modal.querySelector('input').value;
        }
      },
      { once: true }
    );
  }
});

//[할 일]

//edit, delete 버튼
//  edit, delete 모달로 만들기?
//  edit 방식 고민해보기
//로컬스토리지 저장 기능
//listCount 따라서 height랑 min-height 속성 바꿔주기

//로컬스토리지에
//li span textContent값 저장하기
//listCount 저장하기

//todo 로컬 스토리지 전
//* 1. 입력할 수 있는 기능
//*  1-1 콘텐츠의 글자수 제한
//*  1-2 둘중 하나라도 입력을 안했을시 alert 을 띄움
//* 2. 저장을 누를수 있는 기능
//*   2-1 '현재 입력된 todo가 없습니다' 텍스트 사라짐
//*   2-2 저장한 값을 화면에 불러옴
//*   2-3 저장과 동시에 인풋창이 초기화
//*   2-4 저장을 누른 시점의 날짜 기록
//*   2-5 삭제버튼을 누르면 다시 '현재 입력된 todo가 없습니다' 텍스트가 돌아와야함
//* 3. 삭제 기능
//*   3-1 삭제하면 화면에서 사라짐

//todo 로컬 스토리지 이용
//

//todo 모달창 기능
