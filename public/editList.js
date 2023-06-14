const listEditIdDOM = document.querySelector('.list-edit-id');
const listEditNameDOM = document.querySelector('.list-edit-name');
const editFormDOM = document.querySelector('.single-list-form');
const formAlertDOM = document.querySelector('.form-alert');
const listEditCompletedDOM = document.querySelector('.list-edit-completed');



const params = window.location.search;
const id = new URLSearchParams(params).get('id');
console.log(id);

//一つの特定のリストを取得する
const showList = async () => {
   try {
      const { data: list } = await axios.get(`/api/v1/lists/${id}`);
      const { completed, _id, name } = list;
      listEditIdDOM.textContent = _id;
      listEditNameDOM.value = name;
      if(completed) {
         listEditCompletedDOM.checked = true;
      }
   } catch(err) {
      console.log(err);
   }
};
showList();

// リストの編集
editFormDOM.addEventListener('submit', async (event) => {
   event.preventDefault();
   try {
      const listName = listEditNameDOM.value;
      listCompleted =  listEditCompletedDOM.checked;
      const { data: list } = await axios.patch(`/api/v1/lists/${id}`, {
         name: listName,
         completed: listCompleted,
      });
      formAlertDOM.style.display = 'block';
      formAlertDOM.textContent = '編集に成功しました';
      formAlertDOM.classList.add('text-success');
   } catch(err) {
      console.log(err);
   }
   setTimeout(() => {
      formAlertDOM.style.display = 'none';
      formAlertDOM.classList.add('text-success');
   }, 3000);

});