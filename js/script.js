/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// GLOBAL Vars, boolean to check if search buttons are on or off
const allStudents = document.querySelectorAll('.student-item');
const studentsPage = 10;
let nameSearchClicked=false;
let mailSearchClicked=false;

const showPage = (list, page) => { 
   var idx_start = page*studentsPage-studentsPage;
   var idx_end = page*studentsPage;
   
   for(var idx=0; idx<list.length; idx++){
      if(idx_start<=idx && idx<idx_end)
      {
         list[idx].style.display='block';
      }else{
         list[idx].style.display='none';}
   }
} 


// adds page buttons
const appendPageLinks = (list) => {
   const page = document.querySelector('.page');
   var pagination = document.querySelector('.pagination');
   pagination ? page.removeChild(pagination) : {};

   var pagination = document.createElement('div');
   const pageGP = document.createElement('ul');
   pagination.className = 'pagination';
   page.appendChild(pagination);
   pagination.appendChild(pageGP);

   const pages = Math.ceil(list.length/studentsPage); 
   for ( let i = 1; i <= pages; i++){ 
      const pageP = document.createElement('li'); 
      const pageC = document.createElement('a'); 
      pageC.href = '#';
      pageC.textContent = i; 
      (i===1) ? pageC.classList.add('active') : {};

      pageGP.appendChild(pageP);
      pageP.appendChild(pageC);  
   };

   const pageCs = document.querySelectorAll('.pagination ul li a');
   for (let i = 0; i < pageCs.length; i++){
      pageCs[i].addEventListener('click', (e) => {
         pageCs.forEach(x => x.classList.remove('active'));
         e.target.classList.add('active'); 
         showPage(list, e.target.textContent); 
      });
   };
};

// toggle color of search button, https://stackoverflow.com/questions/41351730/change-style-back-and-forth
const searchButtonListener = (button, buttonType, e, searchField) => {
   switch(button.toggleStatus){
      case "on":
         button.toggleStatus="off";
         button.style.backgroundColor = "#4ba6c3";
        break;
      case "off":
         button.toggleStatus="on";
         button.style.backgroundColor = "#200be6";
        break;
    }
    if(buttonType=='name'){
      nameSearchClicked = !nameSearchClicked;
    }else{
      mailSearchClicked = !mailSearchClicked;
    }

   const userInput = searchField.value;
   const searchResults = userSearch(userInput, allStudents);
   showPage(searchResults, 1);
   appendPageLinks(searchResults);

}

// Search field input and search buttons
const seachField = () => {
   const header = document.querySelector('.page-header');
   let search = document.createElement('div');
   search.className = 'student-search';
   const searchField = document.createElement('input');
   searchField.setAttribute('placeholder','Search for students...');
   const nameButton = document.createElement('button'); 
   nameButton.textContent = 'Name Search';
   const mailButton = document.createElement('button'); 
   mailButton.textContent = 'Mail Search';
   header.appendChild(search);
   search.appendChild(searchField);
   search.appendChild(nameButton);
   search.appendChild(mailButton);
   
   nameButton.toggleStatus = "off";
   mailButton.toggleStatus = "off";

   nameButton.addEventListener('click', (e) => {
      searchButtonListener(nameButton, 'name', e, searchField)
   });
   
   mailButton.addEventListener('click', (e) => {
      searchButtonListener(mailButton, 'mail', e, searchField)
   });
   
   // updates search on every keyup
   searchField.addEventListener('keyup', (e) => {
      if(!nameSearchClicked && !mailSearchClicked){
         searchButtonListener(nameButton, 'name', e, searchField);
      }
      const searchResults =  userSearch(e.target.value, allStudents);
      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   });
};

// searchs user on name or email depending if button(s) are activated
const userSearch = (input, list) => {
   try{
      var re = new RegExp(input);
   }
   catch{
      console.log("Invalid REGEX");
   }

   let tempArray = []; 
   if (!input) { 
      return list;
   } else {
      for (let i = 0; i < list.length; i++) { 
         list[i].style.display = 'none';
         let studentName = list[i].querySelector('h3').textContent.toLowerCase();
         let studentMail = list[i].querySelector('span').textContent.toLowerCase();
         
         if ((studentName.includes(input.toLowerCase()) && nameSearchClicked) && ((studentMail.includes(input.toLowerCase()) && mailSearchClicked)) ){
               tempArray.push(list[i]);
         }else if(!mailSearchClicked && studentName.includes(input.toLowerCase()) && nameSearchClicked){
            tempArray.push(list[i]);
         }else if(!nameSearchClicked && studentMail.includes(input.toLowerCase()) && mailSearchClicked){
            tempArray.push(list[i]);
         }
      };
      return tempArray;
   };
};

seachField();
showPage(allStudents, 1);
appendPageLinks(allStudents);

