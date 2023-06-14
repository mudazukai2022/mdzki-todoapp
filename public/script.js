const listsDOM = document.querySelector('.lists');
const formDOM = document.querySelector('.list-form');
const listInputDOM = document.querySelector('.list-input');
const formAlertDOM = document.querySelector('.form-alert');

// api/v1/listsからリストを読み込む
const showLists = async () => {
   try {
      // 自作APIを叩く
      const { data: lists } = await axios.get('/api/v1/lists');
      // リストがない時
      if(lists.length < 1) {
         listsDOM.innerHTML = `<h5 class"empty-list">リストがありません</h5>`;
         return;
      }
      // リストを出力
      const allLists = lists.map((list) => {
         const { completed, _id, name } = list;

         return `<div class="single-list ${completed && 'list-completed'}">
            <h5>
               <span>
                  <i class="fa-solid fa-square-check"></i>
               </span>${name}
            </h5>
            <div class="list-links">
               <a href="edit.html?id=${_id}" class="edit-link">
                  <i class="fa-sharp fa-solid fa-pen-to-square"></i>
               </a>

               <button type="button" class="delete-btn" data-id="${_id}">
                  <i class="fa-solid fa-trash"></i>
               </button>
            </div>
         </div>`;

      })
      .join('');
      listsDOM.innerHTML = allLists;

   } catch(err) {
      console.log(err);
   }
};
showLists();

// リストを新規作成する
formDOM.addEventListener('submit', async (event) => {
   event.preventDefault();
   const name = listInputDOM.value;

   try{
      await axios.post('/api/v1/lists', { name: name });
      listInputDOM.value = '';
      showLists();
      formAlertDOM.style.display = 'block';
      formAlertDOM.textContent = 'リストを追加しました。';
      formAlertDOM.classList.add('text-success');

   } catch(err) {
      console.log(err);
      formAlertDOM.style.display = 'block';
      formAlertDOM.innerHTML = '無効です。もう一度やり直してください。';
   }

   setTimeout(() => {
      formAlertDOM.style.display = 'none';
      formAlertDOM.classList.remove('text-success');
   }, 3000);
});

// リストを削除しました
listsDOM.addEventListener('click', async (event) => {
   const element = event.target;
   
   if(element.parentElement.classList.contains('delete-btn')) {
      const id = element.parentElement.dataset.id;

      try {
         await axios.delete(`/api/v1/lists/${id}`)   
         showLists();
      } catch(err) {
         console.log(err);
      }
   }
});