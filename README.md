### useDispatch()

reducers/index.js
```
const rootReducer = combineReducers({
    hobby: hobbyReducer,
    user: userReducer
});

export default rootReducer;
```

- store.js
```
const store = createStore(rootReducer);
export default store;
```

- actions/hobby.js (action creater)
```
export const addNewHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY,
        payload: hobby
    }
}
```

*Note:
- Hạn chế connect Redux trong App.js
- casual (random info)

- HomePage.js
```
. . .
function HomePage(props) {
    const hobbyList = useSelector(state => state.hobby.list);
    const dispatch = useDispatch();

    const handleAddHobbyClick = () => {
        const newHobby = {
            id: casual.id
            title: casual.title
        }

        const action = addNewHobby(newHobby);
        dispatch(action);
    }

    return (
        <>
            <button onClick=(handleAddHobbyClick)>Random hobby</button>
            { hobbyList }
        </>
    )
}
export default HomePage;
```

### useSelector()
```
// Nen
const hobbyList = userSelector(state => state.hobby.list);
const activeId = userSelector(state => state.hobby.activeId);

// Khong nen
const hobbyState = userSelector(state => ({
    list: state.hobby.list,
    activeId: state.hobby.list
}));

-> Fix:
const hobbyState = userSelector(state => ({
    list: state.hobby.list,
    activeId: state.hobby.list
}), shallowEqual);
```
-> Tra ve Strict Comparison. (Cu moi lan thay doi thi useSelector dc chap nhat) => So sanh 2 gia tri ===
-> Chu khong dung Shallow Comparison => di qua tung key so sanh ===
