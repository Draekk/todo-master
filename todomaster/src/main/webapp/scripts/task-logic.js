//-------------LOAD TASK

async function fetchData() {
  try {
    const response = await fetch('SvTask');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function loadTasks(){
  try {
    const list = await fetchData();
    showTask(list);
  } catch (error) {
    throw new Error('Error fetch in data: ' + error.message);
  }
}

function showTask(taskList) {
  const $slider = document.getElementById('slider');
  const $fragment = document.createDocumentFragment();
  taskList.forEach((task) => {
    createTask(task, $fragment);
  });

  $slider.appendChild($fragment);
}

function createTask(task, element){
  const $li = document.createElement('li');
    $li.classList.add('task');
    $li.classList.add('container');
    $li.classList.add('c-center-sb');

    const $div = document.createElement('div');
    $div.classList.add('container');

    const $input = document.createElement('input');
    $input.type = 'checkbox';
    $input.name = 'checkbox';
    $input.id = task.id;

    const $label = document.createElement('label');
    $label.title = task.description;
    $label.htmlFor = $input.id;
    $label.innerText = task.description;

    const $btnContainer = document.createElement('div');
    $btnContainer.classList.add('container');
    $btnContainer.classList.add('c-center-sb');

    //const $btnEdit = document.createElement('button');

    // const $iconEdit = document.createElement('i');
    // $iconEdit.classList.add('fa-solid');
    // $iconEdit.classList.add('fa-pen');

    const $btnDelete = document.createElement('button');
    

    const $iconDelete = document.createElement('i');
    $iconDelete.classList.add('fa-solid');
    $iconDelete.classList.add('fa-x');
    
    //Append childs
    $div.appendChild($input);
    $div.appendChild($label);
    //$btnEdit.appendChild($iconEdit);
    $btnDelete.appendChild($iconDelete);
    //$btnContainer.appendChild($btnEdit);
    $btnContainer.appendChild($btnDelete);
    $li.appendChild($div);
    $li.appendChild($btnContainer);
    element.appendChild($li);

    //Event listeners
    $input.addEventListener('input', () => {
      console.log(task);
      const result = fetchComplete(task)
      .then((result) => {
        if(result.isCompleted){
          $label.style.textDecoration = 'line-through';
        } else {
          $label.style.textDecoration = 'none';
        }
      })
      .catch(err => console.error(err));
    })

    $btnDelete.addEventListener('click', () => {
      const result = fetchDelete(task.id)
      .then(result => {
        if(result.status >= 200 && result.status < 300){
          $li.classList.add('inactive');
        }
      })
      .catch(err => console.log(err));
    })

    //Control structures
    if(task.isCompleted){
      $input.checked = true;
      $label.style.textDecoration = 'line-through';
    } else {
      $input.checked = false;
      $label.style.textDecoration = 'none';
    }
}

loadTasks();


//-----------ADD TASK

const $inputTask = document.getElementById('newTask');
const $btnAddTask = document.getElementById('btnAddTask');

$btnAddTask.addEventListener('click', () => {
  if($inputTask.value !== ''.trim()){
    let task = {  description: $inputTask.value.trim() };
    
    fetch('SvTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(response => {
      return response.json();
    })
    .then(task => {
      $inputTask.value = '';
      const $slider = document.getElementById('slider');
      const $fragment = document.createDocumentFragment();
      createTask(task, $fragment);
      $slider.appendChild($fragment);
    })
    .catch(err => console.error(err));
  }
});


//-----------------------DELETE TASK

async function fetchDelete(idObject) {
  try {
    const object = {id: idObject};
    const response = await fetch('SvTask', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//----------------------COMPLETE TASK

async function fetchComplete(object){
  try {
    const response = await fetch('SvTask', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}