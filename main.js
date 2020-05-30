const { createStore } = window.Redux;

const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      const newList = [...state];
      newList.push(action.payload);
      return newList;

    default:
      return state;
  }
}

const store = createStore(hobbyReducer);

// RENDER REDUX HOBBY LIST
const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector('#hobbyListId');
  if (!ulElement) return;

  // Reset previous content of ul tags
  ulElement.innerHTML = '';

  for (const hobby of hobbyList) {
    const liElement = document.createElement('li');
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }
}

// RENDER INITIAL HOBBY LIST
const initialHobbyList = store.getState();
// console.log(initialHobbyList);
renderHobbyList(initialHobbyList);

// HANDLE FORM SUBMIT
const hobbyFormElement = document.querySelector('#hobbyFormId');
if (hobbyFormElement) {
  const handleFormSummit = (e) => {
    e.preventDefault();
    const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId');
    if (!hobbyTextElement) return;

    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyTextElement.value
    }
    store.dispatch(action);
    hobbyFormElement.reset();
  };

  hobbyFormElement.addEventListener('submit', handleFormSummit);
}

store.subscribe(() => {
  // console.log(store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);

  localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
})