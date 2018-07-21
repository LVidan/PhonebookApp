window.addEventListener('beforeunload', function() {
  save();
})


if (localStorage.db) {
  var db = JSON.parse(localStorage.db);
}else {
  var db = [];
}

let tbody = document.querySelector('tbody');
let editTbody = document.querySelectorAll('.editTbody')[0];
let contactBtn = document.querySelector('#contactBtn');
let addBtn = document.querySelector('#addBtn');
let editBtn = document.querySelector('#editBtn');
let contactView = document.querySelector('#contact-view');
let addView = document.querySelector('#add-view');
let editView = document.querySelector('#edit-view');
let formBtn = document.querySelector('#formBtn');
let formFirstName = document.querySelector('#form-first-name');
let formLastName = document.querySelector('#form-last-name');
let formPhoneNumber = document.querySelector('#form-phone-number');
let editFormView = document.querySelector('#edit-form-view')
let editFormFirstName = document.querySelector('#edit-form-first-name');
let editFormLastName = document.querySelector('#edit-form-last-name');
let editFormPhoneNumber = document.querySelector('#edit-form-phone-number');
let editFormBtn = document.querySelector('#edit-formBtn');
let num;

// Listeners
contactBtn.addEventListener('click',displayTable);
addBtn.addEventListener('click',displayForm);
formBtn.addEventListener('click',saveContact);
editBtn.addEventListener('click',showEditTable);
editFormBtn.addEventListener('click',addEditedContact)
////////////////

createTable();

function displayTable() {
  contactView.style.display = "block";
  addView.style.display = "none";
  editView.style.display = "none";
  editFormView.style.display = "none";
}

function displayForm() {
  contactView.style.display = "none";
  addView.style.display = "block";
  editView.style.display = "none";
  editFormView.style.display = "none";
}

function showEditTable() {
  contactView.style.display = "none";
  addView.style.display = "none";
  editView.style.display = "block";
  editFormView.style.display = "none";

  let text = "";
  for (var i = 0; i < db.length; i++) {
    text += '<tr>';
    text += '<td>'+db[i].firstName+'</td>';
    text += '<td>'+db[i].lastName+'</td>';
    text += '<td>'+db[i].phoneNumber+'</td>';
    text += '<td><button id="'+i+'" class="btn btn-danger btn-sm delete">Delete</button></td>';
    text += '<td><button class="btn btn-warning btn-sm edit" data-num="'+i+'">&nbsp;Edit&nbsp;</button></td>';
    text += '</tr>';
  }
  editTbody.innerHTML = text;
  let deleteBtns = document.querySelectorAll('.delete');
  let editBtns = document.querySelectorAll('.edit');
  for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click',deleteContact);
    editBtns[i].addEventListener('click',showEditForm);
  }
}

function deleteContact() {
  let index = this.firstName;
  db.splice(index,1);
  createTable();
  displayTable();

}

function showEditForm() {
  contactView.style.display = "none";
  addView.style.display = "none";
  editView.style.display = "none";
  editFormView.style.display = "block";

  num = this.getAttribute('data-num')
  let currentContact = db[num];

  editFormFirstName.value = currentContact.firstName;
  editFormLastName.value = currentContact.lastName;
  editFormPhoneNumber.value = currentContact.phoneNumber;


}

function addEditedContact() {
  let firstName = editFormFirstName.value;
  let lastName = editFormLastName.value;
  let phoneNumber = editFormPhoneNumber.value;


  let editedContact = {
    firstName : firstName,
    lastName : lastName,
    phoneNumber : phoneNumber,
  }
  db[num] = editedContact;
  createTable();
}



function saveContact() {
  let firstName = formFirstName.value;
  let lastName = formLastName.value;
  let phoneNumber = formPhoneNumber.value;

  let newContact = {
    firstName : firstName,
    lastName : lastName,
    phoneNumber : phoneNumber,
  }
  db.push(newContact);
  formFirstName.value = "";
  formLastName.value = "";
  formPhoneNumber.value = "";
  createTable();
  displayTable();
}


function save() {
  localStorage.db = JSON.stringify(db);
}


function createTable() {
  contactView.style.display = "block";
  addView.style.display = "none";
  editView.style.display = "none";
  editFormView.style.display = "none";
  let text = "";
  for (var i = 0; i < db.length; i++) {
    text += '<tr>';
    text += '<td>'+db[i].firstName+'</td>';
    text += '<td>'+db[i].lastName+'</td>';
    text += '<td>'+db[i].phoneNumber+'</td>';
    text += '</tr>';
  }
  tbody.innerHTML = text;
}

$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
